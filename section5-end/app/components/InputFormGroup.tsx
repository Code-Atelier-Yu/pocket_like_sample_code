import { useEffect, useState } from "react";
import { extractUrlData } from "../actions/articles/extract-url-data";
import { saveArticle } from "../actions/articles/save-article";
import FormMessage from "./FormMessage";
import { urlRegistrationSchema } from "@/lib/validations/urlRegistrationSchema";

function InputFormGroup() {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInput = async (formData: FormData) => {
    try {
      const url = formData.get("url") as string;
      const validationResult = urlRegistrationSchema.safeParse({ url });

      if(!validationResult.success) {
        const errorMessage = validationResult.error.issues
          .map((issue) => issue.message)
          .join(",");

          setError(errorMessage);
          return;
      }

      const articleData = await extractUrlData(formData);

      if (!articleData) {
        return;
      }

      // サーバーアクションを使ってDBに保存する処理をかければいい
      const userId = "temp-user-123";
      const result = await saveArticle(articleData, userId);

      if (!result.success) {
        setError(result.errorMessage || "予期しないエラーが発生しました");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-3 w-3/5 items-center relative">
      <div className="flex gap-3 items-center w-full">
        {/* インプットフォーム */}
        <form
          action={handleInput}
          className="flex gap-3 flex-1"
        >
          <input
            type="text"
            name="url"
            placeholder="例：https://example.com/article"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            className="hidden md:block w-28 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            登録
          </button>
        </form>
      </div>

      {error && <FormMessage error={error} />}
    </div>
  );
}

export default InputFormGroup;
