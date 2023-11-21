"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegisterModal";
import RegisterModal from "../modals/registerModal";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "../modals/loginModal";
import { signIn, useSession } from "next-auth/react";

const Auth = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data } = useSession();
  console.log(data, "data");

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          alt="X"
          width={450}
          height={450}
          className="justify-self-center hidden md:block"
        />
        <div className="flex flex-col justify-center md:justify-between gap-6 h-full md:h-[70vh]">
          <div className=" block md:hidden">
            <Image src={"/images/x.svg"} alt="X" width={50} height={50} />
          </div>
          <h1 className="md:text-6xl text-5xl font-bold">Happening now</h1>
          <div className="md:w-[60%] w-full">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <FcGoogle /> Signup up with google
                  </div>
                }
                fullWidh
                secondary
              />
              <Button
                onClick={() => signIn("github")}
                label={
                  <div className="flex gap-2 items-center justify-center">
                    <AiFillGithub /> Signup up with github
                  </div>
                }
                fullWidh
                secondary
              />
              <div className=" flex items-center justify-center">
                <div className="h-px bg-gray-400 w-1/2"></div>
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-400 w-1/2"></div>
              </div>
              <Button
                label={<div>Create account</div>}
                fullWidh
                onClick={onOpenRegisterModal}
              />
              <div className="text-[10px] text-gray-400">
                By signing up, you agree to the
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500"> Privacy Policy</span>, including
                <span className="text-sky-500"> Cookies Use</span>
              </div>
            </div>
          </div>
          <div className="md:w-[60%] w-full">
            <h3 className="font-medium text-xl mb-4">
              Already have an account?
            </h3>
            <Button
              label={<div>Sign in</div>}
              fullWidh
              outline
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
