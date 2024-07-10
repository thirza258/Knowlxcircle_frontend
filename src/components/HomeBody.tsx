import CardFunc from "./CardFunc";
import { SearchResponse } from "../types";

type HomeBodyProps = {
    response : SearchResponse
}

const HomeBody = (response: HomeBodyProps) => {
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
                    {response.response.prompt}
                </h2>
                <p className="mt-10">
                    {response.response.response}
                </p>
            </section>
        </div>
    )
}

export default HomeBody;