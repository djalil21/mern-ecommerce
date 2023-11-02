import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/featuredInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Home = () => {
  const [userStats, setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      const res = await userRequest.get("user/stats");
      res.data.map((item) =>
        setUserStats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], "Active User": item.total },
        ])
      );
    };
    getStats();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        title="Monthly Active Users"
        data={userStats}
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
