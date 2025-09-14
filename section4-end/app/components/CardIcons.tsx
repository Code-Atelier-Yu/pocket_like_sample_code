import { FaRegHeart, FaArchive } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Article } from "../generated/prisma";
import toggleLike from "../actions/articles/toggle-like";

type CardIconsProps = {
  articleData: Article;
};

function CardIcons() {
  return (
    <div className="flex justify-start md:justify-between gap-5 items-center text-xl">
      {/* お気に入りボタン */}
      <FaRegHeart />

      {/* アーカイブボタン */}
      <FaArchive />

      {/* デリートボタン */}
      <FaRegTrashCan />
    </div>
  );
}

export default CardIcons;
