import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const updateQuestion = async ({
  docId,
  data,
}: {
  docId: string;
  data: any;
}) => {
  const url = `${API_URL}/api/questions/${docId}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
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

export const useUpdateQuestion = ({ onSuccess }: any) =>
  useMutation({
    mutationFn: updateQuestion,
    onSuccess,
  });
