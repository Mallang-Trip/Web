const my = {
  metadata: {
    title: "My Page",
  },
  profile: {
    metadata: {
      title: "Account Deletion",
    },
    title: "Account Deletion",
    phoneNumber: "Phone Number",
    notice: {
      title: "Account Deletion Notice",
      items: [
        "All your personal information will be deleted upon account deletion.",
        "You can re-register with the same phone number after deletion.",
        "If you have ongoing reservations, please complete or cancel them before deleting your account.",
        "After deletion, you will not be able to view your previous reservation history.",
        "Deleted accounts cannot be recovered. Please make your decision carefully.",
      ],
    },
    buttons: {
      cancel: "Cancel",
      withdraw: "Delete Account",
    },
    dialog: {
      title: "Are you sure you want to delete your account?",
      description:
        "All your information will be permanently deleted and cannot be recovered. Do you want to proceed?",
      cancel: "No",
      confirm: "Yes, Delete Account",
    },
    toast: {
      success: "Account deleted successfully.",
      error: "An error occurred while deleting your account.",
      tryAgain: "Please try again later.",
    },
    loading: "Processing deletion...",
  },
};

export default my;
