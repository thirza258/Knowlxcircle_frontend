import React, { useState } from 'react';
import ModalCreateArticle from './ModalCreateArticle';

const ArticleBuilder: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [sections, setSections] = useState<string[]>(['']); // Initial decoy section
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');

  const addSection = () => {
    setSections(prevSections => [...prevSections, '']);
  };

  const deleteSection = (index: number) => {
    setSections(prevSections => prevSections.filter((_, i) => i !== index));
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    setSections(prevSections => {
      const newSections = [...prevSections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      return newSections;
    });
  };

  const moveSectionDown = (index: number) => {
    if (index === sections.length - 1) return;
    setSections(prevSections => {
      const newSections = [...prevSections];
      [newSections[index + 1], newSections[index]] = [newSections[index], newSections[index + 1]];
      return newSections;
    });
  };

  const handleTextareaChange = (index: number, value: string) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = value;
      return newSections;
    });
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
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

  const handleModalTextChange = (text: string) => {
    setModalText(text);
  };

  return (
    <div className="flex">
      <div className="w-[20vw] h-full bg-gray-200 p-4">
        <div>
          <p>User</p>
          <p>Role</p>
        </div>
        <div>
          <button className="bg-white text-black w-full mt-20" onClick={openModal}>
            Generate With Gemini 
          </button>
        </div>
      </div>
      <div className="w-[80vw] h-full bg-gray-300 p-4">
        {step === 1 ? (
          <form onSubmit={handleTitleSubmit}>
            <div>
              <input
                type="text"
                className="bg-white text-black w-full"
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button type="submit" className="text-white w-full mt-10 bg-blue-500">
              Next
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">{title}</h2>
            <form method="post">
              <div className="mt-10">
                {sections.map((section, index) => (
                  <div className="flex mt-4 bg-gray-400" key={index}>
                    <textarea
                      className="p-2 w-full bg-white text-black"
                      placeholder="Section"
                      value={section}
                      onChange={(e) => handleTextareaChange(index, e.target.value)}
                    />
                    <div className="flex flex-col ml-2">
                      <button
                        type="button"
                        className="text-white bg-blue-500 mb-1"
                        onClick={() => moveSectionUp(index)}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className="text-white bg-green-500 mb-1"
                        onClick={addSection}
                      >
                        Create Section
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-500 mb-1"
                        onClick={() => deleteSection(index)}
                      >
                        Delete Section
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-500 mb-1"
                        onClick={() => moveSectionDown(index)}
                      >
                        Generate Gemini
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-500"
                        onClick={() => moveSectionDown(index)}
                      >
                        Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </form>
            <button className="text-white w-full mt-10 bg-blue-500">Create Article</button>
          </div>
        )}
      </div>
      {isModalOpen && <ModalCreateArticle closeModal={closeModal}  setModalText={handleModalTextChange} />}
    </div>
  );
};

export default ArticleBuilder;
