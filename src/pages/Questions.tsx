import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import QuestionsSection from "../components/qustions/QuestionsSection";
import { useAuth } from "../contexts/authContext";
import { useRedirectIfNotLoggedIn } from "../hooks/useRedirectIfNotLoggedIn";

interface IQuestions {}

const Questions: React.FC<IQuestions> = ({}) => {
  const { isAuthLoading } = useAuth();
  useRedirectIfNotLoggedIn();

  if (isAuthLoading) return <div>Loading....</div>;
  return (
    <DashboardLayout>
      <QuestionsSection />
    </DashboardLayout>
  );
};

export default Questions;
