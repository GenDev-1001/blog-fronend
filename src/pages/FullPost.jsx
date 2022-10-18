import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";

export const FullPost = () => {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const {id} = useParams();
  
  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.warn(err);
      alert("Error getting article...");
    });
  }, [id])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Vasya Pupkin",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "It's a test comment!",
          },
          {
            user: {
              fullName: "Ivan Ivanov",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
