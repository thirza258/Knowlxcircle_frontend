const DashboardCard = () => {
    return (
        <div className="m-4 border-b">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">Title</h2>
                <p className="text-sm">Author</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm mx-4">Views: 123</p>
                <p className="text-sm mx-4">
                  Sentiment : <span className="text-green">Good</span>
                </p>
              </div>
              <div>
                <button className="btn-primary mr-2">Edit</button>
                <button className="btn-primary">Delete</button>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm">Description</p>
            </div>
            <div className="p-4">
              <p className="text-sm">AI Views</p>
            </div>
          </div>
    );
}

export default DashboardCard;