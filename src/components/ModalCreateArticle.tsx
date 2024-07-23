import { useState } from "react";

const ModalCreateArticle = ({ closeModal, setModalText }: { closeModal: any; setModalText: (text: string) => void; }) => {
    const [localText, setLocalText] = useState<string>('');
    const [step, setStep] = useState<number>(1);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setLocalText(text);
        setModalText(text);
    };

    const handleNextStep = () => {
        setStep(2);
    };

    const handleConfirm = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            {step === 1 ? (
              <>
                <textarea
                  className="w-full h-40 p-2 bg-gray-100 text-black"
                  placeholder="Generated Content"
                  value={localText}
                  onChange={handleTextChange}
                />
                <button
                  className="text-white bg-blue-500 mt-4"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <p>{localText}</p>
                <button
                  className="text-white bg-blue-500 mt-4"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className="text-white bg-red-500 mt-4"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
    );
}

export default ModalCreateArticle;
