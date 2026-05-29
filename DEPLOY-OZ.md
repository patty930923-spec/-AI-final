# 清大 OZ 上線指南（給所有人使用）

你的 App 網址會是：

```text
http://oz.nthu.edu.tw/~你的帳號/
```

（系統讀取 `~/WWW/index.html`）

---

## 架構說明（為什麼要兩邊）

| 位置 | 角色 | 訪客需要 API Key？ |
|------|------|-------------------|
| **OZ** | 介面（HTML/CSS/JS） | 否 |
| **Vercel** | AI 後端代理（你的 Key 放這） | 否 |

- 每位訪客的**日記、打卡**存在自己瀏覽器，互不影響。
- **AI 費用**由你在 OpenAI 後台承擔 → 請設**用量上限**，避免被濫用。
- **絕對不要**把 `sk-...` 寫進上傳 OZ 的檔案。

---

## 第一步：部署 Vercel API（只做一次）

1. 將 `人社AI` 推到 GitHub（不要 push `.env`）
2. [vercel.com](https://vercel.com) → **Add New Project** → Import 此 repo → Deploy
3. **Settings → Environment Variables** 新增：

   | 名稱 | 值 |
   |------|-----|
   | `OPENAI_API_KEY` | 你的 `sk-...` |
   | `OPENAI_MODEL` | `gpt-4o-mini`（選填） |
   | `ALLOWED_ORIGINS` | `http://oz.nthu.edu.tw` |

4. 記下網址，例如：`https://the-oasis-xxx.vercel.app`

5. 到 [OpenAI Usage limits](https://platform.openai.com/settings/organization/limits) 設**每月預算上限**（建議期末 demo 設低一點）

6. **Redeploy** 一次（改 env 後要重新部署）

---

## 第二步：準備要上傳 OZ 的檔案

在專案目錄執行：

```bash
bash scripts/prepare-oz.sh
```

會產生 `deploy/oz/` 資料夾，內含 4 個檔案。

編輯 **`deploy/oz/config.js`**，把 `apiBase` 改成你的 Vercel 網址：

```javascript
window.OASIS_CONFIG = {
  apiBase: "https://the-oasis-xxx.vercel.app",
};
```

（不要加結尾 `/`）

---

## 第三步：FTP 上傳到 OZ

1. 用學校提供的 **FTP** 連線（主機請依資訊中心說明，常見為 `oz.nthu.edu.tw` 或校內主機）
2. 進入你帳號下的 **`WWW`** 目錄（若沒有請先建立）
3. 上傳 `deploy/oz/` 裡這 **4 個檔案**（可覆蓋舊的）：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`

4. 瀏覽器開啟：`http://oz.nthu.edu.tw/~你的帳號/`

5. 到 App **個人** 頁，應顯示 **「AI 伺服器：已就緒」**

---

## 給同學／訪客的使用方式

把 OZ 網址貼給大家即可，例如：

```text
http://oz.nthu.edu.tw/~g9700001/
```

他們：

- 不需註冊、不需 API Key
- 日記與資料只存在**自己的電腦瀏覽器**
- 換電腦或清除瀏覽資料會看不到舊日記（可在報告中說明為隱私設計）

---

## 常見問題

### 個人頁顯示「無法連線 API」

- `config.js` 的 `apiBase` 是否正確
- Vercel 是否已 Redeploy
- 是否用 `http://oz.nthu.edu.tw/~帳號/` 開啟（不要用本機 `file://`）

### CORS 錯誤

確認 Vercel 有設：`ALLOWED_ORIGINS=http://oz.nthu.edu.tw`

### 更新網頁

改完程式後：

1. 再跑 `bash scripts/prepare-oz.sh`
2. 改好 `deploy/oz/config.js`
3. FTP 覆蓋上傳 4 個檔案

API 邏輯若改動：push GitHub → Vercel 會自動重新部署。

---

## 期末報告可寫的一句

> 原型部署於清華 OZ 學生個人網頁空間，供公開試用；生成式 AI 透過獨立後端代理呼叫 OpenAI，API 金鑰不暴露於客戶端，訪客無需自行申請金鑰即可體驗（由開發者於伺服器端設定用量上限）。
