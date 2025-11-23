const policy = {
  metadata: {
    title: "Terms & Conditions",
  },
  // Privacy Policy (Consent to Collect and Use Personal Information)
  privacy: {
    title: "Consent to Collect and Use Personal Information",
    preamble:
      "'MallangTrip' (hereinafter the 'Company'), in accordance with the Personal Information Protection Act and other relevant laws, seeks the following consent to collect and use users' personal information for service provision.",
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

  // Service Terms (Tour Service Terms and Conditions)
  service: {
    title: "MallangTrip Tour Service Terms and Conditions",
    preamble:
      "These terms are based on the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel (Standard No. 10020), with certain clauses modified or supplemented to reflect the specific characteristics of the planned tour products offered by MallangTrip (hereinafter the 'Company'). Customers must review and agree to all contents before booking.",
    articles: [
      {
        title: "Article 1 (Purpose)",
        content:
          "The purpose of these terms is to define the rights and obligations of both parties in the contract for domestic planned tour products concluded between the 'Company' and the traveler (hereinafter the 'Member').",
      },
      {
        title: "Article 2 (Definition of Terms)",
        content:
          "'Planned Tour Product' refers to a tour organized by the 'Company' by pre-determining the destination, itinerary, and transportation services (hereinafter the 'Tour Product'), and recruiting 'Members' to participate.",
      },
      {
        title: "Article 3 (Company's Obligations)",
        content:
          "The 'Company' shall faithfully perform its duties in planning and executing the tour, including tour arrangement, guidance, and transportation, to provide safe and satisfactory travel services to the 'Member'.",
      },
      {
        title: "Article 4 (Member's Obligations)",
        content:
          "The 'Member' shall cooperate with the 'Company's' guidance and requests regarding services and safety for an enjoyable and safe trip.",
      },
      {
        title: "Article 5 (Composition of Contract and Important Notices)",
        content:
          "① The travel contract consists of the travel agreement (including electronic documents), these terms and conditions, and the travel itinerary (as confirmed at the time of booking).",
        notice: {
          title:
            "[Important Notice Regarding Non-inclusion of Traveler's Insurance]",
          content:
            "② The price of this 'Tour Product' does not include the cost of traveler's insurance. It is strongly recommended that the 'Member' purchase domestic traveler's insurance separately to prepare for potential accidents, illnesses, injuries, and loss or damage of personal belongings during the trip. The 'Company' is not liable for damages arising from the failure to purchase insurance, unless caused by the 'Company's' willful misconduct or gross negligence. This is deemed acknowledged and accepted by the 'Member' upon agreeing to these terms.",
        },
      },
      {
        title: "Article 6 (Refusal to Conclude a Contract)",
        content:
          "The 'Company' may refuse to conclude a contract with a 'Member' if any of the following reasons apply:",
        list: [
          "It is objectively judged that the 'Member' may have difficulty in the smooth execution of the tour due to illness, physical conditions, or other reasons.",
          "The 'Member' is deemed likely to cause inconvenience to other travelers or disrupt the smooth running of the tour.",
          "The 'Member' provides false information or fails to provide required information at the time of booking.",
        ],
      },
      {
        title: "Article 7 (Tour Fee)",
        content:
          "① The price of the 'Tour Product' is the total amount specified on the booking page of each product and may or may not include the following items, which will be clearly specified on the booking page:",
        includes: [
          {
            type: "Inclusions",
            content:
              "Private vehicle (taxi) for the reserved time, driver service, fuel costs, etc.",
          },
          {
            type: "Exclusions",
            content:
              "Toll fees, parking fees, attraction entrance fees, 'Member's' meals and personal expenses, traveler's insurance costs, etc.",
          },
        ],
        additionalContent:
          "② The 'Member' must pay the tour fee to the 'Company' as stipulated in the contract.",
      },
      {
        title: "Article 8 (Change of Travel Conditions)",
        content:
          "① This 'Tour Product' respects the 'Member's' autonomy, allowing for adjustments to the visit order or stay duration within the pre-determined course in consultation with the 'Partner Driver'.",
        additionalContent: [
          "② However, if the total operating time is exceeded at the 'Member's' request, an overtime charge may apply, which the 'Member' must settle directly with the 'Partner Driver' on-site.",
          "③ The 'Company' may change the travel itinerary or contents with the 'Member's' consent in case of objectively recognized unavoidable circumstances such as natural disasters, local traffic conditions, or weather.",
        ],
      },
      {
        title: "Article 9 (Indemnification)",
        content:
          "① The 'Company' shall compensate for any damages caused to the 'Member' due to the willful misconduct or negligence of the 'Company' or its 'Partner Driver'.",
        additionalContent:
          "② If the 'Member' causes damage to the 'Company' or the 'Partner Driver' through willful misconduct or negligence, the 'Member' is liable for compensating for such damages.",
      },
      {
        title: "Article 10 (Cancellation and Refund Policy)",
        content:
          "① The cancellation and refund policy for this 'Tour Product' is primarily governed by the following special terms set by the 'Company'. The 'Member' is deemed to have confirmed and agreed to this policy upon booking.",
        rules: [
          "Cancellation notice received by 23:59, 4 days before the tour start date: Full refund of the payment",
          "Cancellation notice received after 00:00, 3 days before the tour start date: No refund",
        ],
        additionalContent: [
          "② The above policy may differ from the cancellation fee regulations of the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel, and the 'Member' agrees to this upon concluding the contract.",
          "③ If the tour is canceled due to the 'Company's' fault, the 'Company' will refund the full payment to the 'Member'.",
        ],
      },
      {
        title: "Article 11 (Limitation of Company's Liability)",
        content:
          "① The 'Company' is not responsible for accidents such as loss, theft, or injury caused by the 'Member's' carelessness, unless there is direct fault of the 'Company'.",
        additionalContent:
          "② The 'Company' is not responsible for accidents that occur while the 'Member' is acting individually during the tour itinerary.",
      },
      {
        title: "Article 12 (Miscellaneous)",
        content:
          "Matters not stipulated in these terms shall be governed by relevant laws and general commercial practices.",
      },
    ],
    addendum: {
      title: "Addendum",
      content:
        "Article 1 (Effective Date) These terms shall become effective on July 26, 2025.",
    },
  },

  // Third Party (Consent to Provide Personal Information to Third Parties)
  thirdparty: {
    title: "Consent to Provide Personal Information to Third Parties",
    preamble:
      "'MallangTrip' (hereinafter the 'Company') seeks your consent to provide personal information to third parties as described below, in accordance with the Personal Information Protection Act and other relevant laws, for the purpose of smooth service provision.",
    sections: [
      {
        title: "1. Recipient of Personal Information",
        hasTable: true,
        table: {
          headers: ["Recipient"],
          rows: [["Affiliated Partner Driver"]],
        },
      },
      {
        title: "2. Purpose and Items of Personal Information Provided",
        hasTable: true,
        table: {
          headers: [
            "Recipient",
            "Purpose of Provision",
            "Items of Personal Information Provided",
          ],
          rows: [
            [
              "Affiliated Partner Driver",
              "Tour progression, including booking confirmation, pickup/drop-off\nEmergency contact related to the tour",
              "Booker's name\nContact number (mobile phone)\nTour date, time, start/end location information",
            ],
          ],
        },
      },
      {
        title: "3. Retention and Use Period of Personal Information",
        content: [
          "To be destroyed immediately after the completion of service provision (end of tour).",
          "However, if retention is required by the provisions of relevant laws, the Company will store member information for a certain period prescribed by those laws.",
        ],
      },
      {
        title: "4. Right to Refuse Consent and Disadvantages",
        intro:
          "You have the right to refuse consent to the provision of personal information to third parties as described above.",
        hasImportantNotice: true,
        notice:
          "However, if you refuse to consent, your booking information cannot be delivered to the partner driver, making it impossible to book the planned tour product and receive normal services. Therefore, you will be unable to use MallangTrip's services.",
      },
    ],
  },

  // Travel Standard Terms (Domestic Travel Standard Terms and Conditions)
  travel: {
    title: "MallangTrip Tour Domestic Travel Standard Terms and Conditions",
    preamble:
      "These terms are based on the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel (Standard No. 10020), with certain clauses modified or supplemented to reflect the specific characteristics of the planned tour products offered by MallangTrip (hereinafter the 'Company'). Customers must review and agree to all contents before booking.",
    articles: [
      {
        title: "Article 1 (Purpose)",
        content:
          "The purpose of these terms is to define the rights and obligations of both parties in the contract for domestic planned tour products concluded between the 'Company' and the traveler (hereinafter the 'Member').",
      },
      {
        title: "Article 2 (Definition of Terms)",
        content:
          "'Planned Tour Product' refers to a tour organized by the 'Company' by pre-determining the destination, itinerary, and transportation services (hereinafter the 'Tour Product'), and recruiting 'Members' to participate.",
      },
      {
        title: "Article 3 (Company's Obligations)",
        content:
          "The 'Company' shall faithfully perform its duties in planning and executing the tour, including tour arrangement, guidance, and transportation, to provide safe and satisfactory travel services to the 'Member'.",
      },
      {
        title: "Article 4 (Member's Obligations)",
        content:
          "The 'Member' shall cooperate with the 'Company's' guidance and requests regarding services and safety for an enjoyable and safe trip.",
      },
      {
        title: "Article 5 (Composition of Contract and Important Notices)",
        content:
          "① The travel contract consists of the travel agreement (including electronic documents), these terms and conditions, and the travel itinerary (as confirmed at the time of booking).",
        notice: {
          title:
            "[Important Notice Regarding Non-inclusion of Traveler's Insurance]",
          content:
            "② The price of this 'Tour Product' does not include the cost of traveler's insurance. It is strongly recommended that the 'Member' purchase domestic traveler's insurance separately to prepare for potential accidents, illnesses, injuries, and loss or damage of personal belongings during the trip. The 'Company' is not liable for damages arising from the failure to purchase insurance, unless caused by the 'Company's' willful misconduct or gross negligence. This is deemed acknowledged and accepted by the 'Member' upon agreeing to these terms.",
        },
      },
      {
        title: "Article 6 (Refusal to Conclude a Contract)",
        content:
          "The 'Company' may refuse to conclude a contract with a 'Member' if any of the following reasons apply:",
        list: [
          "It is objectively judged that the 'Member' may have difficulty in the smooth execution of the tour due to illness, physical conditions, or other reasons.",
          "The 'Member' is deemed likely to cause inconvenience to other travelers or disrupt the smooth running of the tour.",
          "The 'Member' provides false information or fails to provide required information at the time of booking.",
        ],
      },
      {
        title: "Article 7 (Tour Fee)",
        content:
          "① The price of the 'Tour Product' is the total amount specified on the booking page of each product and may or may not include the following items, which will be clearly specified on the booking page:",
        includes: [
          {
            type: "Inclusions",
            content:
              "Private vehicle (taxi) for the reserved time, driver service, fuel costs, etc.",
          },
          {
            type: "Exclusions",
            content:
              "Toll fees, parking fees, attraction entrance fees, 'Member's' meals and personal expenses, traveler's insurance costs, etc.",
          },
        ],
        additionalContent:
          "② The 'Member' must pay the tour fee to the 'Company' as stipulated in the contract.",
      },
      {
        title: "Article 8 (Change of Travel Conditions)",
        content:
          "① This 'Tour Product' respects the 'Member's' autonomy, allowing for adjustments to the visit order or stay duration within the pre-determined course in consultation with the 'Partner Driver'.",
        additionalContent: [
          "② However, if the total operating time is exceeded at the 'Member's' request, an overtime charge may apply, which the 'Member' must settle directly with the 'Partner Driver' on-site.",
          "③ The 'Company' may change the travel itinerary or contents with the 'Member's' consent in case of objectively recognized unavoidable circumstances such as natural disasters, local traffic conditions, or weather.",
        ],
      },
      {
        title: "Article 9 (Indemnification)",
        content:
          "① The 'Company' shall compensate for any damages caused to the 'Member' due to the willful misconduct or negligence of the 'Company' or its 'Partner Driver'.",
        additionalContent:
          "② If the 'Member' causes damage to the 'Company' or the 'Partner Driver' through willful misconduct or negligence, the 'Member' is liable for compensating for such damages.",
      },
      {
        title: "Article 10 (Cancellation and Refund Policy)",
        content:
          "① The cancellation and refund policy for this 'Tour Product' is primarily governed by the following special terms set by the 'Company'. The 'Member' is deemed to have confirmed and agreed to this policy upon booking.",
        rules: [
          "Cancellation notice received by 23:59, 4 days before the tour start date: Full refund of the payment",
          "Cancellation notice received after 00:00, 3 days before the tour start date: No refund",
        ],
        additionalContent: [
          "② The above policy may differ from the cancellation fee regulations of the Fair Trade Commission's Standard Terms and Conditions for Domestic Travel, and the 'Member' agrees to this upon concluding the contract.",
          "③ If the tour is canceled due to the 'Company's' fault, the 'Company' will refund the full payment to the 'Member'.",
        ],
      },
      {
        title: "Article 11 (Limitation of Company's Liability)",
        content:
          "① The 'Company' is not responsible for accidents such as loss, theft, or injury caused by the 'Member's' carelessness, unless there is direct fault of the 'Company'.",
        additionalContent:
          "② The 'Company' is not responsible for accidents that occur while the 'Member' is acting individually during the tour itinerary.",
      },
      {
        title: "Article 12 (Miscellaneous)",
        content:
          "Matters not stipulated in these terms shall be governed by relevant laws and general commercial practices.",
      },
    ],
    addendum: {
      title: "Addendum",
      content:
        "Article 1 (Effective Date) These terms shall become effective on July 26, 2025.",
    },
  },
};

export default policy;
