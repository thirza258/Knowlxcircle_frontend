import react_image from "../assets/react.svg";
import DashboardCard from "./DashboardCard";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex">
        <div className="w-[20vw] bg-gray-200 p-4">First Column</div>
        <div className="w-[80vw] bg-gray-300 p-4">
          <div className="overflow-x-auto flex space-x-4 p-4">
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
            <img
              src={react_image}
              alt="react"
              className="w-1/2 flex-shrink-0"
            />
          </div>
          {/* card for each article information */}
          <DashboardCard />
        <DashboardCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
