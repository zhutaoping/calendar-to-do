import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Token, User } from "@prisma/client";

interface Props {
  onSuccess?: (data: Token) => void;
  onError?: (error: Error) => void;
}

export const useRequestReset = ({ onSuccess, onError }: Props) => {
  async function requestReset(data: Partial<User>) {
    const res = await axios.post<Token>("/users/api/password/reset", data);
    return res.data;
  }

  return useMutation<Token, Error, Partial<User>>({
    mutationFn: requestReset,
    onSuccess,
    onError,
  });
};
