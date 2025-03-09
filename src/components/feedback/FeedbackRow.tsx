import clsx from "clsx";
import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

interface IFeedbackRow {
  feedback: Feedback;
}

const FeedbackRow: React.FC<IFeedbackRow> = ({ feedback }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const feedbackDate = new Date(feedback.createdAt);
  return (
    <>
      <div className="grid grid-cols-4">
        <div>{feedback.user ? feedback.user.email : "Anonymous"}</div>
        <div>{feedbackDate.toDateString()}</div>
        <div className={clsx({
          "text-yellow-600": feedback.reviewStatus === 'pending', 
          "text-red-600": feedback.reviewStatus === 'rejected', 
          "text-green-600": feedback.reviewStatus === 'approved', 
        })}>{feedback.reviewStatus}</div>
        <button className="text-blue-600" onClick={() => setIsOpenModal(true)}>Review</button>
      </div>
      <FeedbackModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        feedback={feedback}
      />
    </>
  );
};

export default FeedbackRow;
