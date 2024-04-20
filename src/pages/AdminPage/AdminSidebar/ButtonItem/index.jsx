import { useState } from "react";
import { useNavigate } from "react-router-dom";

import img_more_info from "../../../../assets/svg/more-info-darkgray.svg";

function ButtonItem({name, child, id, current}) {
    const navigation = useNavigate();
    const [showChild, setShowChild] = useState(false);

    return(
        <div>
            <div onClick={()=>{{id?navigation(`/admin/${id}`):setShowChild(!showChild)}}} className="flex justify-between w-full h-12 py-4 px-8 items-center gap-2.5 cursor-pointer">
                {current===id?
                <div className="text-sm font-bold text-primary">
                    {name}
                </div>
                :
                <div className="text-sm font-semibold">
                    {name}
                </div>
                }
                {child &&
                // <img src={setShowChild ? {image} : {image2}} onClick={()=>{setShowChild(!showChild)}}/>
                <img className="select-none" src={img_more_info}/>
                }
            </div>
            {child && showChild && 
            <div>
                {child.map((item, index) =>
                    <div key={index} onClick={()=>{navigation(`/admin/${item.id}`)}} className="flex justify-between w-full h-12 py-4 pl-10 items-center gap-2.5 cursor-pointer bg-[#EAF4FF]">
                        {current===item.id?
                            <div className="text-sm font-bold text-primary">
                                {item.name}
                            </div>
                            :
                            <div className="text-sm font-semibold">
                                {item.name}
                            </div>
                        }
                    </div>
                )}
            </div>
            }      
        </div>
    )
}

export default ButtonItem;