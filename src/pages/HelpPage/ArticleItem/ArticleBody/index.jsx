import ImageBox from "../../../../components/ImageBox";

function ArticleBody({ createdAt, images, title, content }) {
  return (
    <div className="w-full px-6 pb-10 border-b border-mediumgray">
      <p className="mt-4 text-xs text-darkgray font-medium">
        작성일 {createdAt.slice(0, 10).replaceAll("-", ".")}
      </p>
      <div className="w-full mt-10 mb-5">
        <ImageBox images={images} name={title} />
      </div>
      <p className="text-sm text-black font-medium whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}

export default ArticleBody;
