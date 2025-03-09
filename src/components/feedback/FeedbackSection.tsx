import React from "react";
import { useFeedbacks } from "../../queries/useFeedbacks";
import FeedbackRow from "./FeedbackRow";

interface IFeedbackSection {}

const FeedbackSection: React.FC<IFeedbackSection> = ({}) => {
  const { data: feedbacks, isLoading } = useFeedbacks();
  if(isLoading){
      return <div>Loading Feedbacks...</div>
  }
  return (
    <div className="flex flex-col gap-y-4">
      {feedbacks?.map((feedback: Feedback) => (
        <FeedbackRow key={`feed-${feedback.docId}`} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackSection;
