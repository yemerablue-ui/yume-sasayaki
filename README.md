# ユメササヤキ — 夢誘導リーダー (PWA)

入眠タイミングに合わせて指定した文章を読み聞かせ、夢の内容に影響を与えることを狙うPWA(Progressive Web App)です。

## ファイル構成

```
yume-sasayaki/
├── index.html      # アプリ本体
├── manifest.json   # PWAマニフェスト(アプリ名・アイコン定義)
├── sw.js           # Service Worker(オフライン対応)
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-512-maskable.png
    └── apple-touch-icon.png
```

## 公開手順 (GitHub Pages・無料)

PWAの動作には **HTTPSでの配信が必須** です(Service Workerの仕様)。
ファイルをAirDropで送るだけでは PWA としては動かない点に注意してください。

1. GitHubに新しいリポジトリを作成する(例: `yume-sasayaki`、Publicにする)
2. このフォルダの中身をすべてリポジトリにpushする

   ```bash
   cd yume-sasayaki
   git init
   git add .
   git commit -m "ユメササヤキ PWA 初版"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/yume-sasayaki.git
   git push -u origin main
   ```

3. リポジトリの **Settings > Pages** を開く
4. 「Source」を **Deploy from a branch**、Branchを **main / (root)** にして保存
5. 数分待つと `https://<ユーザー名>.github.io/yume-sasayaki/` で公開される

## iPhoneでのインストール手順

1. 公開URLを **Safari** で開く(Chromeでは「ホーム画面に追加」がPWAとして動作しません)
2. 共有ボタン(□に↑)をタップ
3. **「ホーム画面に追加」** を選択
4. ホーム画面に月のアイコンが追加され、タップすると全画面アプリとして起動します

## 使い方

1. Sleep A20(または任意のBluetoothイヤホン)をiPhoneに接続
2. 夢に見たい情景を「二人称・現在形」で入力(例:「あなたは空を飛んでいます」)
3. 入眠待ち時間(初期値20分)・繰り返し間隔・回数を設定
4. 「テスト再生」で音量と声を確認(小さめ推奨)
5. 「おやすみを開始する」をタップ → iPhoneを充電器につなぎ、画面を上にして就寝

設定と文章は自動保存され、次回起動時に復元されます。

## 注意事項(iOSの制約)

- **画面は点灯したままにする必要があります。** iOSはロック中・バックグラウンドでJavaScriptを停止するためです。アプリがWake Lock(iOS 16.4+)で自動ロックを防ぎますが、効かない場合は「設定 > 画面表示と明るさ > 自動ロック > なし」にしてください。画面の明るさは最低まで下げてOKです。
- 声の品質を上げたい場合は「設定 > アクセシビリティ > 読み上げコンテンツ > 声 > 日本語」から拡張音声(Kyoko 拡張など)をダウンロードしてください。
- おやすみモード(集中モード)はWebアプリの動作には影響しませんが、メディア音量は適切に設定しておいてください。

## 技術スタック・参考ドキュメント

- PWA全般: https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps
- Web App Manifest: https://developer.mozilla.org/ja/docs/Web/Manifest
- Service Worker API: https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API
- Web Speech API(音声合成): https://developer.mozilla.org/ja/docs/Web/API/SpeechSynthesis
- Screen Wake Lock API: https://developer.mozilla.org/ja/docs/Web/API/Screen_Wake_Lock_API
- GitHub Pages: https://docs.github.com/ja/pages/getting-started-with-github-pages
