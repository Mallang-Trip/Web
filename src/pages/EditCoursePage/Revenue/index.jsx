function Revenue({ hours, price, order }) {
  return (
    <div>
      <div className="text-xl text-darkgray">
        {order}일차 {hours}시간 {price}만원
      </div>
    </div>
  );
}

export default Revenue;
