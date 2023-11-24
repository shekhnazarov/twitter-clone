"use client";

import Header from "@/components/shared/header";
import { IPost } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const OnePostPage = ({ params }: { params: { postId: string } }) => {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IPost[]>([]);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getComment = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/posts/${params.postId}/comments`);
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
    getComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header label="Posts" isBack />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OnePostPage;
