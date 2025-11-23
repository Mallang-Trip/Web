const admin = {
  metadata: {
    title: "Admin",
  },
  // Page title
  pageTitle: "Admin - Reservation Management",

  // Pagination
  pagination: {
    total: "Total {{count}} items",
    loading: "Loading...",
    page: "Page {{number}}",
    previous: "Previous",
    next: "Next",
  },

  // Table headers
  table: {
    id: "ID",
    reservationName: "Reservation Name",
    reservedBy: "Reserved By",
    contact: "Contact",
    datetime: "Date/Time",
    pickupReturn: "Pickup/Return",
    amount: "Amount",
    status: "Status",
    action: "Action",
    noResults: "No results found.",
  },

  // Status
  status: {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELED: "CANCELED",
  },

  // Buttons
  button: {
    approve: "Approve",
    reject: "Reject",
    close: "Close",
    cancel: "Cancel",
    add: "Add",
    remove: "Remove",
    fileSelect: "Select File",
    processing: "Processing...",
  },

  // Detail dialog
  detail: {
    title: "Reservation Details",
    description: "View complete reservation information.",
    reservationId: "Reservation ID",
    reservationName: "Reservation Name",
    email: "Email",
    reservedBy: "Reserved By",
    contact: "Contact",
    people: "People",
    meetingTime: "Meeting Time",
    pickupAddress: "Pickup Address",
    returnAddress: "Return Address",
    requests: "Special Requests",
    amount: "Amount",
    status: "Status",
    createdAt: "Created At",
    requestedAt: "Requested At",
    approvedAt: "Approved At",
    rejectedAt: "Rejected At",
    canceledAt: "Canceled At",
    adminMemo: "Admin Memo",
  },

  // Approve dialog
  approve: {
    title: "Approve Reservation",
    description: "Please enter driver information and brewery details",
    adminMemo: "Admin Memo (Optional)",
    adminMemoPlaceholder: "Enter admin memo",
    driverInfo: "Driver Information",
    driverName: "Driver Name",
    driverNamePlaceholder: "Enter driver name",
    driverPhone: "Driver Phone",
    driverPhonePlaceholder: "Enter in format +821012345678",
    vehicleNumber: "Vehicle Number",
    vehicleNumberPlaceholder: "12가3456",
    vehicleImage: "Vehicle Image (Optional)",
    dragOrClick: "Drag images or click to upload",
    uploading: "Uploading...",
    breweryInfo: "Brewery Visit Information",
    addBrewery: "Add Brewery",
    breweryOrder: "Brewery #{{number}}",
    breweryName: "Brewery Name",
    breweryNamePlaceholder: "Brewery name",
    breweryAddress: "Brewery Address",
    breweryAddressPlaceholder: "Brewery address",
    noBreweries:
      "No brewery information. Click the add button to add a brewery.",
    required: "*",
  },

  // Reject dialog
  reject: {
    title: "Reject Reservation",
    description: "Rejection reason is required, admin memo is optional.",
    reason: "Rejection Reason",
    reasonRequired: "Rejection Reason *",
    adminMemo: "Admin Memo",
  },

  // Waiting screen
  waiting: {
    loadingData: "Loading data...",
    checkingAuth: "Checking authentication...",
  },

  // Toast messages
  toast: {
    // Success
    approveSuccess: "Reservation has been approved.",
    rejectSuccess: "Reservation has been rejected.",
    uploadSuccess: "{{count}} image(s) uploaded successfully.",

    // Errors
    driverNameRequired: "Please enter driver name.",
    driverPhoneRequired: "Please enter driver phone number.",
    vehicleNumberRequired: "Please enter vehicle number.",
    breweryInfoRequired: "Please enter name and address for all breweries.",
    rejectReasonRequired: "Please enter rejection reason.",
    notImageFile: "{{filename}} is not an image file.",
    uploadError: "An error occurred while uploading images.",

    // Approve failure
    approveFailed: "Failed to approve reservation",
    reservationNotFound: "Reservation not found.",
    cannotApprove: "Cannot approve in current status.",
    tryAgainLater: "Please try again later.",

    // Reject failure
    rejectFailed: "Failed to reject reservation",
    cannotReject: "Cannot reject in current status.",
  },

  // Not Found page
  notFound: {
    title: "Access Denied",
    description: "You do not have permission to access this page.",
    goHome: "Go to Home",
  },
};

export default admin;
