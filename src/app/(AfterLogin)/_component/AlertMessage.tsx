"use client";

import { messaging } from "@/firebase";
import { onMessage } from "firebase/messaging";
import Link from "next/link";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlertMessage() {
  useEffect(() => {
    onMessage(messaging, (payload) => {
      toast.info(payload.notification?.body);
    });
  }, []);

  return (
    <Link href="/alerts">
      <ToastContainer position="top-right" autoClose={8000} />
    </Link>
  );
}
