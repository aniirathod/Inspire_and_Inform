import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Postform } from "../components";
import databasesService from "../appwrite/database";

const EditPost = () => {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databasesService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div>
      <Postform post={post} />
    </div>
  ) : null;
};

export default EditPost;
