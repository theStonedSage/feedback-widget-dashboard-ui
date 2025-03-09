import React, { useState } from "react";
import Button from "../common/Button";
import CreateOrEditQuestionModal from "./CreateOrEditQuestionModal";

interface IAddOptionButton {}

const AddQuestionButton: React.FC<IAddOptionButton> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}> Add Question </Button>
      <CreateOrEditQuestionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AddQuestionButton;
