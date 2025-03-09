import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useUpdateFeedbackStatus } from "../../queries/useUpdateFeedback";
import ModalLayout from "../ModalLayout";

interface IFeedbackModal {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  feedback: Feedback;
}

const FeedbackModal: React.FC<IFeedbackModal> = ({
  isOpen,
  setIsOpen,
  feedback,
}) => {
  const queryClient = useQueryClient();
  const { mutate: updateFeedbackStatus } = useUpdateFeedbackStatus({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-feedbacks"] });
      setIsOpen(false);
    },
  });
  return (
    <ModalLayout
      title="Review submission"
      isOpen={isOpen}
      okText={"Approve"}
      cancelText="Reject"
      okProps={{}}
      onClose={() => setIsOpen(false)}
      onCancel={() => {
        updateFeedbackStatus({
          docId: feedback.docId,
          status: "rejected",
        });
      }}
      onOkay={() => {
        updateFeedbackStatus({
          docId: feedback.docId,
          status: "approved",
        });
      }}
    >
      <div className="flex flex-col gap-y-4">
        {feedback.feedback.map((f) => (
          <div key={f.submission} className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-900">{f.question.label}</label>
            <div>{f.submission?.toString()}</div>
          </div>
        ))}
      </div>
    </ModalLayout>
  );
};

export default FeedbackModal;
