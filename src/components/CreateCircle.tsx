import Navbar from "./Navbar";

const CreateCircle = () => {
  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="w-[80vw] ps-10">
          <h1 className="text-3xl font-semibold mb-6">Create Circle</h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="circleName"
                className="block text-sm font-medium text-gray-700"
              >
                Circle Name
              </label>
              <input
                type="text"
                id="circleName"
                placeholder="Circle Name"
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
                id="circleDescription"
                placeholder="Description"
                className="mt-1 text-black bg-white block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Circle
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
