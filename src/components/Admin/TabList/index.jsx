import { useState } from "react";

function TabList({tabList}){
    const [current, setCurrent] = useState(0);
    console.log(tabList.length);
    return(
        <div className="flex justify-between w-full min-w-[32rem] my-12">
            {tabList.map((item, index)=>
                <button className={`flex justify-center whitespace-nowrap border border-primary w-full p-3 font-semibold text-lg ${index===0 ? "rounded-l-xl":""} ${index===tabList.length-1 ? "rounded-r-xl":""} ${index === current ? "bg-primary text-white": "text-primary"}`}
                        onClick={()=>{setCurrent(index)}}>
                    {item.name}
                </button>
                
            )}
        </div>
    )
}

export default TabList;