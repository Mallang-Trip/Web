import { memo } from "react";
import { useNavigate } from "react-router";

interface Props {
  name: string;
  child?: {
    id: string;
    name: string;
  }[];
}

function HomeBodyForm({ name, child }: Props) {
  const navigate = useNavigate();

  if (name === "KPI" || name === "총 수익" || name === "결제 내역 확인")
    return null;
  return (
    <div className="flex flex-col mt-16 first:mt-0">
      <div className="text-black text-2xl font-bold mb-5">{name}</div>
      <div className="flex flex-wrap">
        {name === "관리자 홈" && (
          <div className="w-full flex flex-wrap">
            <button
              onClick={() => navigate("/admin/kpi")}
              className="shrink-0 flex min-w-fit w-28 px-5 py-3 m-2 justify-center items-center gap-2 rounded-lg border-solid border border-mediumgray hover:border-primary text-boldgray text-sm font-semibold"
            >
              KPI
            </button>
            <button
              className="shrink-0 flex min-w-fit w-28 px-5 py-3 m-2 justify-center items-center gap-2 rounded-lg border-solid border border-mediumgray hover:border-primary text-boldgray text-sm font-semibold"
              onClick={() => navigate("/admin/profit")}
            >
              총 수익
            </button>
            <button
              className="shrink-0 flex min-w-fit w-28 px-5 py-3 m-2 justify-center items-center gap-2 rounded-lg border-solid border border-mediumgray hover:border-primary text-boldgray text-sm font-semibold"
              onClick={() => navigate("/admin/payment")}
            >
              결제 내역 확인
            </button>
          </div>
        )}
        {child &&
          child.map((item, index) => (
            <button
              key={index}
              className="shrink-0 flex w-28 min-w-fit px-5 py-3 m-2 justify-center items-center gap-2 rounded-lg border-solid border border-mediumgray hover:border-primary text-boldgray text-sm font-semibold"
              onClick={() => {
                if (item.id === "community") navigate("/community/main");
                else if (item.id === "inquiry") navigate("/talk");
                else navigate(`/admin/${item.id}`);
              }}
            >
              <div className="text-sm font-semibold">{item.name}</div>
            </button>
          ))}
      </div>
    </div>
  );
}

export default memo(HomeBodyForm);
