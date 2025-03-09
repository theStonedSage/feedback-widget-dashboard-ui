import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../utils/constants";

const fetchQuestions = async () => {
    const url = `${API_URL}/api/questions`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return (json?.questions || []);
    } catch (error: any) {
      console.error(error.message);
      return [];
    }
  };

  export const useQuestions = () => useQuery({ queryKey: ['get-questions'], queryFn: fetchQuestions }) 