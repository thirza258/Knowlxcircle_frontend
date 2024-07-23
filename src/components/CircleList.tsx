const CircleList = () => {
  return (
    <div className="flex pt-10">
      <div className="w-[10vw] h-[100vh] bg-black">
        <div className="text-white p-3">
          <p>User</p>
          <p>Role</p>
        </div>
      </div>
      <div className="w-[90vw] ms-3">
        <div>
            <h1 className="text-2xl font-semibold mb-4">Circle</h1>
        </div>
        <div className="flex w-full items-center justify-between p-4 border-b bg-gray-200">
          <div>
            <h2 className="text-lg font-semibold">Title</h2>
            <p className="text-sm">Description</p>
          </div>
          <div className="flex items-center">
            <p className="text-sm mx-4">
              Sentiment : <span className="text-green">Good</span>
            </p>
          </div>
          <div>
            <p className="text-sm mx-4">User: 123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleList;
