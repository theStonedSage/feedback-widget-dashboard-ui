import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { useValidateQuestionsPayload } from "../../hooks/useValidateQuestionsPayload";
import { useAddQuestion } from "../../queries/useAddQuestion";
import { useUpdateQuestion } from "../../queries/useUpdateQuestion";
import OptionList from "../common/OptionList";
import TextInput from "../common/TextInput";
import ModalLayout from "../ModalLayout";

interface IEditQuestionModal {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  question?: FeedbackQuestion;
}

const CreateOrEditQuestionModal: React.FC<IEditQuestionModal> = ({
  isOpen,
  setIsOpen,
  question,
}) => {
  const [formValues, setFormValues] = useState<any>({
    label: "",
    required: false,
    type: "text",
  });
  const [error, setError] = useState("");
  const validatePayload = useValidateQuestionsPayload();
  const queryClient = useQueryClient();
  const { mutate: updateQuestion } = useUpdateQuestion({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-questions"] });
      setIsOpen(false);
    },
  });
  const { mutate: addQuestion } = useAddQuestion({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-questions"] });
      setIsOpen(false);
    },
  });
  useEffect(() => {
    setError("");
  }, [formValues]);

  const isEdit = useMemo(() => !!question?.docId, [question]);

  useEffect(() => {
    if (question) {
      const { label, required, options = [], type } = question;
      setFormValues({
        label,
        required,
        ...(options.length > 0 && { options }),
        type,
      });
    }
  }, [question]);

  const setFormValueByKey = (
    key: "label" | "required" | "type" | "options",
    value: any
  ) => {
    setFormValues((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <ModalLayout
      title={isEdit ? "Edit Question" : "Create Question"}
      isOpen={isOpen}
      okText={"Submit"}
      cancelText="Cancel"
      okProps={{}}
      onClose={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      onOkay={() => {
        const { isValid, message } = validatePayload(formValues);
        if (!isValid && message) {
          return setError(message);
        }

        if (isEdit) {
          if (question && question?.docId) {
            updateQuestion({
              docId: question.docId,
              data: formValues,
            });
          }
        } else {
          addQuestion(formValues);
        }
      }}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-900">Label</label>
          <TextInput
            value={formValues.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              setFormValueByKey("label", val);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-900">Required</label>
          <input
            type="checkbox"
            className="mr-auto"
            value={formValues.required}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.checked;
              setFormValueByKey("required", val);
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label className="font-semibold text-gray-900">Type</label>
          <select
            value={formValues.type}
            onChange={(e) => {
              const val = e.target.value;
              setFormValueByKey("type", val);
            }}
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"text"}>Text</option>
            <option value={"number"}>Number</option>
            <option value={"boolean"}>True/False</option>
            <option value={"mcq"}>Mcq</option>
          </select>
        </div>
        {formValues.type === "mcq" && (
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-900">Options</label>
            <OptionList
              defaultOptions={formValues.options}
              onChange={(e) => setFormValueByKey("options", e)}
            />
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </ModalLayout>
  );
};

export default CreateOrEditQuestionModal;
