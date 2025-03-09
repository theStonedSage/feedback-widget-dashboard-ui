import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const deleteQuestion = async (docId: string) => {
  const url = `${API_URL}/api/questions/${docId}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error.message);
    return {
      success: false,
    };
  }
};

export const useDeleteQuestion = ({ onSuccess }: any) =>
  useMutation({
    mutationFn: deleteQuestion,
    onSuccess,
  });
