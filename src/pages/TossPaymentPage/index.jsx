import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { postPayment } from "../../api/payment";
import PageContainer from "../../components/PageContainer";
import Loading from "../../components/Loading";

function TossPaymentPage() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();

  const registerPayment = async () => {
    try {
      const result = await postPayment(searchParams.get("authKey"));

      if (result.statusCode === 200) {
        localStorage.setItem("payment", true);
        setTimeout(() => navigation(-1), 3000);
      } else {
        navigation("/payment/fail", { replace: true });
      }
    } catch (e) {
      console.log(e);
      navigation("/payment/fail", { replace: true });
    }
  };

  useEffect(() => {
    if (status !== "success") return;
    registerPayment();
  }, [status]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <PageContainer>
      <div className="w-full h-real-screen fixed top-0 left-0 flex justify-center items-center">
        <div>
          <Loading />
          {status === "success" ? (
            <p className="w-64 md:w-80 py-3 text-base text-primary font-bold text-center border border-primary bg-skyblue rounded-lg">
              결제 수단 등록 중입니다.
              <br />
              잠시만 기다려주세요.
            </p>
          ) : (
            <>
              <p className="w-64 md:w-80 py-3 text-base text-[#E30000] font-bold text-center border border-[#E30000] bg-[#FFEAEA] rounded-lg">
                결제 수단 등록에 실패했습니다.
                <br />
                잠시후 다시 시도해주세요.
              </p>
              <button
                className="mt-10 h-12 text-white rounded-full text-base w-64 md:w-80 bg-primary"
                onClick={() => navigation(-1)}
              >
                이전 페이지로 돌아가기
              </button>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default TossPaymentPage;
