import { memo, useCallback, useState } from "react";
import { CheckModal, ConfirmModal, Title } from "@/components";
import clsx from "clsx";

function WriteEmail() {
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showSendedModal, setShowSendedModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [isFilterUser, setIsFilterUser] = useState(false);
  const [isFilterDriver, setIsFilterDriver] = useState(false);
  const [isFilterAll, setIsFilterAll] = useState(false);

  const setFilterColor = useCallback((isFilterOn: boolean) => {
    if (isFilterOn) return "border-primary text-primary";
    else return "border-mediumgray text-darkgray";
  }, []);

  return (
    <div className="relative text-lg font-semibold">
      <Title title="메일 쓰기" />
      <div className="absolute top-0 right-0">
        <button
          className="text-sm font-semibold px-5 py-3 rounded-xl bg-skyblue text-primary mr-3"
          onClick={() => setShowSavedModal(true)}
        >
          임시 저장
        </button>
        <button
          className="text-sm font-semibold px-5 py-3 rounded-xl bg-primary text-white"
          onClick={() => setShowCheckModal(true)}
        >
          보내기
        </button>
      </div>
      <div className="flex flex-col mt-10 mb-12">
        제목
        <input
          className="mt-3 py-5 px-8 border border-gray300 text-base font-medium rounded-xl"
          placeholder="제목을 입력해주세요"
        />
      </div>
      <div className="flex flex-col mb-12">
        받는 사람
        <div className="flex my-8">
          <input
            className="border-2 border-primary rounded-full placeholder:text-gray400 text-sm px-3 mr-4"
            placeholder="약관 내용 검색"
          />
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
            일반 회원 전체
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
            드라이버 회원 전체
          </button>
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
            전체 회원
          </button>
        </div>
        <p className="mb-3 text-sm text-gray500">추가된 사람</p>
        <div className="border border-gray300 rounded-xl p-4"></div>
      </div>
      <div className="flex flex-col items-start mb-12">
        파일 첨부
        <button className="my-3 text-sm font-semibold px-6 py-3 rounded-lg border border-gray300">
          내 PC
        </button>
        <div className="w-full border border-gray300 rounded-xl p-4"></div>
      </div>
      <div className="flex flex-col">
        메일 내용
        <input
          className="w-full border border-gray300 rounded-xl p-8 mt-3 text-base font-medium"
          placeholder="내용을 입력해주세요."
        />
      </div>
      <CheckModal
        showModal={showCheckModal}
        setShowModal={setShowCheckModal}
        message={"정말로 메일을 '전체 회원'으로 \n발송하시겠습니까?"}
        noText="취소"
        yesText="네"
        yesHandler={() => {
          setShowCheckModal(false);
          setShowSendedModal(true);
        }}
      />
      <ConfirmModal
        showModal={showSendedModal}
        setShowModal={setShowSendedModal}
        message="이메일을 성공적으로 발송하였습니다."
      />
      <ConfirmModal
        showModal={showSavedModal}
        setShowModal={setShowSavedModal}
        message="임시 저장되었습니다."
      />
    </div>
  );
}

export default memo(WriteEmail);
