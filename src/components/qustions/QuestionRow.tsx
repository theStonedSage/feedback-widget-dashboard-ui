import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDeleteQuestion } from "../../queries/useDeleteQuestion";
import CreateOrEditQuestionModal from "./CreateOrEditQuestionModal";

interface IQuestionRow {
  question: FeedbackQuestion;
}

const QuestionRow: React.FC<IQuestionRow> = ({ question }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const feedbackDate = new Date(question.createdAt);
  const queryClient = useQueryClient();
  const { mutate: deleteQuestion } = useDeleteQuestion({
      onSuccess: () => queryClient.invalidateQueries({queryKey: ["get-questions"]})
  });
  return (
    <>
      <div className="grid grid-cols-5">
        <div>{question.label}</div>
        <div>{question.type}</div>
        <div>{feedbackDate.toDateString()}</div>
        <div>{question.required ? "Required" : "Not Required"}</div>
        <div className="flex gap-x-2">
          <button className="text-blue-600" onClick={() => setIsOpenModal(true)}>Update</button>
          <button
            className="text-red-600"
            onClick={() => question.docId && deleteQuestion(question.docId)}
          >
            Delete
          </button>
        </div>
      </div>
      <CreateOrEditQuestionModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        question={question}
      />
    </>
  );
};

export default QuestionRow;
