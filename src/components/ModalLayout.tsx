import React, { ReactNode } from "react";

interface IModal {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  okText: string;
  onOkay: () => void;
  cancelText: string;
  onClose: () => void;
  onCancel: () => void;
  okProps: any;
  noFooter?: boolean;
}

const ModalLayout: React.FC<IModal> = ({
  title,
  isOpen,
  children,
  okText,
  onClose,
  onOkay,
  cancelText,
  okProps,
  noFooter = false,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-50 px-4 py-3 sm:flex text-xl justify-between items-center font-semibold text-gray-900 sm:px-6">
              <h1>{title}</h1>
              <div className="cursor-pointer" onClick={onClose}>
                <img
                  alt="cross-icon"
                  src="https://cdn.peoplegrove.com/admin/1669806746926Icon.svg"
                />
              </div>
            </div>
            <div className="bg-white px-4 py-4 sm:p-6 sm:pb-4">{children}</div>
            {!noFooter && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  {...okProps}
                  onClick={onOkay}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {okText}
                </button>
                <button
                  onClick={onCancel}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {cancelText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
