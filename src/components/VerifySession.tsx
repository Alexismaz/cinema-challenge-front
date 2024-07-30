"use client";
import { AppDispatch } from "@/store";
import { resetRedirect, verifySessionAsync } from "@/store/actions/auth";
import { useAppSelector } from "@/store/hooks";
import { IAuthState } from "@/store/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const VerifySession = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { shouldRedirect } = useAppSelector<IAuthState>(state => state.auth);
  const rooter = useRouter()
  useEffect(() => {
    if (shouldRedirect) {
      rooter.push(shouldRedirect)
      dispatch(resetRedirect());
    }
  }, [dispatch, rooter, shouldRedirect]);

  useEffect(() => {
    dispatch(verifySessionAsync({ dispatch }));
  }, [dispatch]);

  return <>{children}</>;
};

export default VerifySession;
