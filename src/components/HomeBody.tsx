import CardFunc from "./CardFunc";

const HomeBody = () => {
    return (
        <div>
            <div className="flex items-center">
                <div className="flex-1">
                <CardFunc title={"Create Article and Knowledge"}/>
                </div>
                <div className="flex-1">
                <CardFunc title={"Search Knowledge"}/>
                </div>
                <div className="flex-1">
                <CardFunc title={"Join Circle"}/>
                </div>
                
            </div>

            <section className="mt-10">
                <h2 className="primary-nav">
                    Search Query
                </h2>
                <p className="mt-10">
                    Answer
                </p>
            </section>
        </div>
    )
}

export default HomeBody;