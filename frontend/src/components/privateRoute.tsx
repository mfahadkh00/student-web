import React from "react";
// import { useAppSelector } from "../state/hooks";
import { Navigate } from "react-router-dom";
// import { IApplicationState } from "../state/store";

export type ProtectedRouteProps = {
    outlet: JSX.Element;
  };

export default function PrivateRoute({ outlet }: ProtectedRouteProps) {
  const isAuthenticated = Boolean(localStorage.getItem('isAuth'));
  console.log("🚀 ~ file: privateRoute.tsx:12 ~ PrivateRoute ~ isAuthenticated:", isAuthenticated)
  // = useAppSelector(
  //   (state: IApplicationState) => state.auth.isAuthenticated
  // );
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: "/login" }} />;
  }
}
