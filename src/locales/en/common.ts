const common = {
  // Root metadata
  metadata: {
    title: "Mallangtrip",
    description:
      "Faster than bus, cheaper than taxi! Taxi carpool travel platform Mallangtrip",
  },
  // Common buttons
  button: {
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    submit: "Submit",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    viewMore: "View More",
    bookNow: "Book Now",
    viewReservation: "View Reservations",
    admin: "Admin",
  },
  // Common labels
  label: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    date: "Date",
    time: "Time",
    message: "Message",
    price: "Price",
    startingPrice: "Starting from",
    duration: "Duration",
    rating: "Rating",
    reviews: "Reviews",
    language: "Language",
  },
  // Common messages
  message: {
    loading: "Loading...",
    noData: "No data available",
    error: "An error occurred",
    success: "Success",
    confirm: "Are you sure?",
  },
  // Currency
  currency: {
    krw: "₩",
    usd: "$",
  },
  // UI Components
  ui: {
    datePicker: {
      placeholder: "Select a date",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      monthFormat: (year: number, month: number) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${monthNames[month - 1]} ${year}`;
      },
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    timePicker: {
      placeholder: "Select a time",
    },
  },
  // Detail common components
  detail: {
    // Pickup/Dropoff areas guide
    pickupDropoff: {
      title: "Pickup & Drop-off Service Areas",
      description: "Start and end your tour comfortably from anywhere.",
      availableAreas: "Service Available Areas",
      incheonSeoul: "📍 Incheon & Seoul:",
      incheonSeoulDesc: "All areas",
      daejeonSejong: "📍 Daejeon/Sejong/Chungnam:",
      daejeonSejongDesc: "🚕 Please contact us before booking",
      gyeonggiSouth: "📍 Southern Gyeonggi",
      gyeonggiSouthCities:
        "Gwangmyeong, Gwacheon, Gunpo, Gwangju, Gimpo, Bucheon, Seongnam, Suwon, Siheung, Ansan, Anseong, Anyang, Yeoju, Osan, Yongin, Uiwang, Icheon, Pyeongtaek, Hanam, Hwaseong",
      noticeTitle: "Pickup/Drop-off Notice",
      noticeAlertTitle: "Important Information for Smooth Tour Operations",
      notice1:
        "You can specify unlimited pickup and drop-off locations, but they must be within the ",
      notice1Bold: "service available areas",
      notice1End: " listed above.",
      notice2:
        "To avoid traffic congestion during weekday rush hours and weekend mornings, we strongly recommend limiting multiple pickup/drop-off locations to ",
      notice2Bold: "2 or fewer stops",
      notice2End: ".",
      notice3:
        "Multiple pickups/drop-offs that significantly deviate from the planned route may incur additional travel fees. We will contact you separately before confirming your reservation to inform you of these fees, and request additional payment accordingly.",
      included: "Included",
      excluded: "Excluded",
    },
    // Booking sidebar/bottom bar
    booking: {
      baseRate: "Base",
      rate: "rate",
      bookNow: "Book Now",
      unavailable: "Currently Unavailable",
      approvalRequired: "Confirmed after approval",
    },
    // Reviews section
    reviews: {
      title: "Customer Reviews",
      photoAlt: "Review photo",
    },
    // Pricing section
    pricing: {
      title: "Transparent Pricing",
      item: "Item",
      description: "Description",
      paymentMethod: "Payment",
      amount: "Amount",
    },
    // Pictures section
    pictures: {
      title: "Tour Gallery",
      imageAlt: "image",
    },
    // Features section
    features: {
      title: "Mallangtrip",
      titleSuffix: " Taxi Tour Special Features",
    },
    // Booking form
    bookingForm: {
      title: "Make a Reservation",
      name: "Name",
      phone: "Phone",
      email: "Email",
      people: "People",
      meetDate: "Date",
      meetTime: "Pick-up Time",
      meetAddress: "Pickup Address",
      returnAddress: "Drop-off Address",
      requests: "Requests",
      required: "*",
      namePlaceholder: "John Doe",
      phonePlaceholder: "Enter numbers only (no hyphens)",
      emailPlaceholder: "example@email.com",
      peoplePlaceholder: "Select number of people",
      meetAddressPlaceholder: "Enter exact hotel name or address",
      returnAddressPlaceholder: "Enter exact hotel name or address",
      requestsPlaceholder:
        "Please enter any special requirements such as dietary restrictions or allergies",
      totalAmount: "Total Amount",
      inquiry: "Contact for pricing",
      agreeAll: "I agree to all terms and conditions below.",
      agreeService: "Mallangtrip Tour Service Terms",
      agreeTravel: "Mallangtrip Tour Domestic Travel Standard Terms",
      agreePrivacy: "Privacy Collection and Use Agreement",
      agreeThirdparty: "Third Party Information Sharing Agreement",
      requiredLabel: "[Required]",
      submitButton: "Proceed to Payment",
      submitting: "Processing payment...",
      requiredNotice: "indicates required fields",
      directInput: "Custom input",
      // Validation messages
      validation: {
        nameRequired: "Please enter your name.",
        phoneRequired: "Please enter your phone number.",
        phonePrefixInvalid:
          "Please enter country code in '+number' format. Example: +82",
        emailRequired: "Please enter your email.",
        peopleRequired: "Please select number of people.",
        dateRequired: "Please select meeting date.",
        timeRequired: "Please select pickup time.",
        meetAddressRequired: "Please enter pickup address.",
        returnAddressRequired: "Please enter drop-off address.",
        agreeServiceRequired: "Please agree to the Service Terms.",
        agreeTravelRequired: "Please agree to the Travel Standard Terms.",
        agreePrivacyRequired: "Please agree to Privacy Collection and Use.",
        agreeThirdpartyRequired:
          "Please agree to Third Party Information Sharing.",
      },
      // Toast messages
      toast: {
        validationError: "Please check your input information.",
        reservationSuccess: "Reservation completed!",
        reservationSuccessDesc:
          "Your reservation has been created after payment confirmation.",
        paymentFailed: "Payment failed.",
        paymentFailedDesc: "Please try again.",
        paymentError: "An error occurred while processing payment.",
        paymentErrorDesc:
          "If the problem persists, please contact customer service.",
        paymentConfirmFailed: "Payment confirmation failed.",
        paymentConfirmFailedDesc: "Please try again later.",
        paymentCancelled: "Payment was cancelled or window was closed.",
        paymentWindowOpened:
          "Payment window opened. Please complete the payment.",
        groupContactRequired:
          "For groups of 9 or more, please contact customer service.",
        groupContactPhone: "Tel: +82-507-1344-4159",
        invalidPaymentInfo: "Payment preparation information is invalid.",
        reservationError: "An error occurred while processing reservation.",
        reservationConflict:
          "Active reservation already exists or reservation is unavailable.",
        destinationNotFound: "Destination not found.",
      },
    },
  },
};

export default common;
