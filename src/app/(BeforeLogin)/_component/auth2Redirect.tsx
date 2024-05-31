"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase";
import { useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState, userIdState } from "@/store/auth";

export default function Auth2Redirect() {
  const [code, setCode] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const setUserId = useSetRecoilState(userIdState);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URL(window.location.href);
      const receivedCode = urlParams.searchParams.get("code");
      if (receivedCode) {
        setCode(receivedCode);
      }

      const fetchFcmToken = async () => {
        try {
          const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
          console.log("FCM 토큰 가져옴:", token);
          setFcmToken(token);
        } catch (error) {
          console.error("FCM 토큰을 가져오는 중 오류 발생:", error);
        }
      };

      fetchFcmToken();
    }
  }, []);

  useEffect(() => {
    console.log("코드 설정:", code);
    console.log("fcmToken 설정:", fcmToken);
    if (code && fcmToken) {
      const kakaoLogin = async () => {
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
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserId(data.userId);

            if (fcmToken) {
              console.log("kakaoLogin 안의 fcmToken:", fcmToken);
              try {
                const tokenRes = await fetch(`http://52.78.111.188:8080/user/fcm/token`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Authorization: `Bearer ${data.accessToken}`,
                  },
                  body: JSON.stringify({ fcmToken }),
                });

                if (tokenRes.status === 200 || 201) {
                  console.log("FCM 토큰 전송 성공");
                  router.replace("/my?tab=videos");
                } else {
                  console.error("FCM 토큰 전송 실패:", tokenRes.status);
                }
              } catch (tokenError) {
                console.error("FCM 토큰 전송 중 오류 발생:", tokenError);
              }
            }
          } else {
            console.error("예상치 못한 응답 상태:", res.status);
          }
        } catch (error) {
          console.log(error);
        }
      };

      kakaoLogin();
    }
  }, [code, fcmToken, router, setAccessToken, setRefreshToken, setUserId]);

  return null;
}
