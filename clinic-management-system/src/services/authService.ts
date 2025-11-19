import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";

const useAuthService = (params?: {
  verificationId?: string;
  code?: string;
  accountName?: string;
  password?: string;
}) => {
  const { verificationId, code, accountName, password } = params ?? {};
  const emailVerification = useQuery({
    queryKey: ["emailVerification", verificationId, code],
    queryFn: () => {
      return axiosInstance
        .get<string>(`/api/auth/otp/email`, {
          params: { verificationId, code },
        })
        .then((res) => res.data);
    },
    enabled: !!verificationId && !!code,
    retry: false,
  });

  const login = useQuery({
    queryKey: ["login", accountName],
    queryFn: () => {
      const tokens = localStorage.getItem("tokens");
      if (tokens) {
        try {
          return Promise.resolve(
            JSON.parse(tokens) as {
              token: string;
              refreshToken: string;
            }
          );
        } catch (e) {}
      }
      return axiosInstance
        .post<{
          token: string;
          refreshToken: string;
        }>("/api/auth/login", {
          accountName,
          password,
        })
        .then((res) => {
          localStorage.setItem("tokens", JSON.stringify(res.data));
          return res.data;
        });
    },
    enabled: false,
  });

  const account = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      return axiosInstance
        .get<IAccount>("/api/auth/me")
        .then((res) => res.data);
    },
    enabled: !!login.data?.token,
  });

  return {
    emailVerification,
    login,
    account,
  };
};

export default useAuthService;
