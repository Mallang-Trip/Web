export const termsData = {
  ko: {
    title: "개인정보 수집·이용 동의",
    preamble: `'말랑트립'(이하 '회사'라 합니다)은 개인정보보호법 등 관련 법령에 따라, 서비스 제공을 위한 이용자의 개인정보를 수집·이용하기 위해 다음과 같이 동의를 받고자 합니다.`,
    sections: [
      {
        title: "1. 개인정보 수집·이용 목적",
        intro: "회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.",
        list: [
          "기획여행상품의 예약 및 계약 체결",
          "예약 내역의 확인 및 원활한 여행 진행을 위한 안내 (파트너 기사에게 전달 포함)",
          "서비스 이용에 따른 대금 결제 및 환불 처리",
          "서비스 관련 문의, 불만 등 고객 고충 처리 및 분쟁 해결",
          "부정 이용 방지 및 비인가 사용 방지",
        ],
      },
      {
        title: "2. 수집하는 개인정보 항목",
        hasTable: true,
        table: {
          headers: ["구분", "수집 항목"],
          rows: [["필수", "예약자명, 연락처 (휴대전화번호), 이메일 주소"]],
        },
        note: "※ 회사는 MVP 단계에서 여행자보험 가입 서비스를 제공하지 않으므로, 보험 가입에 필요한 생년월일 등의 정보는 수집하지 않습니다.",
      },
      {
        title: "3. 개인정보의 보유 및 이용 기간",
        intro:
          "수집된 개인정보는 원칙적으로 서비스 제공 완료 및 수집·이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.",
        hasTable: true,
        table: {
          headers: ["근거 법령", "보존 항목", "보존 기간"],
          rows: [
            [
              "전자상거래 등에서의 소비자보호에 관한 법률",
              "계약 또는 청약철회 등에 관한 기록",
              "5년",
            ],
            ["", "대금결제 및 재화 등의 공급에 관한 기록", "5년"],
            ["", "소비자의 불만 또는 분쟁처리에 관한 기록", "3년"],
            ["통신비밀보호법", "로그인 기록 등 접속에 관한 기록", "3개월"],
          ],
        },
      },
      {
        title: "4. 동의 거부 권리 및 불이익",
        intro:
          "귀하는 위와 같은 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.",
        hasImportantNotice: true,
        notice:
          "그러나 동의를 거부하실 경우, 기획여행상품의 예약, 결제 및 정상적인 서비스 제공이 불가능하여 말랑트립 서비스를 이용하실 수 없습니다.",
      },
    ],
  },
  en: {
    title: "Consent to Collect and Use Personal Information",
    preamble: `'MallangTrip' (hereinafter the "Company"), in accordance with the Personal Information Protection Act and other relevant laws, seeks the following consent to collect and use users' personal information for service provision.`,
    sections: [
      {
        title: "1. Purpose of Collection and Use of Personal Information",
        intro:
          "The Company uses the collected personal information for the following purposes:",
        list: [
          "Booking and contracting of planned tour products",
          "Confirmation of booking details and guidance for a smooth tour (including transfer to Partner Drivers)",
          "Payment processing and refunds for service use",
          "Handling customer inquiries and complaints, and dispute resolution",
          "Prevention of fraudulent and unauthorized use",
        ],
      },
      {
        title: "2. Personal Information Items Collected",
        hasTable: true,
        table: {
          headers: ["Category", "Items Collected"],
          rows: [
            [
              "Required",
              "Booker's name, contact number (mobile phone), email address",
            ],
          ],
        },
        note: "※ As the Company does not offer traveler's insurance services at the MVP stage, information required for insurance, such as date of birth, is not collected.",
      },
      {
        title: "3. Retention and Use Period of Personal Information",
        intro:
          "In principle, collected personal information is destroyed without delay after the completion of service provision and the achievement of collection/use purposes. However, the following information is retained for the period specified for the reasons below:",
        hasTable: true,
        table: {
          headers: ["Basis Law", "Items to Retain", "Retention Period"],
          rows: [
            [
              "Act on Consumer Protection in Electronic Commerce, etc.",
              "Records on contracts or withdrawal of offers",
              "5 years",
            ],
            ["", "Records on payment and supply of goods", "5 years"],
            [
              "",
              "Records on consumer complaints or dispute resolution",
              "3 years",
            ],
            [
              "Communication Secrets Protection Act",
              "Records on access, such as login history",
              "3 months",
            ],
          ],
        },
      },
      {
        title: "4. Right to Refuse Consent and Disadvantages",
        intro:
          "You have the right to refuse consent to the collection and use of personal information as described above.",
        hasImportantNotice: true,
        notice:
          "However, if you refuse to consent, you will be unable to use MallangTrip's services as booking, payment, and normal service provision for planned tour products will be impossible.",
      },
    ],
  },
  zh: {
    title: "个人信息收集与使用同意书",
    preamble: `"MallangTrip"（以下简称"公司"）根据《个人信息保护法》等相关法律，为提供服务需收集和使用用户的个人信息，现征求如下同意。`,
    sections: [
      {
        title: "1. 个人信息收集与使用目的",
        intro: "公司将收集的个人信息用于以下目的：",
        list: [
          "企划旅游产品的预订及合同签订",
          "预订详情确认及为顺利进行旅行的引导（包括转达给合作司机）",
          "服务使用的费用结算及退款处理",
          "处理服务相关的咨询、投诉等客户问题及解决纠纷",
          "防止不正当使用及未经授权的使用",
        ],
      },
      {
        title: "2. 收集的个人信息项目",
        hasTable: true,
        table: {
          headers: ["区分", "收集项目"],
          rows: [["必需", "预订人姓名、联系方式（手机号码）、电子邮箱地址"]],
        },
        note: "※ 公司在MVP（最小可行产品）阶段不提供游客保险服务，因此不收集保险所需的出生日期等信息。",
      },
      {
        title: "3. 个人信息的持有与使用期限",
        intro:
          "原则上，收集的个人信息在服务提供完毕及收集使用目的达成后将立即销毁。但以下信息将根据下述原因在规定期限内保存：",
        hasTable: true,
        table: {
          headers: ["法律依据", "保存项目", "保存期限"],
          rows: [
            ["电子商务中消费者保护相关法律", "关于合同或要约撤回的记录", "5年"],
            ["", "关于费用结算及商品供应的记录", "5年"],
            ["", "关于消费者投诉或纠纷处理的记录", "3年"],
            ["通信秘密保护法", "登录记录等访问相关记录", "3个月"],
          ],
        },
      },
      {
        title: "4. 拒绝同意的权利及不利之处",
        intro: "您有权拒绝上述个人信息的收集与使用。",
        hasImportantNotice: true,
        notice:
          "但若您拒绝同意，将无法预订、支付企划旅游产品，也无法享受正常的服务，因此无法使用MallangTrip的服务。",
      },
    ],
  },
};
