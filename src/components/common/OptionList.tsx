import React, { useEffect, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";

interface IOptionList {
  defaultOptions: OptionVal[];
  onChange: (e: OptionVal[]) => void;
}

interface OptionVal {
  label: string;
  value: string;
}

const OptionInput = ({
  onValChange,
}: {
  onValChange: (e: OptionVal) => void;
}) => {
  const [val, setVal] = useState<OptionVal>({
    label: "",
    value: "",
  });

  useEffect(() => {
    onValChange(val);
  }, [val]);

  return (
    <div className="grid grid-cols-2 gap-x-2">
      <div className="flex flex-col">
        <label>Label</label>
        <TextInput
          value={val.label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setVal((prev) => ({ ...prev, label: val }));
          }}
        />
      </div>
      <div className="flex flex-col">
        <label>Value</label>
        <TextInput
          value={val.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setVal((prev) => ({ ...prev, value: val }));
          }}
        />
      </div>
    </div>
  );
};

const ViewOption = ({
  option,
  onDelete,
}: {
  option: OptionVal;
  onDelete: () => void;
}) => (
  <div className="flex justify-between w-full">
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col">
        <div className="font-semibold">{option.label}</div>
      </div>
      <div className="flex flex-col">
        <div>{option.value}</div>
      </div>
    </div>
    <button onClick={onDelete}>Delete</button>
  </div>
);

const OptionList: React.FC<IOptionList> = ({
  defaultOptions = [],
  onChange,
}) => {
  const [options, setOptions] = useState<OptionVal[]>(defaultOptions);
  const [newOption, setNewOption] = useState<OptionVal>({
    value: "",
    label: "",
  });

  useEffect(() => {
    onChange(options);
  }, [options]);

  return (
    <div className="flex flex-col gap-y-2">
      <div>
        {options.map((option, i) => (
          <ViewOption
            key={`main-${option.value}`}
            option={option}
            onDelete={() => {
              const optCopy = [...options];
              console.log("splicing ", i)
              setOptions([...optCopy.splice(i, 1)]);
            }}
          />
        ))}
      </div>
      <div className="flex w-full gap-x-4">
        <OptionInput onValChange={setNewOption} />
        <button
          onClick={() => {
            if (newOption.label && newOption.value) {
              setOptions((prev) => [...prev, newOption]);
              setNewOption({
                  value: "",
                  label: ""
              })
            }
          }}
        >
          Add
        </button>
      </div>
      {(newOption.label.length === 0 || newOption.value.length === 0) && (
          <div className="text-red-600">Both label and value are required</div>
        )}
    </div>
  );
};

export default OptionList;
