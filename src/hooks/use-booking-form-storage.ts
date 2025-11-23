import { useEffect, useState } from "react";

const STORAGE_PREFIX = "booking_form_";

/**
 * 투어별로 예약 폼 데이터를 세션 스토리지에 저장/불러오는 훅
 * 앱을 완전히 닫으면 세션 스토리지가 초기화됨
 */
export function useBookingFormStorage<T extends Record<string, any>>(
  tourId: string | number,
  initialData: T,
) {
  const storageKey = `${STORAGE_PREFIX}${tourId}`;
  const [formData, setFormData] = useState<T>(() => {
    // 초기 로드 시 세션 스토리지에서 데이터 불러오기
    if (typeof window === "undefined") return initialData;

    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsedData = JSON.parse(stored);
        return { ...initialData, ...parsedData };
      }
    } catch (error) {
      console.error("Failed to load booking form data from storage:", error);
    }

    return initialData;
  });

  // formData가 변경될 때마다 세션 스토리지에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(formData));
    } catch (error) {
      console.error("Failed to save booking form data to storage:", error);
    }
  }, [formData, storageKey]);

  // 폼 데이터 초기화 함수
  const clearFormData = () => {
    if (typeof window === "undefined") return;

    try {
      sessionStorage.removeItem(storageKey);
      setFormData(initialData);
    } catch (error) {
      console.error("Failed to clear booking form data from storage:", error);
    }
  };

  return {
    formData,
    setFormData,
    clearFormData,
  };
}
