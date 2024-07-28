import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GeminiService from "../services/GeminiService";
import { PromptResponse, PromptListResponse } from "../types";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [prompts, setPrompts] = useState<PromptResponse[] | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [promptTitle, setPromptTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GeminiService.getGeminiPrompt();
      setPrompts(response);
    };
    fetchData();

    if (id) {
      const fetchDetail = async () => {
        const response = await GeminiService.getGeminiPromptDetail(Number(id));
        setPromptTitle(response.prompt);
        setResponse(response.response);
      }
      fetchDetail();
    } else {
      setPromptTitle("Ask a new question");
      setResponse("Supposedly Your Response");
    };
  }, [id]);

  const handleAskNew = async () => {
    setLoading(true);
    try {
      const response = await GeminiService.postGeminiPrompt(prompt);
      console.log(response);
      if (response) {
        navigate(`/askbot/${response.id}`);
      }
    } catch (error) {
      console.error("Error posting new prompt:", error);
      // Handle error, maybe show a message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleAskNewPrompt = async () => {
    navigate(`/askbot`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex p-2 h-full">
        <div className="w-[20vw] h-full overflow-y-auto">
          <div className="text-black p-3">
            <p>User</p>
            <p>Role</p>
          </div>
          <div>
            <button 
            onClick={handleAskNewPrompt}
            className="w-full my-2 gradient-border bg-white text-black px-4 py-2 rounded-lg shadow-md">
              Ask New
            </button>
          </div>
          <div className="text-center p-2">
            {prompts?.map((prompt) => (
              <div key={prompt.id}>
                <Link to={`/askbot/${prompt.id}`}>
                  <div className="horizontal-line"></div>
                  <h1 className="text-base">{prompt.prompt}</h1>
                  <div className="horizontal-line"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border-l-2 border-black h-full"></div>

        <div className="w-[80vw] flex flex-col h-full">
          <div className="flex-grow">
            <div className="p-3">
              <div className="horizontal-line"></div>
              
              <h1 className="text-base text-right">{promptTitle}</h1>
              <div className="horizontal-line"></div>
            </div>
            <div className="px-3">
              <div className="horizontal-line"></div>
              {loading ? "Loading..." : <ReactMarkdown>{response}</ReactMarkdown>}
              <div className="horizontal-line"></div>
            </div>
          </div>
          <div className="p-4">
            <input
              type="text"
              className="text-black w-full px-4 py-2 border border-black bg-white rounded-lg"
              placeholder="Generate Prompt"
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Trigger the button click event
                  handleAskNew();
                }
              }}
            />
            <button
              id="askNewButton"
              className="w-full my-2 gradient-border bg-white text-black px-4 py-2 rounded-lg shadow-md"
              onClick={() => {
                // Handle button click logic here
                console.log("Button clicked");
                handleAskNew();
                // You can also call a function to handle the prompt generation
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
