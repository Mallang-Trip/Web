import { useNavigate } from "react-router";

function HomeBodyForm({ name, id, child }) {
  const navigate = useNavigate();
  if (name !== "KPI" && name !== "총 수익" && name !== "결제 내역 확인") {
    return (
      <div className="flex flex-col mt-16 first:mt-0">
        <div className="text-[#000] text-2xl font-bold mb-5">{name}</div>
        <div className="flex">
          {name === "관리자 홈" && (
            <div className="flex">
              <button
                onClick={() => {
                  navigate(`/admin/kpi`);
                }}
                className="flex min-w-fit w-28 px-5 py-3 mr-4 justify-center items-center gap-2 rounded-lg border-solid border border-[#D9D9D9] hover:border-primary text-[#3E3E3E] text-sm font-semibold"
              >
                KPI
              </button>
              <button
                className="flex min-w-fit w-28 px-5 py-3 mr-4 justify-center items-center gap-2 rounded-lg border-solid border border-[#D9D9D9] hover:border-primary text-[#3E3E3E] text-sm font-semibold"
                onClick={() => {
                  navigate(`/admin/profit`);
                }}
              >
                총수익
              </button>
              <button
                className="flex min-w-fit w-28 px-5 py-3 mr-4 justify-center items-center gap-2 rounded-lg border-solid border border-[#D9D9D9] hover:border-primary text-[#3E3E3E] text-sm font-semibold"
                onClick={() => {
                  navigate(`/admin/payment`);
                }}
              >
                결제 내역 관리
              </button>
            </div>
          )}
          {child &&
            child.map((item, index) => (
              <button
                key={index}
                className="flex w-28 min-w-fit px-5 py-3 mr-4 justify-center items-center gap-2 rounded-lg border-solid border border-[#D9D9D9] hover:border-primary text-[#3E3E3E] text-sm font-semibold"
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
}

export default HomeBodyForm;
