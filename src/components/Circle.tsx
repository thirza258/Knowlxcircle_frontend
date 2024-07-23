const Circle = () => {
  return (
    <div className="flex p-4">
      <div className="w-[80vw]">
        <div className="h-[50vh]">
          <div>Circle for Finance</div>
          <div>Description</div>
        </div>
        <div>
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
          </div>
        </div>
      </div>
      <div className="w-[20vw]">
        <div px-4>
          <p>User - Role</p>
        </div>
      </div>
    </div>
  );
};

export default Circle;
