import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axios-instance";

export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface IChatRequest {
  message: string;
  history?: IChatMessage[];
}

export interface IChatResponse {
  message: string;
  timestamp: string;
}

const useAIService = () => {
  const sendMessage = useMutation({
    mutationFn: (args: IChatRequest) =>
      axiosInstance
        .post<IChatResponse>("/ai/chat", args)
        .then((res) => res.data),
  });

  return {
    sendMessage,
  };
};

export default useAIService;
