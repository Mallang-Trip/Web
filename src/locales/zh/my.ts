const my = {
  metadata: {
    title: "我的页面",
  },
  profile: {
    metadata: {
      title: "账户注销",
    },
    title: "账户注销",
    phoneNumber: "电话号码",
    notice: {
      title: "账户注销须知",
      items: [
        "注销账户后，您的所有个人信息将被删除。",
        "注销后可以使用相同的电话号码重新注册。",
        "如果您有正在进行的预订，请在完成或取消后再注销账户。",
        "注销后将无法查看以前的预订记录。",
        "已注销的账户无法恢复，请谨慎决定。",
      ],
    },
    buttons: {
      cancel: "取消",
      withdraw: "注销账户",
    },
    dialog: {
      title: "确定要注销账户吗？",
      description:
        "注销后所有信息将被永久删除且无法恢复。确定要继续吗？",
      cancel: "否",
      confirm: "是，注销账户",
    },
    toast: {
      success: "账户注销成功。",
      error: "注销账户时发生错误。",
      tryAgain: "请稍后重试。",
    },
    loading: "正在处理注销...",
  },
};

export default my;
