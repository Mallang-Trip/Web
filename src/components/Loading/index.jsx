import loadingSpinner from "../../assets/images/loading.gif";

function Loading({ full }) {
  return (
    <div className={`flex justify-center ${full ? "h-screen mt-80" : "my-10"}`}>
      <img src={loadingSpinner} alt="loading..." className="w-24 h-24" />
    </div>
  );
}

export default Loading;
