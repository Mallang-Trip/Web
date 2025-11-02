const result = {
  metadata: {
    title: "My Reservations",
  },
  // Page loading
  loading: {
    preparing: "Preparing reservation information...",
    fetching: "Loading reservation information...",
    general: "Loading...",
    canceling: "Canceling...",
    saving: "Saving...",
    issuing: "Issuing...",
  },

  // Reservation info card
  reservationInfo: {
    title: "Reservation Information",
    canceled: "Canceled",
    tourName: "Tour Name",
    booker: "Booked by",
    phone: "Phone Number",
    participants: "Participants",
    people: "",
    tourDate: "Tour Date",
    pickupLocation: "Pickup Location",
    dropLocation: "Drop-off Location",
    requests: "Special Requests",
    tourFee: "Tour Fee",
    noRequests: "-",
  },

  // Driver info card
  driverInfo: {
    title: "Assigned Driver",
    vehicleNumber: "Vehicle Number",
    phoneNumber: "Phone Number",
    phoneCopied: "Phone number copied.",
    copyFailed: "Failed to copy.",
    vehiclePhotos: "Vehicle Photos",
    photoCount: "",
    vehicleImage: "Vehicle Image",
    copyPhone: "Copy phone number",
    breweries: "Brewery Visits",
    breweriesCount: "",
    notAssigned: "Driver Not Assigned Yet",
    notAssignedDesc:
      "A driver will be assigned once your reservation is confirmed.",
    notAssignedCanceledDesc:
      "Your reservation has been canceled. No driver has been assigned.",
  },

  // Payment info card
  paymentInfo: {
    title: "Payment Information",
    status: "Payment Status",
    approvalDate: "Approved At",
    refundDate: "Refunded At",
    paymentMethod: "Payment Method",
    paymentAmount: "Payment Amount",
    card: "Card",
    issueStatement: "Issue Transaction Statement",
    issueCancellation: "Issue Cancellation Receipt",
    statementTitle: "Transaction Statement",
    cancellationTitle: "Cancellation Receipt",
    downloadPdf: "Download Transaction Statement PDF",
    downloadCancellationPdf: "Download Cancellation Receipt PDF",
    onsitePaymentTitle: "Additional Payment Notice",
    onsitePaymentDesc:
      "Any additional costs for extra services (such as additional pickup/drop-off locations) beyond the base tour fee will be communicated separately by MallangTrip via email and phone before your reservation is confirmed.",
    statusCompleted: "Payment Completed",
    statusRefunded: "Refunded",
    statusPending: "Pending Approval",
  },

  // Transaction statement
  transactionStatement: {
    errorLoading: "Failed to load transaction statement.",
    invoiceNo: "Invoice No.",
    date: "Date",
    to: "To",
    dear: "Mr.",
    supplier: "Supplier",
    customer: "Customer",
    businessName: "Company Name",
    businessNumber: "Business Registration No.",
    representative: "CEO",
    address: "Address",
    contact: "Contact",
    email: "Email",
    bookerName: "Name",
    passengers: "No. of Passengers",
    peopleCount: "",
    totalAmount: "Total Amount",
    transactionDetails: "Transaction Details",
    transactionDate: "Date",
    itemName: "Item",
    specification: "Description (Tour Date)",
    quantity: "Qty",
    pricePerPerson: "Price per Person",
    supplyAmount: "Amount",
    taxAmount: "Tax",
    total: "Total",
    remarks: "Remarks",
    inclusions: "1. Inclusions:",
    inclusionsList: {
      vehicle: "Private vehicle and professional driver (Door-to-Door service)",
      fuel: "All fuel, parking, and toll fees",
      // guide: "Professional English-speaking guide service",
      brewery:
        "Tour and experience fees for 2 curated breweries by Mallangtrip (tasting included)",
      // water: "Bottled water in the vehicle",
      lunch: "Lunch",
    },
    exclusions: "2. Exclusions:",
    exclusionsList: {
      meals: "All meal expenses (lunch, dinner, etc.)",
      lunch: "Lunch included, dinner not included",
      personal: "Personal expenses and traveler's insurance",
      additional:
        "Additional moving costs outside the guided pickup/drop-off areas",
    },
    paymentInformation: "3. Payment Information:",
    paymentMethod: "Payment Method: Credit Card",
    paymentDateTime: "Date of Payment:",
    cancellationPolicy: "4. Cancellation & Refund Policy:",
    cancellationList: {
      fullRefund: "Cancellation 4 days prior to the tour date: Full refund",
      noRefund:
        "Cancellation from 3 days prior to the tour date: Non-refundable",
    },
    confirmation: "This statement confirms the transaction detailed above.",
    companyName: "Mallangtrip",
    supplierInfo: {
      businessName: "Mallangtrip",
      businessNumber: "399-51-00784",
      representative: "Jeyoon Kim",
      address:
        "#310, 11-41, Simin-daero 327beon-gil, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea",
      contact: "+82-507-1344-4159",
      email: "mallangtrip@mallangtrip.com",
    },
  },

  // Cancellation receipt
  cancellationReceipt: {
    errorLoading: "Failed to load cancellation receipt.",
    documentNo: "Document No.",
    issueDate: "Issue Date",
    supplier: "Supplier",
    businessName: "Company Name",
    businessNumber: "Business Registration No.",
    representative: "CEO",
    address: "Address",
    contact: "Contact",
    email: "Email",
    cancellationDetails: "Cancellation Details",
    reservationNumber: "Reservation No.",
    productName: "Product Name",
    tourDate: "Tour Date",
    canceledDate: "Canceled Date",
    totalPaymentAmount: "Total Payment Amount",
    refundInfo: "Refund Information",
    refundAmount: "Refund Amount",
    refundPercentage: "Refund Rate",
    refundProcessDate: "Refund Process Date",
    refundPolicy: "Refund Policy",
    confirmation: "This confirms that the reservation has been canceled as above.",
    companyName: "Mallangtrip",
    supplierInfo: {
      businessName: "Mallangtrip",
      businessNumber: "399-51-00784",
      representative: "Jeyoon Kim",
      address:
        "#310, 11-41, Simin-daero 327beon-gil, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea",
      contact: "+82-507-1344-4159",
      email: "mallangtrip@mallangtrip.com",
    },
  },

  // Reservation actions
  actions: {
    cancel: "Cancel Reservation",
    edit: "Edit Reservation",
    viewAllReservations: "View All My Reservations",
    cancelDialogTitle: "Cancel this reservation?",
    cancelDialogDesc: "Are you sure you want to cancel this reservation?",
    cancelDialogWarning: "Canceled reservations cannot be restored.",
    cancelDialogNo: "No",
    cancelDialogYes: "Cancel Reservation",
    authRequiredTitle: "Phone Verification Required",
    authRequiredDesc:
      "You need to log in (phone verification) to proceed. Continue?",
    authRequiredNo: "No",
    authRequiredYes: "Yes, Continue",
  },

  // Edit dialog
  editDialog: {
    title: "Edit Reservation Information",
    pendingOnly: "Can only edit while in pending status.",
    pendingOnlyFull: "Can only edit while in PENDING status.",
    reservationName: "Reservation Name",
    meetingDate: "Meeting Date",
    meetingTime: "Meeting Time",
    participants: "Participants",
    participantPlaceholder: "Select number of participants",
    people2: "2 people",
    people3: "3 people",
    people4: "4 people",
    people5: "5 people",
    people6: "6 people",
    people7: "7 people",
    people8: "8 people",
    people9Plus: "9+ people (Contact us)",
    totalAmount: "Total Amount ($)",
    pickupAddress: "Pickup Address",
    returnAddress: "Return Address",
    requests: "Special Requests",
    cancel: "Cancel",
    save: "Save",
    saving: "Saving...",
    groupContactError:
      "For groups of 9 or more, please contact customer service.",
    updateSuccess: "Reservation updated successfully.",
    updateError: "Failed to update reservation.",
    notFound: "Reservation not found.",
    cannotModify: "Cannot modify in current status.",
    tryAgain: "Please try again later.",
  },

  // Reservation list drawer
  listDrawer: {
    title: "My Reservations",
    description: "View your reservation history and select for details.",
    empty: "No reservations found",
    emptyDesc: "Book a new trip today!",
    canceled: "Canceled",
    paymentDate: "Payment Date:",
    meetingPlace: "Meeting Place:",
    dropPlace: "Drop-off Place:",
  },

  // Not Found
  notFound: {
    title: "Reservation Not Found",
    noReservations: "You have no reservations yet. Book a new trip today!",
    invalidAccess: "Invalid reservation ID or you do not have access.",
    viewReservations: "View My Reservations",
    goHome: "Go to Home",
  },

  // Reservation hero
  hero: {
    reservationDate: "Reservation Date:",
    cancelDate: "Canceled At:",
    statusBadgeLabel: "Status",
    receiptMessage: {
      pending: "Reservation information has been sent to your email.",
      approved: "Your reservation has been approved. Please check your email.",
      rejected:
        "Your reservation has been rejected. Please check your email for details.",
      canceled:
        "Your reservation has been canceled. Please check your email for refund information.",
      default: "Reservation information has been sent to your email.",
    },
  },

  // Toast messages
  toast: {
    cancelSuccess: "Reservation canceled successfully.",
    cancelSuccessDesc:
      "Canceled reservations can be viewed in your reservation history.",
    cancelError: "An error occurred while canceling.",
    noPermission: "You do not have permission to cancel.",
    notFound: "Reservation not found.",
    cannotCancel: "Cannot cancel in current status.",
    tryAgain: "Please try again later.",
  },

  // Reservation status
  status: {
    pending: {
      title: "🎉 Reservation Request Submitted!",
      label: "Pending Confirmation",
      message:
        "We will confirm your reservation within 24 hours (business days).",
    },
    approved: {
      title: "✅ Reservation Approved",
      label: "Approved",
      message: "Your reservation has been approved.",
    },
    rejected: {
      title: "❌ Reservation Rejected",
      label: "Rejected",
      message:
        "Your reservation has been rejected. Payment will be refunded within 3 business days.",
    },
    canceled: {
      title: "❌ Reservation Canceled",
      label: "Canceled",
      message:
        "Your reservation has been canceled. Payment will be refunded within 3 business days.",
    },
    default: {
      title: "🎉 Reservation Status",
      label: "Status",
      message: "Have a great trip!",
    },
  },
};

export default result;
