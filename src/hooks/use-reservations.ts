"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReservationAPI, ApiError } from "@/utils/api";

type CreateReservationBody = {
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string; // 국제 형식 "+821012345678"
  userCount: number;
  meetingDate: string; // ISO 8601
  pickupTime: string; // HH:mm
  pickupAddress: string;
  returnAddress: string;
  requests?: string;
  price: number;
};

export type ReservationCreateData = {
  reservationId?: number;
  id?: number;
  reservationName: string;
  email: string;
  name: string;
  phoneNumber: string;
  userCount: number;
  meetingDate: string;
  pickupTime: string;
  pickupAddress: string;
  returnAddress: string;
  requests?: string | null;
  price: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | string;
  isModifiable?: boolean;
  isCancelable?: boolean;
  adminMemo?: string | null;
  createdAt: string;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
};

export type MyReservationItem = {
  reservationId?: number;
  id?: number;
  reservationName?: string;
  status?: string;
  meetingDate?: string;
  pickupTime?: string;
  pickupAddress?: string | null;
  returnAddress?: string | null;
  price?: number | string;
  userCount?: number;
  requests?: string | null;
  adminMemo?: string | null;
  createdAt: string;
} & Record<string, unknown>;

export type MyReservationsData = {
  reservations: MyReservationItem[];
  totalCount: number;
  hasNext: boolean;
};

// 관리자 전체 조회 아이템 (관리자 전용 필드 포함)
export type AdminReservationItem = MyReservationItem & {
  email: string;
  name: string;
  phoneNumber: string;
  userId?: number;
  isModifiable?: boolean;
  isCancelable?: boolean;
  requestedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  canceledAt?: string | null;
};

export type AdminReservationsData = {
  reservations: AdminReservationItem[];
  totalCount: number;
  hasNext: boolean;
};

export type AvailabilityData = {
  destinationId: number;
  destinationTitle: string;
  destinationAddress: string;
  destinationStatus: string;
  isDestinationActive: boolean;
  hasActiveReservation: boolean;
  isBookable: boolean;
  reason: string | null;
};

export function useCreateReservation() {
  return useMutation({
    mutationFn: async (body: CreateReservationBody) => {
      const res = await ReservationAPI.create<ReservationCreateData>(body);
      return res.data;
    },
  });
}

export function useSearchReservations(params: {
  email: string;
  phoneNumber: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["reservations", "search", params.email, params.phoneNumber],
    queryFn: async () => {
      const res = await ReservationAPI.search<MyReservationsData>({
        email: params.email,
        phoneNumber: params.phoneNumber,
      });
      return res.data as MyReservationsData;
    },
    staleTime: 30 * 1000,
    enabled: params.enabled ?? true,
  });
}

// 관리자 전체 예약 목록 조회 (페이지네이션)
export function useAdminAllReservations(params: {
  offset: number;
  limit: number;
  enabled?: boolean;
}) {
  return useQuery<AdminReservationsData, ApiError>({
    queryKey: ["reservations", "admin", "all", params.offset, params.limit],
    queryFn: async () => {
      const res = await ReservationAPI.adminAll<AdminReservationsData>({
        offset: params.offset,
        limit: params.limit,
      });
      return res.data as AdminReservationsData;
    },
    placeholderData: keepPreviousData,
    staleTime: 10 * 1000,
    enabled: params.enabled ?? true,
    retry: false,
  });
}

// 로그인 사용자의 토큰 기반 내 예약 목록 조회
export function useMyReservations(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["reservations", "my"],
    queryFn: async () => {
      const res = await ReservationAPI.my<MyReservationsData>();
      return res.data as MyReservationsData;
    },
    staleTime: 30 * 1000,
    enabled: options?.enabled ?? true,
  });
}

export function useCancelReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      reservationId: number | string;
      requests?: string;
    }) => {
      const res = await ReservationAPI.cancel(
        params.reservationId,
        params.requests,
      );
      return res?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

export function useApproveReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      reservationId: number | string;
      adminMemo?: string;
    }) => {
      const res = await ReservationAPI.approve(
        params.reservationId,
        params.adminMemo,
      );
      return res?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

export function useRejectReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      reservationId: number | string;
      reason: string;
      adminMemo?: string;
    }) => {
      const res = await ReservationAPI.reject(params.reservationId, {
        reason: params.reason,
        adminMemo: params.adminMemo,
      });
      return res?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

export function useDestinationAvailability(
  destinationId: number | null | undefined,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["reservations", "availability", destinationId],
    queryFn: async () => {
      if (!destinationId) return null;
      const res = await ReservationAPI.availability(destinationId);
      return res.data as AvailabilityData;
    },
    enabled: !!destinationId && (options?.enabled ?? true),
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      reservationId: number | string;
      body: Partial<CreateReservationBody>;
    }) => {
      const res = await ReservationAPI.update(
        params.reservationId,
        params.body,
      );
      return res?.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
}

// 공개 상세 조회 (ID 기반)
export function useReservationById(reservationId: number | string | null) {
  return useQuery({
    queryKey: ["reservations", "detail", reservationId],
    queryFn: async () => {
      if (reservationId === null || reservationId === undefined) return null;
      const res = await ReservationAPI.getById<{ [key: string]: any }>(
        reservationId,
      );
      return res.data;
    },
    enabled: reservationId !== null && reservationId !== undefined,
  });
}
