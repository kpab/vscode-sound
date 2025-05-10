# VSCode Typing Sound

タイピング時に気持ちの良いメカニカルキーボードの効果音を鳴らすVSCode拡張機能です。

## 機能

- 通常のタイピング時に心地よいメカニカルキーボード音を再生
- エンター、タブ、スペース、バックスペースなどの特殊キーに独自の効果音
- 音量調整機能
- 長押し対策（キーリピート検出）

## 設定オプション

この拡張機能は以下の設定をサポートしています：

* `typingSound.enabled`: 効果音を有効/無効にする
* `typingSound.volume`: 音量（0-100）
* `typingSound.keyCooldown`: 同一キーの再生間隔（ミリ秒）
* `typingSound.specialKeys`: 特殊キーの有効/無効設定

## コマンド

* `typingSound.toggle`: タイピング効果音のオン/オフを切り替え

## 対応プラットフォーム

- Windows
- macOS
- Linux (要Sound Playerのインストール)

## 必要な音源ファイル

mediaフォルダの中のsoundsフォルダに以下のMP3ファイルを配置します：

- `key-press.mp3` - 通常のキー入力音
- `enter.mp3` - Enterキー用効果音
- `tab.mp3` - Tabキー用効果音
- `space.mp3` - スペースキー用効果音
- `backspace.mp3` - Backspaceキー用効果音

## インストール

VSCodeの拡張機能マーケットプレイスから「VSCode Typing Sound」を検索してインストールできます。

## 開発

### 前提条件

- Node.js
- npm または yarn

### 開発環境の準備

```bash
npm install
```

### デバッグ実行

VSCodeでF5キーを押すとデバッグ実行できます。

### パッケージ化

```bash
npm run package
```

## ライセンス

MIT

## 作者

Your Name