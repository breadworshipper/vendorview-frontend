"use client";

import { useAtom } from "jotai";
import { ReactNode } from "react";
import useAxios from "../api/use-axios";
import { usePathname } from "next/navigation";
import { userAtom } from "../jotai/user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [, setUser] = useAtom(userAtom);
  const pathname = usePathname();

  useAxios<any>({
    method: "get",
    url: "/auth/get-current-user",
    fetchOnRender: true,
    isAuthorized: true,
    callback: {
      onSuccess(data) {
        setUser(data);
      },
      onError(error) {
        setUser(null);
      },
    },
  });

  return <div>{children}</div>;
};
