# The Oasis（綠洲）

純前端 UI + **後端代理**呼叫 OpenAI。API Key 只放在伺服器環境變數，不進瀏覽器。

## 清大 OZ 公開給大家用（推薦給本作業）

請照 **[DEPLOY-OZ.md](./DEPLOY-OZ.md)** 操作：

1. Vercel 部署 API + 設 `OPENAI_API_KEY`
2. `bash scripts/prepare-oz.sh` → 編輯 `deploy/oz/config.js`
3. FTP 上傳 `deploy/oz/` 四個檔到 `~/WWW/`
4. 分享 `http://oz.nthu.edu.tw/~你的帳號/`

## 本機開發

```bash
cd "/Users/pattytung/Desktop/人社AI"
cp .env.example .env
# 編輯 .env，填入 OPENAI_API_KEY

npm install
npm start
```

瀏覽器開啟：http://localhost:3000

> 若用 `python3 -m http.server` 只開靜態檔，**沒有** `/api`，AI 會顯示離線。上線或本機測 AI 請用 `npm start`。

## 上網域（推薦做法）

### 方案 A：Vercel（免費、可綁自訂網域）

1. 將專案推到 GitHub（**不要** push `.env`）
2. 到 [vercel.com](https://vercel.com) → Import 此 repo
3. **Environment Variables** 新增：
   - `OPENAI_API_KEY` = 你的 `sk-...`
   - （選填）`OPENAI_MODEL` = `gpt-4o-mini`
4. Deploy 完成後會有 `xxx.vercel.app`
5. **Settings → Domains** 綁定自己的網域（依 DNS 指示設定 CNAME）

### 方案 B：Render（Node 伺服器）

1. [render.com](https://render.com) → New **Web Service** → 連 GitHub repo
2. Build: `npm install` · Start: `npm start`
3. Environment 新增 `OPENAI_API_KEY`
4. 在 Render 後台綁自訂網域

### 清大 OZ 學生個人網頁（`oz.nthu.edu.tw`）

OZ **只能放靜態檔**（FTP 上傳到 `~/WWW/`），**不能**跑 Node、也不能放 `.env`。

**建議：OZ + Vercel 雙軌**

| 位置 | 放什麼 |
|------|--------|
| `http://oz.nthu.edu.tw/~你的帳號/` | `index.html`、`styles.css`、`app.js`、`config.js` |
| Vercel（免費） | 僅 API（`api/chat.js`），環境變數設 `OPENAI_API_KEY` |

步驟：

1. Vercel 部署本 repo，設定 `OPENAI_API_KEY`  
2. 複製 `config.oz.example.js` → `config.js`，`apiBase` 改成你的 Vercel 網址  
3. FTP 上傳這 4 個檔到 `~/WWW/`  
4. （建議）Vercel 加環境變數：  
   `ALLOWED_ORIGINS=http://oz.nthu.edu.tw,https://oz.nthu.edu.tw`

**勿**把 API Key 寫進上傳到 OZ 的任何檔案。

若期末只需展示 UI、暫不做 AI：只上傳靜態檔即可，個人頁會顯示「無法連線 API」（正常）。

### 不建議

| 方式 | 原因 |
|------|------|
| 僅 GitHub Pages / 僅 OZ 卻要藏 Key | 只能放靜態檔，**無法**安全藏 API Key |
| 把 Key 寫進 `app.js` 再上傳 OZ | 任何人開原始碼都能看到 |
| 訪客在網頁輸入 Key | 公開網站不適合；金鑰屬於站方時應放伺服器 |

## API（給日後 AI 功能）

- `GET /api/status` → `{ configured: true/false }`
- `POST /api/chat` → body: `{ "messages": [{ "role": "user", "content": "..." }] }`

前端可呼叫 `window.oasisApi.chat(messages)`。
