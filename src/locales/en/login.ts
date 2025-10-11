const login = {
  metadata: {
    title: "Login",
  },
  // Login page
  page: {
    title: "Login",
    description: "Please login with phone number verification.",
    loadingText: "Loading...",
  },
  // Phone number input
  phoneNumber: {
    label: "International Phone Number *",
    placeholder: "Enter digits only (no '-')",
    customInput: "Custom",
    customInputAriaLabel: "Enter country code directly",
    sendButton: "Send Code",
    sendingButton: "Sending...",
  },
  // OTP input
  otp: {
    label: "Verification Code",
    verifyButton: "Verify",
    verifyingButton: "Verifying...",
  },
  // Terms dialog
  termsDialog: {
    title: "Terms Agreement",
    description: "Please agree to the required terms below to use the service.",
    agreeAll: "I agree to all terms below.",
    required: "[Required]",
    confirmButton: "Agree and Continue",
    terms: {
      service: "MallangTrip Tour Service Terms",
      travel: "MallangTrip Tour Domestic Travel Standard Terms",
      privacy: "Personal Information Collection and Use Agreement",
      thirdparty: "Third Party Personal Information Provision Agreement",
    },
  },
  // Toast messages
  toast: {
    // Code sending
    invalidCountryCode:
      "Please enter country code in '+number' format. e.g.: +82",
    codeSent: "Verification code has been sent.",
    codeSendFailed: "Failed to Send Code",
    codeSendFailedDescription: "Failed to send verification code.",
    // Verification failed
    verificationFailed: "The verification code is incorrect.",
    verificationFailedDescription: "Please check again.",
    sessionNotFound:
      "Verification session not found. Please request a new code.",
    maxAttemptsExceeded:
      "Maximum attempts exceeded. Please request a new code.",
    codeNotMatch: "Verification code does not match. Please try again.",
    // New user
    firstTimeLogin: "This is your first login. Terms agreement is required.",
    // Login success
    verificationSuccess: "Verification completed.",
    verificationSuccessDescription: "Login successful.",
    // Terms agreement
    agreeToTerms: "Please agree to all terms.",
    agreeToTermsDescription: "Please check all [Required] items.",
    cannotFindLoginInfo: "Cannot find login information.",
    signupAndLoginSuccess: "Sign Up and Login Complete",
    signupAndLoginSuccessDescription:
      "Terms agreement completed and logged in.",
    // Other errors
    tokenError: "Cannot verify token information.",
  },
};

export default login;
