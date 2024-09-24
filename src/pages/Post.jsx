import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Btn } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import databasesService from "../appwrite/database";
import FileUploadservice from "../appwrite/fileUpload";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databasesService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databasesService.deleteDocument(post.$id).then((status) => {
      if (status) {
        FileUploadservice.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const created = (string) => {
    const date = new Date(string);
    const year = date.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}  ${month}  ${year}`;
  };
  return post ? (
    <div className="py-32 lg:w-9/12 lg:mx-auto">
      <div className="flex flex-col w-full p-2 pb-5 mb-10 border-b-2 lg:justify-between lg:flex-row border-blueish">
        <div className="flex justify-center">
          <img
            src={FileUploadservice.preview(post.featuredImage)}
            alt={post.title}
            loading="lazy"
            className="object-cover w-60 h-36 lg:h-32 rounded-xl lg:w-44 "
          />
        </div>
        <div className="w-full px-1 text-start lg:w-1/2">
          <h1 className="flex flex-wrap mt-8 text-xl lg:font-semibold lg:mt-0 lg:text-2xl">
            {post.title}
          </h1>
          <h3 className="pt-4 italic font-medium text-md">
            Author : {post.userName || "Zero"}
          </h3>
          <h3 className="pt-2 text-sm italic font-medium">
            Created At : {created(post.$createdAt)}
          </h3>
        </div>

        {isAuthor && (
          <div className="mt-5 lg:mt-0">
            <Link to={`/edit-post/${post.$id}`}>
              <Btn className="mr-3 cursor-pointer">Edit</Btn>
            </Link>
            <Btn
              bgColor="bg-blueish rounded-3xl"
              classname="py-1 text-sm lg:py-2 "
              onClick={deletePost}
            >
              Delete
            </Btn>
          </div>
        )}
      </div>
      <div className="w-11/12 mx-auto lg:w-full mb-9">
        <h1 className="text-xl font-bold">{post.title}</h1>
      </div>
      <div className="flex flex-col items-center w-3/4 mx-auto tracking-wide lg:text-justify lg:leading-7 text-pretty">
        {parse(post.content)}
      </div>
    </div>
  ) : null;
}
