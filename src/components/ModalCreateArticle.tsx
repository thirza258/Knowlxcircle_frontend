import { useState, type ChangeEvent } from "react";
import OpenRouterService from "../services/OpenRouterService";
import type { GeneratedArticle } from "../types";

type ModalCreateArticleProps = {
  closeModal: () => void;
  confirmText: (text: string, id: number) => void;
  initialText: string;
};

const ModalCreateArticle = ({ closeModal, confirmText, initialText }: ModalCreateArticleProps) => {
    const [localText, setLocalText] = useState<string>(initialText);
    const [idArticle, setIdArticle] = useState<number>(0);
    const [article, setArticle] = useState<GeneratedArticle | null>(null);
    const [step, setStep] = useState<number>(1);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setLocalText(text);
    };

    const handleNextStep = async (): Promise<void> => {
        if (pending || !localText.trim()) {
          return;
        }
        setPending(true);
        setError(null);
        try {
          const response: GeneratedArticle = await OpenRouterService.postArticle(localText);
          setArticle(response);
          setIdArticle(response.id);
          setStep(2);
        } catch (err) {
          console.error("Error generating the article:", err);
          setError("The article could not be generated. Please try again.");
        } finally {
          setPending(false);
        }
    };

    const handleConfirm = () => {
        if (!article) {
          return;
        } else {
          confirmText(article.title, idArticle);
        }
        closeModal();
    };

    const handleCancel = async (): Promise<void> => {
        if (pending) {
          return;
        }
        setPending(true);
        try {
          await OpenRouterService.deleteArticle(idArticle);
        } catch (err) {
          console.error("Error discarding the generated article:", err);
        } finally {
          setPending(false);
          closeModal();
        }
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
                  disabled={pending}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="text-white bg-blue-500 mt-4"
                  onClick={() => {
                    void handleNextStep();
                  }}
                  disabled={pending}
                >
                  {pending ? "Generating..." : "Next"}
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
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="text-white bg-blue-500 mt-4"
                  onClick={handleConfirm}
                  disabled={pending}
                >
                  Confirm
                </button>
                <button
                  className="text-white bg-red-500 mt-4"
                  onClick={() => {
                    void handleCancel();
                  }}
                  disabled={pending}
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
