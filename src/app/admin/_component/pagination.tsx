"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  setPage: (value: number | ((prev: number) => number)) => void;
  totalCount: number;
  hasNext: boolean;
  isFetching: boolean;
}

export default function Pagination({
  page,
  setPage,
  totalCount,
  hasNext,
  isFetching,
}: PaginationProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        총 {totalCount}건
        {isFetching && (
          <span className="ml-2 text-gray-400">(불러오는 중...)</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0 || isFetching}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          이전
        </Button>
        <div className="px-2 text-sm text-gray-600">페이지 {page + 1}</div>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext || isFetching}
          onClick={() => setPage((p) => p + 1)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
