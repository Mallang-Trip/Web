function Table(){
    const mockList=["날짜", "파티명", "수입 금액(원)"];
    const mockData=[
        ["2024-04-10", "짱 좋은 파티","100000"], 
        ["2024-04-10", "제주의 가을 파티", "8000"],
        ["2024-04-10", "기분 좋은 바베큐 파티", "10000"],
        ["2024-04-10", "우정의 파티", "5000"],
        ["2024-04-10", "같이가요 파티파티", "7000"],
        ["2024-04-10", "맛집 투어 제천 파티", "7000"],
        ["2024-04-10", "포켓몬 파티","7000"],
    ]

    return(
        <div className="flex flex-col w-full min-w-[32rem] my-12">
            <div className="flex w-full px-5 py-3 items-center justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033]">
                {mockList.map((item, index)=>
                    <div key={index} className={index===1?"flex-1":"w-[20%]"}>
                        {item}
                    </div>
                )}
            </div>
            {mockData.map((item, index)=>
                <div key={index} className="flex w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm">
                    {item.map((it, id)=>
                        <div key={id} className={`${id===2?"text-primary":"text-[#939094]"} ${id===1?"flex-1 text-[#313033]":"w-[20%]"}`}>
                            {it}
                        </div>
                    )}
                </div>   
            )}     
        </div>
    )
}

export default Table;