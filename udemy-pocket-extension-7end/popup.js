document.addEventListener("DOMContentLoaded", async function () {
  const status = document.getElementById("status");
  const pageTitle = document.getElementById("pageTitle");

  try {
    // 現在のタブ情報を取得
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // ページタイトルを表示
    pageTitle.textContent = tab.title || "タイトルなし";

    // 記事保存処理を開始
    await saveCurrentPage(tab);
  } catch (error) {
    console.error("初期化エラー:", error);
    showStatus("エラーが発生しました", "error");
  }
});

// 現在のページを保存する関数
async function saveCurrentPage(tab) {
  try {
    showStatus("記事を保存中...", "loading");

    // 一時的なユーザーID（認証機能が実装されるまで使用）
    const tempUserId = "temp-user-123";

    // APIエンドポイントに送信
    const response = await fetch(`${API_BASE_URL}/api/save-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: tab.url,
        userId: tempUserId,
      }),
    });

    // レスポンスがJSONかどうかをチェック
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("APIエンドポイントが見つかりません");
    }

    const result = await response.json();

    if (response.ok && result.success) {
      showStatus("保存しました！", "success");

      // 3秒後にポップアップを閉じる
      setTimeout(() => {
        window.close();
      }, 3000);
    } else {
      throw new Error(result.error || "保存に失敗しました");
    }
  } catch (error) {
    console.error("保存エラー:", error);
    showStatus(error.message || "保存に失敗しました", "error");
  }
}

// ステータスメッセージを表示する関数
function showStatus(message, type) {
  const status = document.getElementById("status");
  status.innerHTML = message;
  status.className = `status ${type}`;
}
