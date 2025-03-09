import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const updateFeedbackStatus = async ({
  docId,
  status,
}: {
  docId: string;
  status: "approved" | "rejected";
}) => {
  const url = `${API_URL}/api/feedbacks/${docId}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        data: {
          reviewStatus: status,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
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

export const useUpdateFeedbackStatus = ({ onSuccess }: any) =>
  useMutation({
    mutationFn: updateFeedbackStatus,
    onSuccess,
  });
