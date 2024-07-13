import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import useAxiosPrivate from "../hook/useAxiosPrivate";

const COLORS = ["#FF6384", "#36A2EB", "#35c034"];

const DashboardStat = () => {
  const [countInfo, setCountInfo] = useState({});
  const axiosSecure = useAxiosPrivate();
  const [charData, setChartData] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axiosSecure.get("/stats/all");
      const data = response.data;
      setCountInfo(data);
      setChartData(
        Object.entries(data.user_stats).map(([role, count], index) => ( role!="total" &&{
          name: role,
          value: count,
          color: COLORS[index % COLORS.length],
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div className="mx-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 items-center">
          {Object.entries(countInfo.user_stats || {}).map(([key, value]) => (
            key!="total" &&
            <div
              key={key}
              className="w-40 h-24 shadow-lg flex flex-col justify-center items-center rounded-xl"
            >
              <p className="text-2xl capitalize">{key}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 mt-10 ">
        <div className="flex justify-center flex-col">
          <PieChart width={300} height={400}>
            <Pie
              data={charData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {charData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="text-2xl font-semibold ml-40 -mt-32 ">
            Role Count
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStat;
