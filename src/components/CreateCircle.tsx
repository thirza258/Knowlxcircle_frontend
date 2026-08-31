import Navbar from "./Navbar";
import CircleService from "../services/CircleService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";

/**
 * Mirrors the backend contract: `Circle.name` is a required
 * `CharField(max_length=50)`, while the serializer declares `description`
 * optional (`required=False, allow_blank=True`) - so a blank description must
 * NOT be rejected here, or the form would refuse input the API accepts.
 */
const NAME_MAX_LENGTH = 50;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Turn a rejected request into one readable line. A 400 arrives as the usual
 * envelope with the serializer errors in `response`
 * (`{status: 400, message: "Bad Request", response: {name: ["..."]}}`);
 * anything else falls back to the caller's generic message.
 */
const readBackendError = (error: unknown): string | null => {
  if (!isRecord(error)) {
    return null;
  }
  const httpResponse = error.response;
  if (!isRecord(httpResponse)) {
    return null;
  }
  const body = httpResponse.data;
  if (!isRecord(body)) {
    return null;
  }
  const details = body.response;
  if (!isRecord(details)) {
    return typeof body.message === "string" ? body.message : null;
  }
  const lines = Object.entries(details).map(([field, messages]) => {
    const text = Array.isArray(messages) ? messages.join(" ") : String(messages);
    return `${field}: ${text}`;
  });
  return lines.length > 0 ? lines.join(" ") : null;
};

const validateName = (name: string): string | null => {
  if (name.length === 0) {
    return "Please enter a circle name.";
  }
  if (name.length > NAME_MAX_LENGTH) {
    return `The circle name must be ${NAME_MAX_LENGTH} characters or fewer.`;
  }
  return null;
};

const CreateCircle = () => {
  const [circleName, setCircleName] = useState<string>("");
  const [circleDescription, setCircleDescription] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCreate = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    // The button used to be a bare `type="submit"` with an onClick handler, so
    // the browser navigated away and reloaded the page under the request.
    event.preventDefault();

    const name = circleName.trim();
    const description = circleDescription.trim();

    const validationError = validateName(name);
    if (validationError !== null) {
      setError(validationError);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const created = await CircleService.PostCircleArticle(name, description);
      // Success is signalled by landing on the new circle's page. `submitting`
      // deliberately stays true: the button must not re-enable while this
      // component is on its way out. (Setting a success message here would be
      // dead code - the update and the navigation flush in the same batch, so
      // the message could never paint.)
      navigate(`/circle/${created.id}`);
    } catch (err) {
      console.error("Error creating the circle:", err);
      setError(
        readBackendError(err) ?? "The circle could not be created. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="w-[80vw] ps-10">
          <h1 className="text-3xl font-semibold mb-6">Create Circle</h1>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              void handleCreate(event);
            }}
            noValidate
          >
            <div>
              <label
                htmlFor="circleName"
                className="block text-sm font-medium text-gray-700"
              >
                Circle Name
              </label>
              <input
                type="text"
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
                id="circleName"
                placeholder="Circle Name"
                maxLength={NAME_MAX_LENGTH}
                disabled={submitting}
                className="mt-1 block w-full text-black bg-white px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="circleDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Circle Description
              </label>
              <input
                type="text"
                value={circleDescription}
                onChange={(e) => setCircleDescription(e.target.value)}
                id="circleDescription"
                placeholder="Description"
                disabled={submitting}
                className="mt-1 text-black bg-white block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error !== null && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Circle"}
              </button>
            </div>
          </form>
        </div>
        <div className="w-[20vw] p-10">
          <div>
            <p>User - Role</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCircle;
