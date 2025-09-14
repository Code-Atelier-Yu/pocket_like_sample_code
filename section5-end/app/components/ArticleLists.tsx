import { getArticles } from "../actions/articles/get-articles";
import ArticleCard from "./ArticleCard";

async function ArticleLists() {
  const articlesData = await getArticles();

  if (!articlesData) {
    return (
      <div className="w-full text-center">データを取得できませんでした</div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 px-4">
      {/* タイトル */}
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">記事一覧</h2>
      </div>

      <hr />

      <div className="p-4 flex flex-col gap-4">
        {articlesData.map((articleData) => (
          <ArticleCard key={articleData.id} articleData={articleData} />
        ))}
      </div>
    </div>
  );
}

export default ArticleLists;
