function HashTag({ title }) {
  return (
    <div className="rounded-full w-12 h-6 md:w-[74px] md:h-[30px] border border-primary text-xs md:text-sm text-primary flex justify-center items-center">
      {title}
    </div>
  );
}

export default HashTag;
