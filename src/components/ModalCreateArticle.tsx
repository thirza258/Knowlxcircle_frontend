import { useState } from "react";
import GeminiService from "../services/GeminiService";
import { GeminiResponse } from "../types";

type ModalCreateArticleProps = {
  closeModal: any;
  confirmText: (text: string, id: number) => void;
  initialText: string;
};

const ModalCreateArticle = ({ closeModal, confirmText, initialText}: ModalCreateArticleProps) => {
    const [localText, setLocalText] = useState<string>(initialText);
    const [ idArticle, setIdArticle ] = useState<number>(0);
    const [article, setArticle] = useState<GeminiResponse | null>(null);
    const [step, setStep] = useState<number>(1);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setLocalText(text);
    };

    const handleNextStep = async () => {
        const response = await GeminiService.PostGeminiArticle(localText)
        setArticle(response)
        setIdArticle(response.id)
        console.log(localText)
        setStep(2);
    };

    const handleConfirm = () => {
        if (!article) {
          return;
        } else {
          confirmText(article.title, idArticle); 
        }
        closeModal();
    };

    const handleCancel = async () => {
        const response = await GeminiService.deleteGeminiArticle(idArticle)
        console.log(response)
        closeModal();
    }

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
                <h2 className="mb-2">{article?.title}</h2>
                {article?.sections.map((section) => (
                  <div key={section.id}>- {section.body}</div>
                ))}
                <div className="py-2">

                </div>
                <button
                  className="text-white bg-blue-500 mt-4"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className="text-white bg-red-500 mt-4"
                  onClick={handleCancel}
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
