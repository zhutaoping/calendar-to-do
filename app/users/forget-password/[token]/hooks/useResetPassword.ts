import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Token, User } from "@prisma/client";

interface Props {
  onSuccess?: (data: User) => void;
}

export const useResetPassword = ({ onSuccess }: Props) => {
  async function resetPassword(data: Partial<User> | Token) {
    // console.log("🚀 ~ resetPassword ~ data:", data);

    const res = await axios.patch<User>("/users/api/password/reset", data);
    return res.data;
  }

  return useMutation<User, Error, Partial<User> | Token>({
    mutationFn: resetPassword,
    onSuccess,
  });
};
