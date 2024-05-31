"use client";

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
        try {
          const res = await fetch(`http://52.78.111.188:8080/user/kakao/login?code=${code}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          });

          if (res.status === 201) {
            console.log("로그인 성공");
            const data = await res.json();
            console.log("res", data);
            // 임의로 추가했습니다.
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("userId", data.userId);
            // ---
            router.replace("/my?tab=videos");
          } else {
            console.error("예상치 못한 응답 상태:", res.status);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    kakaoLogin();
  }, [code, router]);

  return null;
}
