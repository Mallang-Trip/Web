import Head from "./Head";
import FAQ from "./FAQ";

function FAQList({ faq, page }) {
  const isShow = (index) => {
    return index >= page * 10 && index < (page + 1) * 10;
  };

  return (
    <div className="w-full whitespace-nowrap">
      <Head />
      {faq.map(
        (item, index) =>
          isShow(index) && <FAQ key={item.faqId} index={index + 1} {...item} />
      )}
    </div>
  );
}

export default FAQList;
