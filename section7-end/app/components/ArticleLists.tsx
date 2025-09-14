import { getArticles } from "../actions/articles/get-articles";
import ArticleCard from "./ArticleCard";
import { getWhereCondition } from "@/lib/getWhereCondition";
import { getPageTitle } from "@/lib/getPageTitle";

interface ArticleListsProps {
  params: {
    listtype?: string;
  }
}

async function ArticleLists({params}: ArticleListsProps) {
  const listtype = params.listtype || "default";
  const userId = "temp-user-123";
  const whereCondition = getWhereCondition(listtype, userId);

  const articlesData = await getArticles(whereCondition);

  const pageTitle = getPageTitle(listtype);

  if (!articlesData) {
    return (
      <div className="w-full text-center">データを取得できませんでした</div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 px-4">
      {/* タイトル */}
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
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
