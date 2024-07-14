const Article = () => {
    return (
        
            <div className="grid grid-cols-5 gap-4">
                {/* First column, first row */}
                <div className="col-span-1 bg-gray-200 p-4">
                    {/* Empty */}
                </div>
                
                {/* Second column, first row */}
                <div className="col-span-4 bg-gray-300 p-4">
                    <h2 className="text-center font-bold text-4xl font-sans bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                        Title
                    </h2>
                </div>
        
                {/* First column, second row */}
                <div className="col-span-1 bg-gray-200 p-4">
                    <div>User</div>
                    <div>Role</div>
                </div>
        
                {/* Second column, second row */}
                <div className="col-span-4 bg-gray-300 p-4">
                    <div className="font-bold text-black font-sans text-base">
                        <p className="font-bold">Sub Title</p>
                    </div>
                    <div className="font-bold text-black font-sans text-base">
                        <p className="font-bold">Content</p>
                    </div>
                </div>
        
                {/* First column, third row */}
                <div className="col-span-1 bg-gray-200 p-4">
                    {/* Empty */}
                </div>
        
                {/* Second column, third row */}
                <div className="col-span-4 bg-gray-300 p-4">
                    <div className="font-bold text-black text-center font-sans text-lg">
                        <p className="font-bold">Comments</p>
                    </div>
                    <div className="text-black font-sans text-base">
                        <p className="font-bold">Comments</p>
                    </div>
                </div>
            </div>

    )
}

export default Article