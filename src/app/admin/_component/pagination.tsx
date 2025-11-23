"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        {t.admin.pagination.total.replace("{{count}}", String(totalCount))}
        {isFetching && (
          <span className="ml-2 text-gray-400">
            ({t.admin.pagination.loading})
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 0 || isFetching}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
        >
          {t.admin.pagination.previous}
        </Button>
        <div className="px-2 text-sm text-gray-600">
          {t.admin.pagination.page.replace("{{number}}", String(page + 1))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext || isFetching}
          onClick={() => setPage((p) => p + 1)}
        >
          {t.admin.pagination.next}
        </Button>
      </div>
    </div>
  );
}
