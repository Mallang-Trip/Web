"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/utils/api";
import { useAuthStore } from "@/stores/auth-store";

export function useSendLoginSms() {
  return useMutation({
    mutationFn: async ({ phoneNumber }: { phoneNumber: string }) => {
      const res = await AuthAPI.sendLoginSms(phoneNumber);
      return res?.data;
    },
  });
}

export function useVerifyLoginSms() {
  const { loginWithTokens } = useAuthStore();
  return useMutation({
    mutationFn: async (params: {
      txId: string;
      verificationCode: string;
      phoneNumber: string;
    }) => {
      const { txId, verificationCode } = params;
      const res = await AuthAPI.verifyLoginSms({
        txId,
        verificationCode,
      });
      return { api: res?.data, phoneNumber: params.phoneNumber } as const;
    },
    onSuccess: ({ api, phoneNumber }) => {
      const accessToken: string | undefined = api?.accessToken;
      const refreshToken: string | undefined = api?.refreshToken;
      if (accessToken && refreshToken) {
        loginWithTokens(accessToken, refreshToken, phoneNumber);
      }
    },
  });
}
