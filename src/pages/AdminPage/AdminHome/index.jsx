import HomeBodyForm from "./HomeBodyForm";

function AdminHome({list}){
    return(
        <div>
            {list.map((item, index) =>
                <HomeBodyForm
                    key={index}
                    {...item}
                />
            )}
        </div>
    )
}

export default AdminHome;