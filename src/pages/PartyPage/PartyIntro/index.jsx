function PartyIntro({ content }) {
  if (!content) return;
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">파티 소개</p>
      <p className="text-sm text-darkgray">{content}</p>
    </div>
  );
}

export default PartyIntro;
