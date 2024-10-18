import { IonContent, IonImg, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import axios from "../utils/axiosConfig";
import moment from "moment";

const Home: React.FC = () => {
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/interventions/line-chart");
        const fetchedData = response.data;

        const startDate = moment().subtract(29, "days").startOf("day");
        const last30Days = [];

        for (let i = 0; i < 30; i++) {
          last30Days.push(startDate.clone().add(i, "days").format("DD/MM"));
        }

        const filledData = last30Days.map((date) => {
          const dataForDate = fetchedData.find(
            (item: any) => item.interventions === date
          );
          return dataForDate ? dataForDate : { interventions: date, val: 0 };
        });

        console.log(filledData);
        setLineChartData(filledData);

        const pieChartResponse = await axios.get(
          "/api/interventions/device-frequency"
        );
        setPieChartData(pieChartResponse.data)
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <div className="p-3 w-32">
        <IonImg src="/icon_logo BWS.svg"></IonImg>
      </div>
      <p className="w-full text-base font-bold text-center">
        Statistique des interventions
      </p>
      <div className="flex justify-end items-center px-3 gap-2 my-2">
        <p className="font-bold">Nombre total</p>{" "}
        <p className="bg-gray-200 border-blue-500 border-2 text-blue-500 px-4 py-0.5 rounded-md font-bold">
          8
        </p>
      </div>
      <IonContent>
        <LineChart data={lineChartData} />
        <PieChart data={pieChartData} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
