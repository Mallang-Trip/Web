import { useState } from "react";
import TabList from "../../../components/Admin/TabList";


function Payment(){
    const tabList = [{name: "예약된 파티", id: "booked"},{name: "취소된 파티", id: "canceled"}, {name:"완료된 파티", id: "done"}];

    const [searchKeyword, setSearchKeyword] = useState("");
    const searchHandler = (e) => {
        e.preventDefault();
        if (searchKeyword === "") return;

        setSearchKeyword("");
        // navigation(`/search/place/${searchKeyword}`);
    };

    return(
        <div>
            <div className="text-2xl font-bold">
                알림 내역 관리
            </div>
            <TabList tabList={tabList}/>
            <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                    className="w-5 h-5 text-primary"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                </div>
                <form onSubmit={searchHandler}>
                  <input
                    type="text"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
                    placeholder="알림 검색"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button type="submit" className="hidden" />
                </form>
            </div>
        </div>
    )
}

export default Payment;