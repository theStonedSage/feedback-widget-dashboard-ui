import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const getFeedbacks = async () => {
    const url = `${API_URL}/api/feedbacks`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return (json?.feedbacks || []);
    } catch (error: any) {
      console.error(error.message);
      return [];
    }
}

export const useFeedbacks = () => useQuery({ queryKey: ['get-feedbacks'], queryFn: getFeedbacks })