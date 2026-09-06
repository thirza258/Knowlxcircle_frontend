import { useRef, useState, type FormEvent } from "react";
import ModalCreateArticle from "./ModalCreateArticle";
import ArticleService from "../services/ArticleService";
import type { ArticleResponse } from "../types";
import { useNavigate } from "react-router-dom";

type BuilderSection = {
  id: number;
  body: string;
};

const ArticleBuilder = () => {
  const [title, setTitle] = useState<string>("");
  const [sections, setSections] = useState<BuilderSection[]>([
    { id: 0, body: "" },
  ]);
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const [loadingDraft, setLoadingDraft] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ids are handed out here, in event handlers, never inside a setState
  // updater: updaters run twice under StrictMode and must stay pure.
  const nextSectionId = useRef<number>(1);
  const navigate = useNavigate();

  const createSection = (body: string): BuilderSection => {
    const id = nextSectionId.current;
    nextSectionId.current += 1;
    return { id, body };
  };

  const addSection = () => {
    const section = createSection("");
    setSections((prevSections) => [...prevSections, section]);
  };

  const deleteSection = (index: number) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== index));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    setSections((prevSections) => {
      const newSections = [...prevSections];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];
      return newSections;
    });
  };

  const moveSectionDown = (index: number) => {
    setSections((prevSections) => {
      if (index >= prevSections.length - 1) return prevSections;
      const newSections = [...prevSections];
      [newSections[index + 1], newSections[index]] = [
        newSections[index],
        newSections[index + 1],
      ];
      return newSections;
    });
  };

  const handleTextareaChange = (index: number, value: string) => {
    setSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, body: value } : section
      )
    );
  };

  const handleTitleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      setStep(2);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalTextChange = async (text: string, id: number): Promise<void> => {
    setModalText(text);
    setLoadingDraft(true);
    setError(null);
    try {
      const draft: ArticleResponse = await ArticleService.getArticlesById(id);
      setTitle(draft.title);
      setSections(draft.sections.map((section) => createSection(section.body)));
      setStep(2);
    } catch (err) {
      console.error("Error loading the generated article:", err);
      setError("The generated article could not be loaded.");
    } finally {
      setLoadingDraft(false);
    }
  };

  const createArticle = async (): Promise<void> => {
    if (submitting) {
      return;
    }
    if (!title.trim()) {
      setError("Give the article a title before creating it.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const created = await ArticleService.postArticleTitle(title);
      const articleId = created.id;

      // Sequential on purpose: the backend derives section order from the
      // insertion order. A failure here leaves a partially built article, so
      // say exactly which section did not make it.
      for (let index = 0; index < sections.length; index += 1) {
        try {
          await ArticleService.postSection(articleId, sections[index].body, index);
        } catch (sectionError) {
          console.error(`Error creating section ${index + 1}:`, sectionError);
          setError(
            `"${title}" was created, but section ${index + 1} of ${sections.length} could not be saved. Open the article and add the remaining sections again.`
          );
          return;
        }
      }

      navigate(`/article/${articleId}`);
    } catch (err) {
      console.error("Error creating article:", err);
      setError("The article could not be created. Nothing was saved.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-[20vw] h-[100vh] bg-gray-200 p-4">
        <div>
          <p>User</p>
          <p>Role</p>
        </div>
        <div>
          <button
            className="bg-white text-black w-full mt-20"
            onClick={openModal}
            disabled={loadingDraft || submitting}
          >
            Generate With AI
          </button>
          {loadingDraft && <p>Loading the generated article...</p>}
        </div>
      </div>
      <div className="w-[80vw] h-100vh bg-gray-300 p-4 ">
        {error !== null && <p className="text-red-500 mb-4">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleTitleSubmit}>
            <div>
              <input
                type="text"
                className="bg-white text-black w-full px-5"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white w-full mt-10 bg-blue-500"
            >
              Next
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">{title}</h2>
            <form method="post">
              <div className="mt-10">
                {sections.map((section, index) => (
                  <div className="flex mt-4 bg-gray-400" key={section.id}>
                    <textarea
                      className="p-2 w-full bg-white text-black"
                      placeholder="Section"
                      value={section.body}
                      onChange={(e) =>
                        handleTextareaChange(index, e.target.value)
                      }
                      disabled={submitting}
                    />
                    <div className="flex flex-col ml-2">
                      <button
                        type="button"
                        className="text-white bg-blue-500 mb-1"
                        onClick={() => moveSectionUp(index)}
                        disabled={submitting}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className="text-white bg-green-500 mb-1"
                        onClick={addSection}
                        disabled={submitting}
                      >
                        Create Section
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-500 mb-1"
                        onClick={() => deleteSection(index)}
                        disabled={submitting}
                      >
                        Delete Section
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-500"
                        onClick={() => moveSectionDown(index)}
                        disabled={submitting}
                      >
                        Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </form>
            <button
              type="button"
              onClick={() => {
                void createArticle();
              }}
              className="text-white w-full mt-10 bg-blue-500"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Article"}
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalCreateArticle
          closeModal={closeModal}
          confirmText={(text, id) => {
            void handleModalTextChange(text, id);
          }}
          initialText={modalText}
        />
      )}
    </div>
  );
};

export default ArticleBuilder;
