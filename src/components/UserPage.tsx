import Footer from "./Footer";

const UserPage = () => {
    return (
        <div>
            <h1 className="primary-header title">User Page</h1>
            <section className="mt-10">
                <p className="primary-nav">
                    There is nothing here yet. Your profile details and activity will
                    appear on this page once they are available.
                </p>
            </section>
            <section className="mt-20">
                <Footer />
            </section>
        </div>
    );
};

export default UserPage;
