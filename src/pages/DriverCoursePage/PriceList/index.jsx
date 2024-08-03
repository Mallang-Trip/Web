import PriceItem from "./PriceItem";

function PriceList({ prices, priceIndex, setPriceIndex }) {
  return (
    <div className="flex gap-2 custom-scrollbar">
      {prices.map((item, index) => (
        <PriceItem
          key={index}
          index={index}
          priceIndex={priceIndex}
          setPriceIndex={setPriceIndex}
          {...item}
        />
      ))}
    </div>
  );
}

export default PriceList;
