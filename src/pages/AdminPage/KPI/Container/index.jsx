function Container({name, child}){
    console.log(name, child);
    return(
        <div className="whitespace-nowrap mb-12">
            <div className="text-[#3E3E3E] text-lg font-semibold mb-2">
                {name}
            </div>
            <div className="grid grid-cols-3 gap-12 border-solid border border-[#D9D9D9] rounded-2xl px-12 py-10 w-full min-w-max">
                {child.map((item, index)=>
                    <div key={index} className="flex flex-col text-[#3E3E3E] text-lg font-bold">
                        <div className="mb-2">{item[0]}</div>
                        <div className="flex text-[#1C1B1F] text-3xl font-bold">
                            0{name==="다운로드"?" 회":" %"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Container;