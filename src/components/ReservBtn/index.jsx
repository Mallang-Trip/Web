import { useNavigate, useParams } from "react-router-dom";

function ReservBtn(props) {
  const { place } = useParams();

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/party/H003Edt/${place}`);
  };

  return (
    <div className="relative top-32 w-[330px] mx-auto">
      <div
        className=" relative w-full pt-5 h-[53px] rounded-full bg-primary justify-center "
        onClick={onClickHandler}
      >
        <div className="absolute start-32 top-3 text-white text-lg hover:cursor-pointer">
          {props.title}
        </div>
      </div>
    </div>
  );
}

export default ReservBtn;
