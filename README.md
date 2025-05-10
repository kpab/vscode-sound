# VSCode Typing Sound

[English](#english) | [日本語](#japanese)

<a id="english"></a>
## English

A VSCode extension that plays satisfying mechanical keyboard sounds while typing.

### Features

- Pleasant mechanical keyboard sounds during normal typing
- Custom sound effects for special keys such as Enter, Tab, Space, and Backspace
- Volume adjustment
- Anti-key-repeat protection (prevents sound flooding when holding down keys)

### Settings

This extension supports the following settings:

* `typingSound.enabled`: Enable or disable typing sounds
* `typingSound.volume`: Sound volume (0-100)
* `typingSound.keyCooldown`: Minimum interval between sounds for the same key (milliseconds)
* `typingSound.specialKeys`: Enable/disable specific special key sounds

### Commands

* `typingSound.toggle`: Toggle typing sounds on/off

### Supported Platforms

- Windows
- macOS
- Linux (requires a Sound Player installation)

### Installation

You can install this extension from the VSCode Extension Marketplace by searching for "VSCode Typing Sound".

---

<a id="japanese"></a>
## 日本語

タイピング時に気持ちの良いメカニカルキーボードの効果音を鳴らすVSCode拡張機能です。

### 機能

- 通常のタイピング時に心地よいメカニカルキーボード音を再生
- エンター、タブ、スペース、バックスペースなどの特殊キーに独自の効果音
- 音量調整機能
- 長押し対策（キーリピート検出）

### 設定オプション

この拡張機能は以下の設定をサポートしています：

* `typingSound.enabled`: 効果音を有効/無効にする
* `typingSound.volume`: 音量（0-100）
* `typingSound.keyCooldown`: 同一キーの再生間隔（ミリ秒）
* `typingSound.specialKeys`: 特殊キーの有効/無効設定

### コマンド

* `typingSound.toggle`: タイピング効果音のオン/オフを切り替え

### 対応プラットフォーム

- Windows
- macOS
- Linux (要Sound Playerのインストール)

### インストール

VSCodeの拡張機能マーケットプレイスから「VSCode Typing Sound」を検索してインストールできます。

## Required Sound Files / 必要な音源ファイル

Place the following MP3 files in the `media/sounds/` folder:  
以下のMP3ファイルを `media/sounds/` フォルダに配置してください：

- `key-press.mp3` - Normal key typing sound / 通常のキー入力音
- `enter.mp3` - Enter key sound effect / Enterキー用効果音
- `tab.mp3` - Tab key sound effect / Tabキー用効果音
- `space.mp3` - Space key sound effect / スペースキー用効果音
- `backspace.mp3` - Backspace key sound effect / Backspaceキー用効果音

## License / ライセンス

MIT

## Author / 作者

kpab