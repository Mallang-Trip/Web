function HomeButton({name}) {
    return(
        <div>
            <div className="flex justify-between w-full h-12 py-4 px-8 items-center gap-2.5 cursor-pointer">
                <div className="text-sm font-semibold">
                    {name}
                </div>
            {child &&
            // <img src={setShowChild ? {image} : {image2}} onClick={()=>{setShowChild(!showChild)}}/>
            <img className="select-none" src={img_more_info} onClick={()=>setShowChild(!showChild)}/>
            }
            </div>
            {child && showChild && 
            <div>
                {child.map((item, index) =>
                    <div key={index} className="flex justify-between w-full h-12 py-4 pl-10 items-center gap-2.5 cursor-pointer bg-[#EAF4FF]">
                        <div className="text-sm font-semibold">
                            {item.name}
                        </div>
                    </div>
                )}
            </div>
            }      
        </div>
    )
}

export default HomeButton;