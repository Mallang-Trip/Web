"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

export default function JejuRefundPolicy() {
  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          <span className="text-blue-500">환불</span> 규정
        </CardTitle>

        <CardContent className="space-y-6 px-0">
          {/* 전액 환불 */}
          <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
            <div className="mb-4 flex items-center">
              <CheckCircle className="mr-3 h-7 w-7 text-emerald-600" />
              <h3 className="text-xl font-bold text-emerald-900">
                전액 환불
              </h3>
            </div>
            <div className="flex items-start">
              <Calendar className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  여행 시작일 기준 4일 전까지 통보 시
                </p>
                <p className="text-sm text-gray-700">
                  예약 금액의 100%가 환불됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 환불 불가 */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
            <div className="mb-4 flex items-center">
              <XCircle className="mr-3 h-7 w-7 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">환불 불가</h3>
            </div>
            <div className="flex items-start">
              <Calendar className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  여행 시작일 기준 3일 전 ~ 당일 통보 시
                </p>
                <p className="text-sm text-gray-700">
                  취소 및 환불이 불가능합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 안내 사항 */}
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">📌 참고:</span> 환불 요청은
              고객센터를 통해 접수하실 수 있으며, 영업일 기준 3~5일 내에
              처리됩니다.
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
