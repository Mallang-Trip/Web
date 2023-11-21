import { useEffect } from "react";

function HolidayModal({ showModal, setShowModal, driverInfo, setDriverInfo }) {
  useEffect(() => {
    if (showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      className={`modal-container fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-gray-900 bg-opacity-50 scale-100 flex ${
        showModal && "active"
      }`}
    >
      <div className="relative w-full max-w-4xl max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              휴일 설정하기
            </h3>
            <div>달력</div>

            <h3 className="mb-4 text-xl font-bold text-gray-900">
              정기 휴일 설정하기
            </h3>
            <div>
              <button className="w-10 h-10 bg-[#F4F4F4] text-darkgray rounded-full">
                월
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HolidayModal;
