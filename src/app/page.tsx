'use client'
import LogIn from "@/components/LogIn";
import { AppDispatch } from "@/store";
import { verifySessionAsync } from "@/store/actions/auth";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifySessionAsync({ dispatch }));
  }, [dispatch]);

  return (
    <div
      className={`gap-9 flex lg:px-[30px] min-h-screen xl:px-[70px] lg:pt-[2rem] lg:pb-[6rem] relative`}
    >
      <Image 
      src="/auth/auth-background.jpg" 
      alt="Background Image"
      layout="fill"
      objectFit="cover"
      className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="hidden lg:block text-white mt-40 z-10">
        <div className="flex items-end">
        </div>
        <p className="text-[19.5px] xl:text-[27px] mt-5 font-regular">
          Creá una cuenta o iniciá sesión
        </p>
      </div>
      <div className="flex flex-1 justify-center lg:justify-end bg-white lg:bg-opacity-0 z-10">
        <LogIn />
      </div>
    </div>
  );
};

export default Auth;
