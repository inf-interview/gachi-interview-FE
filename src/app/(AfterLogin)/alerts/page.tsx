"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { accessTokenState } from "@/store/auth";
import customFetcher from "@/lib/utills/customFetcher";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type alertsData = {
  title: string;
  description: string;
  date: Date;
};

const Alerts = () => {
  const [alertsData, setAlertsData] = useState<alertsData[]>([]);
  const accessToken = useRecoilValue(accessTokenState);

  const fetchData = async () => {
    try {
      const { response, data } = await customFetcher(`/alert`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response?.ok) {
        throw new Error("Failed to fetch data");
      }

      console.log(data);
      setAlertsData(data);
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
