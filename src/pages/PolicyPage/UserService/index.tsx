import { memo } from "react";
import PageContainer from "../../../components/PageContainer";
import PolicyContainer from "../Component/PolicyContainer";
import HeadTitle from "../Component/HeadTitle";
import BodyTitle from "../Component/BodyTitle";
import BodyContent from "../Component/BodyContent";
import BodyTab from "../Component/BodyTab";
import PolicyDate from "../Component/PolicyDate";

function UserService() {
  return (
    <PageContainer>
      <HeadTitle title={"말랑트립 서비스 이용약관(일반회원용)"} />

      <PolicyContainer>
        <BodyTitle title={"제 1 절 총칙"} />
        <BodyContent title={"제 1 조 (목적)"}>
          이 약관은 말랑트립(이하 '회사'라 한다)이 운영하는 말랑트립 웹사이트 및
          앱(이하 '웹사이트 및 앱'이라 한다)에서 제공하는 카풀 여행 플랫폼
          서비스를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을
          목적으로 합니다.
        </BodyContent>
        <BodyContent title={"제 2 조 (정의)"}>
          ① "웹사이트 및 앱"이란 회사가 서비스를 이용자에게 제공하기 위하여
          컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한
          가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도
          사용합니다.
          <br />
          <br />
          ② "서비스"라 함은 회사가 회원과 드라이버의 드라이브 서비스 계약을
          중개하고 관리하기 위하여 제공하는 서비스 일체를 말합니다.
          <br />
          <br />
          ③ "드라이브 서비스"라 함은 드라이버가 회원과의 계약에 따라 회원 및
          회원이 속한 파티에 제공하는 운전 용역 서비스를 말합니다.
          <br />
          <br />
          ④ "회원"이라 함은 웹사이트 및 앱에 회원 자격으로 등록을 한 자로서,
          계속적으로 웹사이트 및 앱이 제공하는 서비스를 이용할 수 있는 자를
          말합니다.
          <br />
          <br />
          ⑤ "드라이버"라 함은 웹사이트 및 앱에 드라이버 회원 자격으로 등록을 한
          자로서, 회사의 중개 하에 회원과 드라이브 서비스 계약을 체결하고 이를
          제공하는 자를 말합니다.
          <br />
          <br />
          ⑥ "파티"라 함은 동일한 일정, 동일한 지역에서 동일한 드라이브 서비스를
          함께 받는 회원들의 모임 또는 여행 플랜을 말합니다.
          <br />
          <br />
          ⑦ "말랑레디"라 함은 드라이버 서비스를 신청한 회원들이 여행의 일정과
          일행 명단을 확정시키기 위해서 대금을 지급할 준비가 완료되었다는
          의사표시를 말합니다.
          <br />
          <br />
          ⑧ "말랑트립 확정"이라 함은 한 파티에 참여한 모든 회원들이 대금 지급
          절차가 이루어져 회원과 드라이버간 계약이 성립된 상태를 말합니다.
          <br />
          <br />
          ⑨ "말랑트립 최종 확정"이라 함은 말랑트립 확정 이후 여행 2일 전날이
          되어 위약금이 결제 금액의 100%로서 청약 철회할 수 없는 상태를
          말합니다.
          <br />
          <br />⑩ "독점 예약"이라 함은 회원이 파티를 최초로 개설할 때 가질 수
          있는 선택권으로서, 예약자 본인 및 본인의 일행만이 예약과 결제를
          단독으로 진행할 것이라는 의사표시를 말합니다.
        </BodyContent>
        <BodyContent title={"제 3 조 (약관 등의 명시와 설명 및 개정)"}>
          ① 회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지
          주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함),
          전화번호·모사전송번호·전자우편주소, 사업자등록번호,
          개인정보관리책임자등을 회원이 쉽게 알 수 있도록 웹사이트 및 앱 초기
          서비스화면에 게시합니다. 다만, 약관의 내용은 회원이 연결화면을 통하여
          볼 수 있도록 할 수 있습니다.
          <br />
          <br />
          ② 회사는 회원이 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중
          개인정보 제3자 제공 등과 같이 중요한 내용을 회원이 이해할 수 있도록
          별도의 연결화면 또는 팝업화면 등을 제공하여 회원의 확인을 구하여야
          합니다.
          <br />
          <br />
          ③ 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의
          규제에 관한 법률」, 「전자문서 및 전자거래기본법」,
          「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호
          등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서
          이 약관을 개정할 수 있습니다.
          <br />
          <br />
          ④ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
          현행약관과 함께 웹사이트 및 앱의 초기화면에 그 적용일자 7일 이전부터
          적용일자 전 일까지 공지합니다. 다만, 회원에게 불리하게 약관내용을
          변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지하고,
          회원 가입 시 제공한 휴대전화 등을 통해 개정 사실을 알립니다. 이 경우
          회사는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 회원이 알기
          쉽도록 표시합니다.
          <br />
          <br />
          ⑤ 제4항에 따라 회사가 공지한 기간 동안 약관 개정안에 대해 명시적인
          거부의 의사표시를 하지 않은 회원에 대해서는 그 개정안에 동의한 것으로
          간주합니다. 만약 거부의 의사표시를 한 회원에 대해서는 개정 전
          이용약관이 적용되나, 개정 전 이용약관을 제공할 수 없는 특별한 사정이
          있는 경우에는 회사는 해당 회원과 서비스 이용계약을 해지할 수 있습니다.
          <br />
          <br />
          ⑥ 회사가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에
          제공되는 서비스에만 적용되고 그 이전에 이미 제공된 서비스에 대해서는
          개정 전의 약관조항이 그대로 적용됩니다.
          <br />
          <br />⑦ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
          전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한
          법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및
          관계법령 또는 상관례에 따릅니다.
        </BodyContent>
        <BodyContent title={"제 4 조 (서비스의 제공 및 변경)"}>
          ① 회사는 다음과 같은 서비스를 제공합니다. <br />
          <br />
          <BodyTab>
            1. 드라이버 리스트 제공 및 드라이브 서비스 계약 체결 중개
            <br />
            2. 파티 개설 및 기존 파티 참여 기능
            <br />
            3. 드라이브 서비스 예약 내역 확인
            <br />
            4. 에스크로 방식을 통한 드라이브 서비스 이용 대금 결제 시스템 지원
            <br />
            5. 드라이버의 드라이브 서비스에 대한 피드백 수렴 및 전달
            <br />
            6. 회원간 커뮤니티, 채팅 기능
            <br />
            7. 여행지 검색, 여행지별 평가·후기 기능
            <br />
            8. 프로필 관리 및 관심 여행지, 파티 찜 기능
            <br />
            9. 기타 회사가 정하여 웹사이트 및 앱에 공지하는 서비스
          </BodyTab>
          <br />
          ② 드라이버는 다음과 같은 드라이브 서비스를 제공합니다.
          <br />
          <BodyTab>1. 지정된 일시, 장소, 차량에서의 운전 용역</BodyTab>
          <br />③ 회사는 장차 체결되는 계약에 의해 서비스의 내용을 변경할 수
          있습니다. 이 경우에는 변경된 서비스의 내용 및 제공일자를 명시하여
          현재의 서비스의 내용을 게시한 곳에 즉시 공지합니다.
          <br />
          <br />④ 회사는 사용자가 여행지 사진 업로드 등의 기능을 사용할 수
          있도록 카메라 권한을 요청합니다. 이 권한은 사용자가 원할 때에만
          사용되며, 사용자의 동의 없이 사진이나 비디오를 촬영하지 않습니다.
          <br />
          <br />⑤ 회사는 중요한 알림 및 업데이트를 사용자에게 전달하기 위해 알림
          권한을 요청합니다. 이 권한은 사용자가 회사의 서비스와 관련된 중요한
          정보를 놓치지 않도록 돕습니다.
        </BodyContent>
        <BodyContent title={"제 5 조 (서비스의 중단)"}>
          ① 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절
          등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
          있습니다.
          <br />
          <br />
          ② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여
          회원 또는 제3자가 입은 손해가 있는 경우 배상합니다. 단, 회사의 고의
          또는 과실이 없는 경우나, 회사가 제1항의 사유를 즉시 웹사이트 및 앱에
          알린 경우에는 그러하지 아니합니다.
          <br />
          <br />③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로
          서비스를 제공할 수 없게 되는 경우에는 회사는 제8조에 정한 방법으로
          회원에게 통지하고 회사의 과실로 회원에게 손해가 발생한 경우 당초
          웹사이트 및 앱에서 제시한 조건에 따라 소비자에게 보상합니다.
        </BodyContent>
        <BodyContent title={"제 6 조 (회원가입)"}>
          ① 회원은 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
          동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
          <br />
          <br />
          ② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 사람 중 다음 각 호에
          해당하지 않는 한 회원으로 등록합니다.
          <br />
          <br />
          <BodyTab>
            1. 가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을
            상실한 적이 있는 경우, 다만 제7조 제3항에 의한 회원자격 상실 후
            3년이 경과한 자로서 회사의 회원 재가입 승낙을 얻은 경우에는 예외로
            한다.
            <br />
            <br />
            2. 등록 내용에 허위, 기재 누락, 오기가 있는 경우
            <br />
            <br />
            3. 미성년자인 경우
            <br />
            <br />
            4. 기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고
            판단되는 경우
          </BodyTab>
          <br />
          ③ 회원가입완료로 인한 회원 자격의 발생 시기는 회사의 승낙이 회원에게
          도달한 시점으로 합니다.
          <br />
          <br />④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간
          이내에 회사에 대하여 회원 정보 수정 등의 방법으로 그 변경사항을 알려야
          하고, 이를 이행하지 않아 생긴 손해는 회원의 책임으로 합니다.
        </BodyContent>
        <BodyContent title={"제 7 조 (회원 탈퇴 및 자격 상실 등)"}>
          ① 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 요청을 받는
          즉시 회원 탈퇴를 처리합니다. 단, 회원과 드라이버간 남아있는 드라이브
          서비스 계약이 있는 경우, 이 약관에 의해 청약철회 및 환급 절차를 거친
          후 탈퇴를 처리합니다.
          <br />
          <br />
          ② 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 서비스 이용을
          제한하거나 회원 자격을 정지시킬 수 있습니다.
          <br />
          <br />
          <BodyTab>
            1. 가입 신청 시에 허위 내용을 등록한 경우
            <br />
            <br />
            2. 웹사이트 및 앱을 이용하여 체결한 드라이브 서비스 등의 대금, 기타
            웹사이트 및 앱 이용과 관련하여 회원이 부담하는 채무를 기일에
            지급하지 않는 경우
            <br />
            <br />
            3. 다른 사람의 웹사이트 및 앱이나 서비스 등의 이용을 방해하거나 그
            정보를 도용하는 등 전자상거래 질서를 위협하는 경우
            <br />
            <br />
            4. 회사 또는 회사의 임직원이나 관계자를 사칭하거나 회사의 업무를
            방해하는 경우
            <br />
            <br />
            5. 부당한 이익을 취하거나 부정경쟁의 목적으로 회사의 서비스를
            이용하는 경우
            <br />
            <br />
            6. 회사에 지식재산권이 귀속된 정보나 드라이버의 개인정보를 회사나
            드라이버의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에
            의하여 이용하거나 제3자에게 공개·이용하게 하는 행위를 하는 경우
            <br />
            <br />
            7. 드라이브 서비스의 신청과 철회를 지나치게 반복하거나, 고의적이거나
            반복된 변경 요구 등으로 회사나 드라이버의 업무를 방해하는 행위를
            하는 경우
            <br />
            <br />
            8. 그 외 웹사이트 및 앱을 이용하는 중이거나 드라이브 서비스 이용 중
            법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
          </BodyTab>
          <br />
          ③ 회사가 서비스 이용을 제한하거나 회원 자격을 정지 시킨 후, 회원이
          동일한 행위를 추가로 하거나, 30일 이내에 그 사유를 시정하지
          아니하거나, 위반 사유가 시정 또는 피해 회복을 하기 어려운 사유라고
          판단되거나, 중대한 불법행위에 해당하는 경우 회사는 회원자격을 상실시킬
          수 있습니다.
          <br />
          <br />
          ④ 회사가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우
          회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을
          정하여 소명할 기회를 부여합니다. 단, 회원의 불법행위로 인해 회사나
          다른 회원이 해당 회원에 대하여 법적조치를 취할 필요가 있거나
          수사기관의 수사나 재판 등이 개시될 가능성이 있는 경우에는 회사는 해당
          분쟁이나 수사 등이 모두 종결될 때까지 해당 회원의 정보를 보관하고,
          법원이나 수사기관에 협조할 수 있습니다.
          <br />
          <br />⑤ 회원이 탈퇴하거나 회원자격을 상실하는 경우에도 회원이 웹사이트
          및 앱에 작성한 게시글, 댓글, 리뷰 등 컨텐츠는 삭제되지 않으므로 회원이
          삭제를 희망하는 경우 탈퇴 또는 회원자격 상실 전 직접 이를 삭제하여야
          합니다.
        </BodyContent>
        <BodyContent title={"제 8 조 (회원에 대한 통지)"}>
          ① 회사가 회원에 대한 통지를 하는 경우, 회원이 웹사이트 및 앱에 미리
          지정한 전자우편 주소나 휴대전화로 할 수 있습니다.
          <br />
          <br />② 회사는 불특정다수 회원에 대한 통지의 경우 1주일 이상 웹사이트
          및 앱에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의
          거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지를
          합니다.
        </BodyContent>

        <BodyTitle title={"제 2 절 드라이브 서비스의 이용"} />
        <BodyContent title={"제 9 조 (서비스 신청 및 개인정보 제공 동의 등)"}>
          ① 회원은 다음 또는 이와 유사한 방법에 의하여 드라이브 서비스를
          신청하고, 회사는 회원의 신청에 필요한 내용을 알기 쉽게 제공합니다.
          <br />
          <br />
          <BodyTab>
            1. 직접 파티를 개설하는 방법 <br />
            <BodyTab>
              - 목적지, 일정, 인원 선택
              <br />
              - 드라이버 검색 및 선택
              <br />
              - 여행 코스 및 독점 여부 선택
              <br />- 예약 신청, 개인정보 제공 동의 및 결제 방법의 선택
            </BodyTab>
            <br />
            2. 기존 파티에 참여하는 방법 <br />
            <BodyTab>
              - 기존 파티 검색 및 선택
              <br />- 참여 신청, 개인정보 제공 동의 및 결제 방법의 선택
            </BodyTab>
          </BodyTab>
          <br />② 회원은 직접 파티를 개설하는 경우 드라이버를 선택·지정할 수
          있으나, 다른 회원이 개설한 파티에 참여하는 경우에는 드라이버를
          선택·지정할 수 없습니다.
        </BodyContent>
        <BodyContent title={"제 10 조 (계약의 성립)"}>
          ① 회사는 제9조와 같은 서비스 신청에 대하여 다음 각 호에 해당하면
          접수하지 않을 수 있습니다.
          <BodyTab>
            1. 신청 내용에 허위, 기재누락, 오기가 있는 경우
            <br />
            2. 회원에게 제6조 제2항 각 호 또는 제7조 제2항 각 호의 사유가 있다고
            판단되는 경우
            <br />
            3. 기타 드라이브 서비스 신청을 접수하는 것이 업무상 현저히 지장이
            있다고 판단하는 경우
          </BodyTab>
          <br />
          ② 말랑트립 확정 상태 이전에 회사가 회원의 드라이브 서비스 신청을
          접수하면, 아래와 같이 다른 회원 또는 드라이버에게 회원의 서비스 신청
          내용과 아래 각 목의 정보들이 제공됩니다.
          <br />
          <br />
          <BodyTab>
            1. 드라이버에게 제공하는 항목
            <br />
            <br />
            <BodyTab>
              가. 정보를 제공받는 자 : 회원이 선택한 드라이버
              <br />
              <br />
              나. 제공되는 정보 : 회원의 주민번호 앞 7자리, 신청 내역(목적지,
              일정, 인원, 여행코스 등), 웹사이트 및 앱에서 회원을 식별할 수 있는
              정보(성별, 출생연도, 프로필사진 등 회원이 프로필을 통해 공개한
              정보 포함)
            </BodyTab>
          </BodyTab>
          <br />
          <BodyTab>
            2. 파티의 다른 회원들에게 제공하는 항목
            <br />
            <br />
            <BodyTab>
              가. 정보를 제공받는 자 : 파티에 참가한 다른 회원들
              <br />
              <br />
              나. 제공되는 정보 : 회원의 신청 내역(목적지, 일정, 인원, 여행코스
              등), 웹사이트 및 앱에서 회원을 식별할 수 있는 정보(성별, 출생연도,
              프로필사진 등 회원이 프로필을 통해 공개한 정보 포함)
            </BodyTab>
          </BodyTab>
          <br />
          ③ 드라이버가 최초로 파티를 개설하려는 회원의 드라이브 서비스 신청을
          승낙한 이후 파티가 생성되면, 그 파티에 가입하려는 다른 회원들은 코스
          변경 제안 외에는 별도의 조건 없이 그 파티에 즉시 가입할 수 있습니다.
          <br />
          <br />
          ④ 회원이 드라이버를 선정하여 파티를 최초로 개설할 때 독점 예약을
          활성화하여 드라이브 서비스를 신청했다면 드라이버가 독점 예약 드라이브
          서비스 신청을 승낙한 직후 말랑트립 확정 상태가 됩니다.
          <br />
          <br />
          ⑤ 위 제2항, 제3항에 따라 파티의 여석이 0이 되거나 드라이버 및 파티에
          이미 참여한 다른 회원들이(기존 파티 참여의 경우) 말랑레디를 한 명도
          빠짐없이 ON으로 활성화한 상태가 회사를 통해 회원에게 도달하면 회원과
          드라이버간 계약이 성립된 것으로 봅니다.
          <br />
          <br />
          ⑥ 회사는 위 제4항, 제5항에 따라 회원과 드라이버간 계약이 성립되고,
          제11조에 따라 회원의 대금 지급이 완료된 것을 확인하면, 드라이버에게
          회원에 대한 아래 각 호의 정보를 제공합니다.
          <br />
          <br />
          <BodyTab>
            1. 회원의 성명
            <br />
            2. 회원의 연락처
            <br />
            3. 회원의 생년월일
          </BodyTab>
          <br />
          ⑦ 회사는 위 제4항, 제5항에 따라 회원과 드라이버간 계약이 성립되고,
          제11조에 따라 회원의 대금 지급이 완료된 것을 확인하면, 회원에게
          드라이버에 대한 아래 각 호의 정보를 제공합니다.
          <br />
          <br />
          <BodyTab>
            1. 드라이버의 성명, 연락처
            <br />
            2. 드라이버의 차종, 차량번호
          </BodyTab>
          <br />⑧ 회원이 파티에 가입한 날로부터 여행이 끝날 때까지 제공되는
          서비스는 최대 4개월로 한정됩니다. 이로 인해 4개월 이상의 예약 기간을
          두고 결제를 하는 것은 불가능하며, 말랑트립은 이를 지원하지 않습니다.
        </BodyContent>
        <BodyContent title={"제 11 조 (대금의 지급)"}>
          ① 드라이브 서비스 대금은 개별 드라이버가 책정하여 웹사이트 및 앱에
          고지한 금액으로 합니다. 이 대금은 파티 1개당 대금으로 책정되고, 파티에
          참여하는 인원에 따라 회원 1인이 지불해야 하는 대금은 변경될 수
          있습니다. 회사는 회원의 편의를 위해 대금 결제를 분할하여 하도록 할 수
          있고, 구체적인 대금 및 지급시기를 웹사이트 및 앱에 고지합니다.
          <br />
          <br />
          ② 회사는 회원이 지급한 드라이브 서비스 대금에서 회사와 드라이버가
          합의한 수수료를 차감하고 나머지 대금을 드라이버에게 지급합니다.
          <br />
          <br />
          ③ 회사는 원활한 대금 지급이 이뤄질 수 있도록 신용카드를 통한
          자동결제방식을 제공하고, 회원이 신용카드정보를 등록하기 전 자동결제 및
          지급시기에 대한 동의를 받습니다.
          <br />
          <br />
          ④ 회원은 자동결제 시 적법한 사용권한을 가지고 있는 신용카드를
          등록하여야 하고, 만약 그렇지 않다고 판단되는 경우 정상적인 대금 지급이
          이뤄질 때까지 회사는 회원에 대한 서비스 제공을 중지할 수 있습니다.
          <br />
          <br />
          ⑤ 회원의 신용카드의 문제로 자동결제에 실패한 경우, 회사는 즉시 이를
          회원에게 통지하고, 정상적인 대금 지급이 이뤄질 때까지 서비스 제공을
          중지할 수 있습니다.
          <br />
          <br />
          ⑥ 회사의 시스템 장애로 자동결제에 실패한 경우, 회사는 시스템 장애가
          해결되는 즉시 재결제를 시도합니다.
          <br />
          <br />⑦ 대금 지급 시 과오납금을 지급하게 된 경우에는 회사는 결제
          방법와 동일한 방법으로 과오납금을 환급하고, 이와 같은 방법이 불가능할
          경우에는 즉시 이를 회원에게 고지한 뒤, 회원이 요청하는 방법으로
          환급합니다. 다만, 회원의 책임있는 사유로 과오납금이 발생한 경우에는
          회사는 환급에 필요한 비용을 제한 나머지 금액을 환급할 수 있습니다.
        </BodyContent>
        <BodyContent title={"제 12 조 (수신확인통지·신청 변경 및 취소)"}>
          ① 회사는 회원의 드라이브 신청이 있는 경우 회원에게 수신확인통지를
          합니다.
          <br />
          <br />② 수신확인통지를 받은 회원은 의사표시의 불일치 등이 있는
          경우에는 수신확인통지를 받은 후 즉시 드라이브 서비스 신청 변경 및
          취소를 요청할 수 있고 회사는 드라이버나 다른 회원들의 승낙 전에 회원의
          요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만
          이미 대금을 지불한 경우에는 제16조의 청약철회 등의 효과에 관한 규정에
          따릅니다.
        </BodyContent>
        <BodyContent title={"제 13 조 (드라이브 서비스의 제공)"}>
          ① 드라이버는 계약에 따라 지정된 일시, 장소에서 지정된 차량을 통해
          회원에게 운전 용역을 제공합니다.
          <br />
          <br />
          ② 드라이버는 서비스 제공 시 다음과 같은 권한을 가집니다.
          <br />
          <br />
          <BodyTab>
            1. 회원 간 범죄행위가 발생한 경우, 여행을 중단하고 이를 제지하거나
            경찰에 신고할 수 있고, 가해 회원을 숙소, 교통요충지(터미널, 역 등)나
            경찰서에 강제 하차시킬 수 있습니다.
            <br />
            <br />
            2. 회원이 음주 등으로 차 내에서 난동을 부리는 경우, 이를 경찰에
            신고하고 해당 회원을 경찰서나 응급실 등에 강제 하차시킬 수 있습니다.
            <br />
            <br />
            3. 여행 중 사고, 질병, 실종 등 이에 준하는 긴급상황 발생 시 여행을
            중단하고 경찰 신고나 구급차 호출 등 필요한 조치를 할 수 있습니다.
            <br />
            <br />
            4. 여행 중 드라이버의 식사 시간은 각 끼니별로 90분을 보장받으며,
            회원은 드라이버의 식사 시간 중 위 1, 2, 3항의 사유를 제외하고는
            드라이버에게 운전을 강요해서는 안 됩니다.
            <br />
            <br />
            5. 드라이브 서비스에 필요한 경우 회원의 연락처로 연락할 수 있습니다.
            <br />
            <br />
            6. 여행 시작 시 출발시간보다 30분을 초과하여 지각하는 회원이 있는
            경우 해당 회원을 제외하고 출발할 수 있습니다.
            <br />
            <br />
            7. 여행 중 기상악화, 목적지의 영업종료, 교통정체, 도로통제 등
            불가피한 상황이 생기는 경우 드라이버는 적절한 코스로 변경할 권한이
            있고, 천재지변으로 여행이 불가능한 경우 드라이버는 여행을 중단할
            권한이 있습니다.
            <br />
            <br />
            8. 여행 시작 시 회원의 예약내역 확인 및 당사자 확인을 위해 회원의
            신분증 확인을 요구할 수 있고, 예약한 회원이 아닌 경우 승차를 거부할
            수 있습니다.
            <br />
            <br />
            9. 회원이 드라이버의 차량에 다른 동행자의 짐과 함께 적재할 수 없을
            정도로 큰 짐을 가지고 있는 경우, 드라이버는 해당 회원에게 짐을
            줄이도록 요구하거나, 짐을 줄이지 않을 시 해당 회원을 제외하고 출발할
            수 있습니다.
          </BodyTab>
          <br />③ 회원은 드라이브 서비스 이용 시 다음 사항을 준수하여야 합니다.
          <br />
          <br />
          <BodyTab>
            1. 회원은 제2항에 기재된 드라이브의 권리를 존중하고 이를 침해해서는
            안 됩니다.
            <br />
            <br />
            2. 회원은 코스 여행 중 드라이버와 약속한 승하차시간과 장소를
            준수하여야 합니다.
            <br />
            <br />
            3. 회원은 폭언, 폭행, 강제추행, 모욕, 성희롱 및 그 외 불법행위나
            과실로 드라이버나 함께 동승한 다른 회원의 안전에 위해를 가해거나
            권리를 침해해서는 안 됩니다.
            <br />
            <br />
            4. 회원은 드라이버에게 예정된 코스 외의 다른 목적지로의 이동을
            요구해서는 안 됩니다.
            <br />
            <br />
            5. 회원은 함께 파티에 참여하는 다른 회원 및 드라이버에게 사전
            승인받지 않은 반려동물, 식물, 추가 수하물, 기타 알레르기 유발 물질을
            가지고 탑승할 수 없습니다.
            <br />
            <br />
            6. 회원과 드라이버간 회사를 통하지 않은 개별 계약 체결은 금지됩니다.
            회원은 드라이버에게 이와 같은 개별 계약 체결을 권유해서는 안 됩니다.
            <br />
            <br />
            7. 회원은 개인 사정으로 여행 중 자진 하차할 수 있으나, 하차 후
            발생할 수 있는 사고나 손해에 대해서는 회원 개인의 책임임을
            확인합니다.
            <br />
            <br />
            8. 회원은 그 외에도 법령과 본 약관을 위반한 일체의 행위를 하여서는
            안 됩니다.
          </BodyTab>
        </BodyContent>
        <BodyContent title={"제 14 조 (환급)"}>
          ① 회사는 회원과 계약한 드라이버가 드라이버의 귀책사유로 드라이브
          서비스를 제공할 수 없게 된 때에는 드라이브 서비스를 제공하지 못하게
          되었음을 확인한 날부터 4~5 영업일 이내에 회원이 이미 결제한 대금을
          환급하거나 환급에 필요한 조치를 취합니다.
          <br />
          <br />
          ② 회사는 회원이 임의로 예약을 취소하는 경우에는 예약 취소일로부터 4~5
          영업일 이내에 제15조에서 정한 위약금을 제외한 나머지 금액이 있는 경우
          이를 환급하거나 환급에 필요한 조치를 취합니다.
          <br />
          <br />③ 회사는 같은 여행에 참여한 다른 여행자 회원이 말랑트립 확정
          상태에서 예약을 취소하는 경우 남아있는 나머지 여행자 회원들의 예약금을
          예약 취소일로부터 4~5 영업일 이내에 전액 환급함과 동시에 예약 취소한
          회원을 제외한 인원 그대로 드라이브 서비스 계약 이전 상태인 말랑트립
          확정 전 상태로 되돌립니다.
        </BodyContent>
        <BodyContent title={"제 15 조 (청약철회 및 변경)"}>
          ① 드라이브 서비스를 신청한 회원은 본조에서 정한 방법에 따라 청약
          철회를 할 수 있습니다.
          <br />
          <br />
          ② 대금 지급이 이루어진 후 드라이브 서비스의 제공이 시작되기 전까지의
          기간에 청약 철회를 하고자 하는 회원은 아래에서 정한 위약금을 공제하고
          환급받을 수 있습니다.
          <br />
          <br />
          <div className="border rounded-lg overflow-hidden text-sm">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-1/3 px-4 py-2 text-center">
                    청약 철회 기간
                    <br />
                    (해당 일자의 23:59까지)
                  </th>
                  <th scope="col" className="w-1/3 px-4 py-2 text-center">
                    위약금
                  </th>
                  <th scope="col" className="w-1/3 px-4 py-2 text-center">
                    환급되는 금액
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-center">여행 8일 전날까지</td>
                  <td className="px-4 py-4 text-center">없음</td>
                  <td className="px-4 py-4 text-center">결제금액 전액</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 7일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 10%</td>
                  <td className="px-4 py-4 text-center">결제금액의 90%</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 6일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 25%</td>
                  <td className="px-4 py-4 text-center">결제금액의 75%</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 5일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 50%</td>
                  <td className="px-4 py-4 text-center">결제금액의 50%</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 4일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 75%</td>
                  <td className="px-4 py-4 text-center">결제금액의 25%</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 3일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 90%</td>
                  <td className="px-4 py-4 text-center">결제금액의 10%</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 2일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 100%</td>
                  <td className="px-4 py-4 text-center">없음</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 1일 전날까지</td>
                  <td className="px-4 py-4 text-center">결제금액의 100%</td>
                  <td className="px-4 py-4 text-center">없음</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">여행 당일</td>
                  <td className="px-4 py-4 text-center">결제금액의 100%</td>
                  <td className="px-4 py-4 text-center">없음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <br />
          ③ 회사는 위 제1항 및 제2항의 내용을 회원이 알기 쉽게 웹사이트 및 앱에
          별도 고지합니다.
          <br />
          <br />
          ④ 청약 철회에 따라 회원이 부담한 위약금은 파티에 참여하는 다른
          회원들의 이익을 위해 사용될 수 있습니다. 단, 청약 철회한 회원은 예약을
          취소한 파티에 재참여가 불가능합니다.
          <br />
          <br />⑤ 회원이 드라이브 서비스의 코스 변경을 하고자 하는 경우에는
          파티에 참여한 다른 회원들과 해당 파티에 지정된 드라이버에게 변경
          제안을 보낼 수 있고, 이들 전원이 승낙하는 경우에 한해서 코스를 변경할
          수 있습니다. 만약 전원 승낙이 없는 경우에는 코스 변경은 불가합니다.
        </BodyContent>
        <BodyContent title={"제 16 조 (청약철회의 효과)"}>
          ① 회사는 회원이 청약철회를 신청한 경우 4~5 영업일 이내에 회원이 지불한
          대금에서 제15조 제2항에 따른 위약금을 제외한 대금을 환급합니다.
          <br />
          <br />
          ② 회원의 결제수단 오류로 대금 결제가 되지 않았던 경우에는 회사는
          별도로 회원에게 위약금을 청구할 수 있습니다.
          <br />
          <br />
          ③ 회사는 위 대금을 환급함에 있어서 회원이 신용카드 또는 전자화폐 등의
          결제수단으로 대금을 지급한 때에는 당해 결제수단을 제공한 사업자로
          하여금 재화 등의 대금의 청구를 일부 또는 전부 취소하도록 요청할 수
          있고, 이에 따른 조치가 어려운 경우에는 회사는 회원이 웹사이트 및 앱에
          등록한 환급계좌로 환급하며, 만약 회원이 환급계좌를 등록하지 않은
          경우에는 지체없이 회원에게 환급 예정인 사실과 환급계좌를 고지해달라는
          내용의 통지를 합니다.
          <br />
          <br />④ 회사가 회사의 귀책으로 회원에게 환급을 지연한 때에는 그
          지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률
          시행령」제21조의3에서 정하는 지연이자율을 곱하여 산정한 지연이자를
          지급합니다. 단, 회원이 환급계좌를 정확하게 등록하지 않았거나, 회사의
          요청에도 지체없이 환급계좌를 알려오지 않는 등 회원의 귀책으로 인해
          환급이 지연되는 기간 동안에는 지연이자를 지급하지 않습니다.
        </BodyContent>
        <BodyContent
          title={"제 17 조 (드라이브 서비스와 관련한 회사의 의무 및 면책)"}
        >
          ① 드라이브 서비스에 대한 계약은 회원과 드라이버간에 체결되는 것으로서,
          회사는 이를 중개할 뿐, 직접적인 계약의 당사자가 아니므로 드라이브
          서비스 계약에 따른 권리의무를 지지 않습니다.
          <br />
          <br />
          ② 드라이버가 회사나 회원의 사전 승인 없이 무단으로 드라이브 서비스를
          제공하지 않은 경우, 회사는 우선적으로 회원에게 미이행 서비스 대금을
          환급하고 해당 드라이버에게 필요한 조치를 취합니다.
          <br />
          <br />
          ③ 회사는 드라이버가 성실하게 드라이브 서비스를 제공할 수 있도록 교육,
          관리에 최선을 다합니다.
          <br />
          <br />
          ④ 회사가 드라이버에 대한 적절한 교육을 하였음에도 불구하고 드라이버가
          회원에게 고의 또는 과실로 손해를 끼친 경우, 이에 대한 민·형사상 책임은
          드라이버에게 있고, 회사는 회원이 신속하게 권리구제를 받을 수 있도록
          최선을 다해 돕습니다.
          <br />
          <br />⑤ 드라이버가 제13조 제2항에 따른 권한 범위에서 한 행위는 회원의
          손해로 간주하지 않고, 회사 및 드라이버는 이에 대해 책임지지 않습니다.
          또한 드라이브 서비스와 무관하게 발생한 사고 및 손해와, 드라이브
          서비스가 종료되거나 회원이 자진 하차한 후 발생한 사고 및 손해, 동승한
          다른 회원이나 제3자의 고의·과실으로 발생한 사고 및 손해에 대해서도
          회사 및 드라이버는 책임지지 않습니다.
        </BodyContent>
        <BodyContent title={"제 18 조 (드라이브 서비스의 변경)"}>
          ① 제13조 제2항에 따라 드라이버는 긴급상황이나 불가피한 상황이 발생 시
          여행을 중단하거나 코스를 변경할 수 있습니다.
          <br />
          <br />
          ② 여행 중 발생하는 시간, 코스 변경은 최대한 회원과 드라이버간 원만한
          합의로 해결합니다. 다만, 합의가 되지 않는 경우 아래 각 호의 원칙을
          따릅니다.
          <br />
          <br />
          <BodyTab>
            1. 드라이버의 과실로 여행이 지연되거나 조기 종료되는 경우 드라이버의
            책임입니다. 이 경우 드라이버는 여행 시간이 초과되더라도 여행 종료 시
            회원들을 숙박 장소나 합의된 여행 종료 장소까지 이동시켜야 할 의무가
            있고, 여행이 조기 종료되어 회원들이 희망하는 경우 남은 여행 시간만큼
            드라이브 서비스를 제공하여야 합니다.
            <br />
            <br />
            2. 드라이버의 과실 없이 여행이 지연되거나 조기 종료되는 경우에는
            회사나 드라이버는 책임지지 않습니다. 다만, 드라이버의 과실 없이 여행
            시간이 초과되거나 초과될 것이 명백한 경우, 남은 코스가 있더라도
            드라이버는 이 장소들로 모두 이동할 의무가 없고, 다만 회원들을 숙박
            장소, 합의된 여행 종료 장소, 대중교통을 이용할 수 있는 장소 중 가장
            가까운 곳까지 이동시킵니다.
            <br />
            <br />
            3. 여행 중 드라이버와 회원 전원의 사전 합의 하에 여행 시간을 늘리는
            경우, 회원들은 드라이버에게 적절한 현금 보상을 하여야 합니다.
          </BodyTab>
        </BodyContent>
        <BodyContent title={"제 19 조 (계약의 해지)"}>
          ① 다음 각 호의 사유가 있는 경우 회원과 드라이버는 여행 시작 전이나
          여행 중이더라도 상호 드라이브 계약을 해지할 수 있습니다. 다만
          해지하고자 하는 당사자가 해지 사유를 입증할 수 있어야 합니다.
          <br />
          <br />
          <BodyTab>
            1. 상대방이 모욕·폭언·폭행·그밖에 이에 준하는 불법행위나 심히 부당한
            대우를 할 경우
            <br />
            <br />
            2. 드라이버의 서비스 거부, 회원의 과다한 서비스 요구 등으로
            정상적으로 드라이브 서비스를 제공하는 것이 불가능하다고 판단되는
            경우
          </BodyTab>
          <br />② 제1항에 따라 드라이브 계약이 해지된 경우 대금은 회사가 제14조
          제1항의 방법에 의해 환급합니다. 단, 이미 여행이 개시되어 여행 중
          계약이 해지되는 경우라면 이미 제공된 서비스 시간에 상당하는 대금은
          환급되지 않습니다. 본조에서 정한 해지 및 환급은 회원과 드라이버 상호간
          손해배상청구에 영향을 미치지 않습니다.
        </BodyContent>
        <BodyContent title={"제 20 조 (드라이버 평가)"}>
          ① 회원은 드라이브 서비스가 종료된 후 웹사이트 및 앱에 안내된 방법에
          따라 드라이버에 대한 평가를 남길 수 있습니다.
          <br />
          <br />② 회원은 드라이버를 평가함에 있어 진실한 사실에 기반한 평가를
          하여야 하고, 허위사실 적시 또는 드라이버에 대한 모욕, 명예훼손 등을
          하여서는 안 됩니다. 회사는 회원의 평가가 법령에 위반될 소지가 있다고
          판단하는 경우에는 이를 임의로 삭제할 수 있습니다.
        </BodyContent>

        <BodyTitle title={"제 3 절 그 외 회사와 회원의 권리 의무"} />
        <BodyContent title={"제 21 조 (회사의 의무)"}>
          ① 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
          않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를
          제공하는데 최선을 다하여야 합니다.
          <br />
          <br />
          ② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 회원의
          개인정보(신용정보 포함)보호를 위해 노력해야 합니다.
          <br />
          <br />
          ③ 회사는 회원이 원하지 않는 영리목적의 광고성 전자우편을 발송하지
          않습니다.
          <br />
          <br />
          ④ 회사는 서비스 및 드라이브 서비스에 대한 회원의 의견을 청취하고
          질의에 답변하기 위하여 고객센터를 운영하고, 회원의 정당한 요구에
          성실히 응하도록 노력합니다.
          <br />
          <br />⑤ 회사는 드라이버에 대한 주기적인 교육을 하여 드라이버가 원활한
          드라이브 서비스 제공을 할 수 있도록 적극 협조합니다.
        </BodyContent>
        <BodyContent title={"제 22 조 (회원의 의무)"}>
          ① 회원의 ID와 비밀번호에 관한 관리책임은 회원 본인에게 있고, 회원은
          자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다.
          <br />
          <br />
          ② 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을
          인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에
          따라야 합니다.
          <br />
          <br />
          ③ 회원은 최신 버전의 앱을 사용하여야 하고 웹사이트 및 앱에서 요구하는
          시스템 요구 사항을 충족하여야 합니다. 이를 이행하지 않아 발생하는
          손해에 대해서는 회사가 책임지지 않습니다.
          <br />
          <br />
          ④ 회원은 웹사이트 및 앱에 정확한 연락처, 환급계좌 등을 등록하여야
          하고, 변경 시 이를 반영하여야 합니다. 이를 이행하지 않아 발생하는
          손해에 대해서는 회사가 책임지지 않습니다.
          <br />
          <br />
          ⑤ 회원은 서비스 이용 시 다음 각 호의 행위를 하여서는 안 됩니다.
          <br />
          <br />
          <BodyTab>
            1. 웹사이트 및 앱에 회사나 드라이버, 다른 회원 또는 제3자의
            지식재산권, 명예, 재산권 기타 정당한 권리를 침해하는 글, 사진, 영상,
            음성 등 컨텐츠를 게시하는 행위
            <br />
            <br />
            2. 웹사이트 및 앱에 외설 또는 폭력적인 컨텐츠, 회사가 게시를
            금지하여 웹사이트 및 앱에 공지한 컨텐츠, 특정 집단을 비방·비하하는
            컨텐츠, 그 외 법령이나 기타 공서양속에 반하는 컨텐츠를 게시하는 행위
            <br />
            <br />
            3. 웹사이트 및 앱에 게시된 정보를 변경하거나 회사나 드라이버의
            업무나 보안에 위해를 가하는 행위
            <br />
            <br />
            4. 그 외 본 약관 제7조 제2항 각 호에 해당하는 행위
          </BodyTab>
          <br />
          ⑥ 회사는 회원이 제5항 각 호 중 하나를 위반한 컨텐츠를 웹사이트 및 앱에
          게시한 경우 해당 컨텐츠를 작성자에게 사전 통보 없이 삭제할 수
          있습니다.
          <br />
          <br />
          ⑦ 누구든지 회원이 게시한 컨텐츠로 인해 권리 침해를 당하여 이를 회사에
          알리는 경우, 회사는 즉각 해당 컨텐츠를 게시중지한 후 해당 컨텐츠를
          작성한 회원에게 이와 같은 사실을 제8조의 방법에 따라 통지합니다.
          <br />
          <br />⑧ 회원이 웹사이트 및 앱에 게시한 컨텐츠가 수사나 재판의 대상이
          되는 경우, 회사는 수사기관이나 법원에 협조합니다.
        </BodyContent>
        <BodyContent title={"제 23 조 (손해배상)"}>
          회원이 불법행위나 채무불이행, 본 약관의 위반으로 회사나 드라이버, 다른
          회원 및 제3자에게 손해를 끼친 경우 회원은 그 손해를 배상합니다.
        </BodyContent>
        <BodyContent title={"제 24 조 (회사의 면책 및 분쟁해결)"}>
          ① 회사는 회원과 드라이버간 드라이브 서비스 제공 계약을 중개하는
          것이므로, 양 당사자들의 채무 불이행이나 불법행위에 대하여 그
          상대방에게 책임지지 않습니다.
          <br />
          <br />
          ② 회사는 드라이버로부터 신상정보와 이력을 제공받아 검토한 뒤 필요한
          정보를 회원에게 제공합니다. 다만 드라이버가 신상정보나 이력을 허위로
          제공하여 회사가 알 수 없었던 경우에는 회사는 이에 대해서는 책임지지
          않습니다.
          <br />
          <br />
          ③ 회사는 회원과 드라이버간 분쟁 시 적극 개입하여 분쟁이 해결될 수
          있도록 협조하고, 회원이 제기하는 정당한 의견이나 불만을 반영하고 이를
          해결하기 위하여 노력합니다.
          <br />
          <br />④ 회사는 웹사이트 및 앱에 광고주나 제휴업체의 광고를 할 수
          있습니다. 다만, 회원과 광고주 및 제휴업체 등과의 거래에 따른 책임은
          회사가 지지 않습니다.
        </BodyContent>
        <BodyContent title={"제 25 조 (개인정보보호)"}>
          ① 회사는 회원의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서
          최소한의 개인정보를 수집하며, 개인정보를 수집·이용하는 때에는
          당사자에게 그 목적을 고지하고 동의를 받습니다.
          <br />
          <br />
          ② 회사는 개인정보처리방침을 수립하고 이에 따릅니다.
          <br />
          <br />③ 회사는 웹사이트 및 앱의 보안 관리에 최선을 다합니다. 그럼에도
          불구하고 제3자의 불법행위로 인하여 개인정보가 유출된 경우에는 회사는
          책임지지 않습니다.
        </BodyContent>
        <BodyContent title={"제 26 조 (재판권 및 준거법)"}>
          ① 회사와 회원 간에 발생한 분쟁에 관한 소송의 관할은 민사소송법에
          따릅니다.
          <br />
          <br />② 회사와 회원 간에 제기된 소송에는 대한민국법을 적용합니다.
        </BodyContent>

        <PolicyDate />
      </PolicyContainer>
    </PageContainer>
  );
}

export default memo(UserService);