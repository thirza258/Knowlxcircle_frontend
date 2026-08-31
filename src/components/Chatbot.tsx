import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GeminiService from "../services/GeminiService";
import type { PromptResponse } from "../types";
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";

const NEW_CHAT_TITLE = "Ask a new question";
const NEW_CHAT_BODY = "Supposedly Your Response";

const parsePromptId = (raw: string | undefined): number | null => {
  if (raw === undefined || !/^\d+$/.test(raw)) {
    return null;
  }
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) ? parsed : null;
};

const Chatbot = () => {
  const { id } = useParams<{ id: string }>();
  const promptId = parsePromptId(id);

  const [prompts, setPrompts] = useState<PromptResponse[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>(NEW_CHAT_BODY);
  const [promptTitle, setPromptTitle] = useState<string>(NEW_CHAT_TITLE);
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async (): Promise<void> => {
      try {
        const history = await GeminiService.getGeminiPrompt();
        if (!ignore) {
          setPrompts(history);
        }
      } catch (err) {
        console.error("Error fetching the prompt history:", err);
        if (!ignore) {
          setPrompts([]);
        }
      }
    };

    const fetchDetail = async (detailId: number): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const detail = await GeminiService.getGeminiPromptDetail(detailId);
        if (!ignore) {
          setPromptTitle(detail.prompt);
          setResponse(detail.response);
        }
      } catch (err) {
        console.error("Error fetching the prompt:", err);
        if (!ignore) {
          setPromptTitle(NEW_CHAT_TITLE);
          setResponse("");
          setError("This conversation could not be loaded.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    if (promptId !== null) {
      void fetchDetail(promptId);
    } else {
      // /askbot with no id, or with an id that is not a number at all.
      const unusableId = id !== undefined;
      setPromptTitle(unusableId ? "Conversation not found" : NEW_CHAT_TITLE);
      setResponse(unusableId ? "" : NEW_CHAT_BODY);
      setError(unusableId ? "That conversation id is not valid." : null);
      setLoading(false);
    }

    return () => {
      ignore = true;
    };
  }, [promptId, id]);

  // Scroll only for a real answer. `response` starts out as the placeholder
  // body, so an unguarded effect would scroll the page on first paint of
  // /askbot - something the page never did before.
  useEffect(() => {
    if (promptId === null || !response) {
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [response, promptId]);

  const handleAskNew = async (): Promise<void> => {
    const query = prompt.trim();
    if (!query || sending) {
      return;
    }
    setSending(true);
    setError(null);
    try {
      const created: PromptResponse = await GeminiService.postGeminiPrompt(query);
      setPrompt("");
      navigate(`/askbot/${created.id}`);
    } catch (err) {
      console.error("Error posting new prompt:", err);
      setError("Your question could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleAskNewPrompt = () => {
    navigate(`/askbot`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex p-2 h-full">
        <div className="w-[20vw] h-[100vh] overflow-y-auto">
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
            {prompts.map((historyItem) => (
              <div key={historyItem.id}>
                <Link to={`/askbot/${historyItem.id}`}>
                  <div className="horizontal-line"></div>
                  <h1 className="text-base">{historyItem.prompt}</h1>
                  <div className="horizontal-line"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="border-l-2 border-black h-full"></div>

        <div className="w-[80vw] flex flex-col h-[100vh]">
          <div className="flex-grow overflow-y-auto">
            <div className="p-3">
              <div className="horizontal-line"></div>
              
              <h1 className="text-base text-right">{promptTitle}</h1>
              <div className="horizontal-line"></div>
            </div>
            <div className="px-3">
              <div className="horizontal-line"></div>
              {loading || sending ? "Loading..." : <ReactMarkdown>{response}</ReactMarkdown>}
              <div className="horizontal-line"></div>
            </div>
            <div ref={bottomRef}></div>
          </div>
          <div className="p-4">
            {error !== null && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              className="text-black w-full px-4 py-2 border border-black bg-white rounded-lg"
              placeholder="Generate Prompt"
              value={prompt}
              disabled={sending}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Trigger the button click event
                  void handleAskNew();
                }
              }}
            />
            <button
              id="askNewButton"
              className="w-full my-2 gradient-border bg-white text-black px-4 py-2 rounded-lg shadow-md"
              disabled={sending || prompt.trim() === ""}
              onClick={() => {
                void handleAskNew();
              }}
            >
              {sending ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
