"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth2Redirect() {
  const [code, setCode] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URL(window.location.href);
      const receivedCode = urlParams.searchParams.get("code");
      if (receivedCode) {
        setCode(receivedCode);
      }
    }
  }, []);

  useEffect(() => {
    const kakaoLogin = async () => {
      if (code) {
        // await axios({
        //   method: "GET",
        //   url: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}?code=${code}`,
        //   headers: {
        //     "Content-Type": "application/json;charset=urf-8",
        //   },
        // }).then((res) => {
        //   console.log("res", res);
        //   // localStorage.setItem()
        //   router.replace("/my?tab=videos");
        // });
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
            { authorizationCode: code },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          if (res.status === 200) {
            console.log("로그인 성공");
            console.log("res", res);
            router.replace("/my?tab=videos");
          }
        } catch (error) {
          console.error("로그인 에러:", error);
        }
      }
    };

    kakaoLogin();
  }, [code, router]);

  return null;
}
