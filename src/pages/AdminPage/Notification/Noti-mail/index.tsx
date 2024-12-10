import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Title from "../../../../components/Title";
import img_more_info from "../../../../assets/svg/more-info-gray500.svg";
import Tab from "./Tab";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import WriteEmail from "./WriteEmail";
import clsx from "clsx";

export interface NotiMailData {
  contentId: number;
  userType: string;
  contentType: string;
  content: string;
  title: string;
  createdAt: string;
}

function NotiMail() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<NotiMailData[]>([]);
  const [isFilterUser, setIsFilterUser] = useState(false);
  const [isFilterDriver, setIsFilterDriver] = useState(false);
  const [isFilterAll, setIsFilterAll] = useState(false);

  const setFilterColor = useCallback((isFilterOn: boolean) => {
    if (isFilterOn) return "border-primary text-primary";
    else return "border-mediumgray text-darkgray";
  }, []);

  useEffect(() => {
    setData([]);
  }, []);

  if (status === "write-email") return <WriteEmail />;
  return (
    <div className="font-medium text-base">
      <Title title="약관 수정 및 전체 메일 알림" />
      <Tab current={current} setCurrent={setCurrent} />
      <div className="flex justify-between mb-3">
        <div className="flex">
          <button
            className={clsx(
              "px-4 py-3 rounded-full text-sm font-semibold border mr-2",
              setFilterColor(isFilterUser)
            )}
            onClick={() => {
              setIsFilterUser(!isFilterUser);
              if (isFilterUser) setIsFilterAll(false);
            }}
          >
            {current === 0 ? "일반 회원용" : "일반 회원 발송"}
          </button>
          <button
            className={clsx(
              "px-4 py-3 rounded-full text-sm font-semibold border mr-2",
              setFilterColor(isFilterDriver)
            )}
            onClick={() => {
              setIsFilterDriver(!isFilterDriver);
              if (isFilterDriver) setIsFilterAll(false);
            }}
          >
            {current === 0 ? "드라이버 회원용" : "드라이버 회원 발송"}
          </button>
          {current === 0 ? (
            <button className="flex items-center px-4 py-3 rounded-full text-sm font-semibold border border-mediumgray text-darkgray">
              <p className="mr-2">전체</p>
              {current === 0 && <img alt="more_info" src={img_more_info} />}
            </button>
          ) : (
            <button
              className={clsx(
                "flex items-center px-4 py-3 rounded-full text-sm font-semibold border",
                setFilterColor(isFilterAll)
              )}
              onClick={() => {
                setIsFilterAll(!isFilterAll);
                setIsFilterDriver(!isFilterAll);
                setIsFilterUser(!isFilterAll);
              }}
            >
              <p className="mr-2">전체 회원 발송</p>
              {current === 0 && <img alt="more_info" src={img_more_info} />}
            </button>
          )}
          {current === 1 && (
            <button className="px-4 py-3 rounded-full text-primary bg-skyblue text-sm font-semibold ml-2">
              임시저장
            </button>
          )}
        </div>
        {current === 0 ? (
          <button className="px-4 py-3 rounded-lg bg-primary text-white text-sm font-semibold">
            약관 추가
          </button>
        ) : (
          <button
            className="px-4 py-3 rounded-lg bg-primary text-white text-sm font-semibold"
            onClick={() => navigation("/admin/noti-mail?status=write-email")}
          >
            메일 쓰기
          </button>
        )}
      </div>
      <TableHead current={current} />
      <TableBody current={current} data={data} />
    </div>
  );
}

export default memo(NotiMail);
