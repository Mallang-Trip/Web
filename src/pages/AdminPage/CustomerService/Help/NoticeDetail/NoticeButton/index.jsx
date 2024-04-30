function NoticeButton({ announcementId, type }) {
  return (
    <div className="flex justify-end items-center gap-4 mt-10 mb-4">
      <button className="px-6 py-2.5 text-sm text-darkgray font-bold bg-white border border-mediumgray hover:border-[#ff0000] hover:text-[#ff0000] rounded-lg">
        삭제
      </button>
      <button className="px-6 py-2.5 text-sm text-darkgray font-bold bg-white border border-mediumgray hover:border-primary hover:text-primary rounded-lg">
        수정
      </button>
    </div>
  );
}

export default NoticeButton;
