import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const updateQuestion = async (data: any) => {
  const url = `${API_URL}/api/question`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data
      }),
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

export const useAddQuestion = ({ onSuccess }: any) =>
  useMutation({
    mutationFn: updateQuestion,
    onSuccess,
  });
