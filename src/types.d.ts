interface FeedbackQuestion {
  docId: string;
  label: string;
  type: QuestionTypes;
  required: boolean;
  options?: FeedbackQuestionOption[];
  createdAt: Date;
  updatedAt: Date;
}

interface FeedbackQuestionOption {
  label: string;
  value: string;
}

interface Input<D> {
  value: D;
  error: string;
}

interface Feedback {
    docId: string;
  user?: {
    displayName?: string;
    email: string;
    uid: string;
  };
  feedback: FeedbackResponses[];
  createdAt: Date;
  reviewStatus: "pending" | "approved" | "rejected"
}

interface FeedbackResponses {
  question: {
    label: string;
    docId: string;
  };
  submission: any;
}

type QuestionTypes = "mcq" | "text" | "number" | "boolean";
