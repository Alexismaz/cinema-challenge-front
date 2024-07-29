"use client";
import { AppDispatch } from "@/store";
import { verifySessionAsync } from "@/store/actions/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const VerifySession = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(verifySessionAsync({ dispatch }));
  }, [dispatch]);

  return <>{children}</>;
};

export default VerifySession;
