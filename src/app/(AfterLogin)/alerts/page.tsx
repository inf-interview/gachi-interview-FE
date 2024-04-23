"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { useEffect, useState } from "react";

type alertsData = {
  title: string;
  description: string;
  date: Date;
};

const Alerts = () => {
  const [alertsData, setAlertsData] = useState<alertsData[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alert`);
      console.log(res.data);
      setAlertsData(res.data);
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">새로운 알림</h2>
      {alertsData.map((alert, index) => (
        <article key={index} className="mb-4">
          <Alert>
            <AlertTitle className="mb-2">
              <span>{alert.title}</span>
            </AlertTitle>
            <AlertDescription className="mb-4">{alert.description}</AlertDescription>
            <footer>
              <span className="text-sm text-gray-500">{alert.date.toLocaleString()}</span>
            </footer>
          </Alert>
        </article>
      ))}
    </section>
  );
};

export default Alerts;
