import React from "react";
import { useQuestions } from "../../queries/useQuestions";
import QuestionRow from "./QuestionRow";

interface IQuestionsSection {}

const QuestionsSection: React.FC<IQuestionsSection> = ({}) => {
  const { data: questions, isLoading } = useQuestions();
  if (isLoading) {
    return <div>Loading Questions...</div>;
  }
  return (
    <div className="flex flex-col gap-y-4">
      {questions?.map((question: FeedbackQuestion) => (
        <QuestionRow key={`ques-${question.docId}`} question={question} />
      ))}
    </div>
  );
};

export default QuestionsSection;
