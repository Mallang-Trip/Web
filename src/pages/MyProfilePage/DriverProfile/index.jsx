import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uploadProfileImage } from "../../../api/image";
import { putProfile } from "../../../api/profile";
import { makePhoneNumber } from "../../../utils";
import profileImage from "../../../assets/images/profileImage.png";
import EditButton from "../../../components/EditButton";
import Information from "../UserProfile/Information";
import DriverIntroduction from "./DriverIntroduction";
import PriceInfo from "./PriceInfo";

function DriverProfile() {
  const user = useSelector((state) => state.user);
  const imageRef = useRef();
  const [modifyMode, setModifyMode] = useState(false);
  const [modifyImage, setModifyImage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [introduction, setIntroduction] = useState(user.introduction);
  const [email, setEmail] = useState(user.email);
  const [modifyProfileImage, setModifyProfileImage] = useState(undefined);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const imageHandler = () => {
    let imageFile = document.getElementById("profileImage_input").files[0];
    setModifyProfileImage(imageFile || undefined);
  };
  const introductionHandler = (e) => {
    if (e.target.value.length <= 15) setIntroduction(e.target.value);
  };
  const phoneNumberHandler = (e) => setPhoneNumber(e.target.value);
  const emailHandler = (e) => setEmail(e.target.value);

  const modifyProfileHandler = async () => {
    if (!modifyMode) return setModifyMode(true);

    const profileImageURL = modifyProfileImage
      ? await uploadProfileImage(modifyProfileImage)
      : user.profileImg;

    try {
      await putProfile({
        email: email,
        introduction: introduction,
        nickname: user.nickname,
        profileImg: profileImageURL,
      });

      alert("프로필 정보가 성공적으로 수정되었습니다.");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="w-[170px] h-[170px] rounded-full relative"
          onMouseEnter={() => modifyMode && setModifyImage(true)}
          onMouseLeave={() => modifyMode && setModifyImage(false)}
        >
          <img
            src={
              modifyProfileImage
                ? URL.createObjectURL(modifyProfileImage)
                : user.profileImg || profileImage
            }
            alt="profileImage"
            className="w-full h-full rounded-full"
          />
          {modifyImage && (
            <>
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
                onClick={() => imageRef.current.click()}
              >
                <div className="whitespace-pre-line text-center text-sm text-white">
                  {"프로필 사진\n변경하기"}
                </div>
              </div>
              <input
                ref={imageRef}
                className="hidden"
                id="profileImage_input"
                type="file"
                accept="image/*"
                onChange={imageHandler}
              />
            </>
          )}
        </div>
      </div>
      <div className="my-6 relative h-12">
        <div className="text-3xl font-bold text-black absolute top-0 left-1/2 transform -translate-x-1/2">
          {`${user.nickname} 드라이버`}
        </div>
        <EditButton
          className="absolute top-0 right-0"
          onClick={modifyProfileHandler}
          title={modifyMode ? "저장" : "프로필 수정"}
        />
      </div>
      <p className="text-lg font-bold text-black mt-6 mb-5">기본 정보</p>
      <div className="grid grid-cols-2 gap-3">
        <Information title={"활동 가능 지역"} content={"제주도"} />
        <Information title={"정기 휴일"} content={"토, 일"} />
        <Information title={"입금 계좌"} content={"토스뱅크 100018847819"} />
        <Information
          title={"전화번호"}
          content={makePhoneNumber(phoneNumber)}
          // modifyMode={modifyMode}
          // onChangeHandler={phoneNumberHandler}
          // 본인 인증 구현되기 전까지 수정 불가 상태로 전환
        />
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버 자기소개
      </p>
      <div>
        <DriverIntroduction
          modifyMode={modifyMode}
          content={"안녕하세요. 제주도에서 운전을 10년 이상 했습니다~~~~ 허허"}
          onChangeHandler={(e) => console.log(e)}
        />
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">차종</p>
      <div className="grid grid-cols-2 gap-3">
        <Information
          title={"모델 명"}
          content={"K5"}
          // modifyMode={modifyMode}
          // onChangeHandler={emailHandler}
        />
        <Information title={"승객 탑승 정원"} content={"4명"} />
      </div>
      <img
        src={
          "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/1c71f029-51fe-45a0-bd1b-ba4d3baa6685%ED%83%9D%EC%8B%9C%201.png"
        }
        alt="taxi_image"
        className="w-80 mt-5 rounded-2xl mx-auto"
      />
      <p className="text-lg font-bold text-black mt-12 mb-5">가격 설정</p>
      <div className="grid grid-cols-2 gap-3">
        <PriceInfo content={"5시간당 100,000원"} />
        <PriceInfo content={"8시간당 150,000원"} />
      </div>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버의 지정 파티 코스
      </p>
    </>
  );
}

export default DriverProfile;
