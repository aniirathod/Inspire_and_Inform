import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databasesService from "../../appwrite/database";
import FileUploadservice from "../../appwrite/fileUpload";
import { Btn, Input, RTE } from "../index";

const Postform = ({ post }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      userName: post?.userName || "",
    },
  });

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await FileUploadservice.uploadFile(data.image[0])
        : null;

      if (file) {
        FileUploadservice.deleteFile(post.featuredImage);
      }

      const dbPost = await databasesService.updateDocument(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // TODO: Condition check the file
      const file = data.image[0]
        ? await FileUploadservice.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databasesService.createDocument({
          ...data,
          userId: userData.$id,
          userName: userData.name,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value == "string") {
      return value.trim().toLowerCase().replace(/ /g, "-");
    }
    return "";
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
      return () => {
        subscription.unsubscribe();
      };
    });
  }, [watch, slugTransform, setValue]);

  const [selectedFileName, setSelectedFileName] = useState("Choose Thumbnail");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : null);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap w-11/12 pt-32 mx-auto "
      >
        <div className="w-full lg:w-2/3">
          <div className="mb-3 lg:flex">
            <Input
              label="Title :"
              placeholder="Title"
              labelClassName="text-xl mr-2"
              classname="p-3 mb-4 border border-gray-400 w-80 rounded-2xl"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              labelClassName="text-xl mr-2"
              classname="p-3 mb-4 border border-gray-400 w-80 rounded-2xl"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>
          <RTE label="Content :" placeholder="Content" control={control} />
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:pl-20 lg:w-1/3">
          <div className="relative ">
            <Input
              label="Thumbnail :"
              type="file"
              id="image"
              classname="text-xs absoulte"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              {...register("image", {
                required: true,
                onChange: handleFileChange,
              })}
            />
            <div className="flex items-center justify-between p-2 bg-white border rounded-lg ">
              <span>{selectedFileName || "Choose File"}</span>
              <button
                type="button"
                className="px-4 py-1 text-white rounded-lg cursor-pointer bg-blueish"
              >
                Browse
              </button>
            </div>
          </div>

          {post && (
            <div className="w-full mb-4">
              <img
                src={FileUploadservice.preview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-center w-full mt-9">
            <Btn
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-1/3 py-1 mb-24 text-base text-white rounded-full lg:py-2 lg:text-lg bg-blueish"
            >
              {post ? "Update" : "Submit"}
            </Btn>
          </div>
        </div>
      </form>
    </>
  );
};

export default Postform;
