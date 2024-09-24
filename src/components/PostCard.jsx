import React from "react";
import FileUploadservice from "../appwrite/fileUpload";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <>
      <div className=" w-80 h-60">
        <Link to={`/post/${$id}`}>
          <div className="w-full rounded-xl ">
            <div className="w-full justify-center mb-1 h-52 ">
              <img
                src={FileUploadservice.preview(featuredImage)}
                alt={title}
                className="object-cover h-full w-full  rounded-3xl"
              />
            </div>
          </div>
          <h2 className="text-md pl-2 font-light tracking-tighter whitespace-nowrap text-ellipsis overflow-hidden ">
            {title}
          </h2>
        </Link>
      </div>
    </>
  );
};

export default PostCard;
