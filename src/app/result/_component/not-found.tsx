"use client";

import { Button } from "@/components/ui/button";
import ReservationListDrawer from "./reservation-list-drawer";
import { useTranslation } from "@/hooks/use-translation";
import { GA_EVENTS } from "@/lib/analytics-events";

interface NotFoundProps {
  reservations: Array<{
    reservationId: number | string;
    reservationName: string;
    meetingDate: string;
    price: number;
    status: string;
    createdAt: string;
    pickupAddress: string;
    returnAddress: string;
  }>;
}

export default function NotFound({ reservations }: NotFoundProps) {
  const { t } = useTranslation();
  const tNotFound = t.result.notFound;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            {tNotFound.title}
          </h1>
          <p className="mb-8 text-gray-600">
            {reservations.length === 0
              ? tNotFound.noReservations
              : tNotFound.invalidAccess}
          </p>
          <div className="space-y-3">
            {reservations.length > 0 && (
              <ReservationListDrawer reservations={reservations}>
                <Button
                  variant="outline"
                  className="w-full"
                  gaEvent={GA_EVENTS.VIEW_RESERVATIONS_FROM_NOT_FOUND}
                >
                  {tNotFound.viewReservations}
                </Button>
              </ReservationListDrawer>
            )}
            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full"
              gaEvent={GA_EVENTS.GO_HOME_FROM_NOT_FOUND}
            >
              {tNotFound.goHome}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
