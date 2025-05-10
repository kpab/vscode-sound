import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// プレイヤーのセットアップ
// OSごとに適切なプレイヤーを使用
let playerOptions: any = {};
if (process.platform === 'darwin') {
    // Macの場合はafplayを使用
    playerOptions.player = 'afplay';
} else if (process.platform === 'win32') {
    // Windowsの場合はpowershellを使用
    playerOptions.player = 'powershell';
    playerOptions.cmd = ['New-Object System.Media.SoundPlayer \"$FILE\"; $player.PlaySync();'];
} else {
    // Linuxなどその他の場合
    playerOptions.player = 'play';
}

const player = require('play-sound')(playerOptions);

// 最後のキー押下時間を追跡
const lastKeyPressTime: Record<string, number> = {};

// サウンドパスの設定
let soundsPath: string;
// 設定項目
let enabled: boolean;
let volume: number;
let keyCooldown: number;
let specialKeys: Record<string, boolean>;

export function activate(context: vscode.ExtensionContext) {
    console.log('VSCode Typing Sound extension is now active!');

    // 設定の読み込み
    loadConfiguration();

    // 設定変更時のイベントハンドラー
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('typingSound')) {
                loadConfiguration();
            }
        })
    );

    // キーボードイベントのリスナーを登録
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(handleTextDocumentChange)
    );

    // コマンド登録
    context.subscriptions.push(
        vscode.commands.registerCommand('typingSound.toggle', () => {
            const config = vscode.workspace.getConfiguration('typingSound');
            config.update('enabled', !enabled, true);
        })
    );

    // 初期サウンドパスの設定
    updateSoundPath(context);
}

function loadConfiguration() {
    const config = vscode.workspace.getConfiguration('typingSound');
    enabled = config.get('enabled', true);
    volume = config.get('volume', 50);
    keyCooldown = config.get('keyCooldown', 50);
    specialKeys = config.get('specialKeys', {
        'Enter': true,
        'Tab': true,
        'Space': true,
        'Backspace': true
    });
}

function updateSoundPath(context: vscode.ExtensionContext) {
    // 拡張機能に付属のサウンドフォルダ
    soundsPath = path.join(context.extensionPath, 'media', 'sounds');
}

function handleTextDocumentChange(event: vscode.TextDocumentChangeEvent) {
    if (!enabled) return;

    const now = Date.now();
    const changes = event.contentChanges;

    for (const change of changes) {
        const text = change.text;

        // 入力されたテキストに基づいてサウンドを再生
        if (text) {
            if (text === '\n' || text === '\r\n') {
                playKeySound('Enter', now);
            } else if (text === '\t') {
                playKeySound('Tab', now);
            } else if (text === ' ') {
                playKeySound('Space', now);
            } else if (text.length === 1) {
                // 通常のキー入力
                playKeySound('default', now);
            }
        } else if (change.rangeLength > 0 && change.rangeLength <= 2) {
            // 削除操作（Backspaceなど）
            playKeySound('Backspace', now);
        }
    }
}

function playKeySound(keyType: string, timestamp: number) {
    // クールダウンチェック
    if (keyCooldown > 0) {
        const lastTime = lastKeyPressTime[keyType] || 0;
        if (timestamp - lastTime < keyCooldown) {
            return; // クールダウン中なのでスキップ
        }
    }

    // 最終押下時間を更新
    lastKeyPressTime[keyType] = timestamp;

    // キータイプに応じたサウンドファイルを選択
    let soundFile = 'key-press.mp3'; // デフォルト
    
    if (specialKeys[keyType] && keyType !== 'default') {
        const specificFile = `${keyType.toLowerCase()}.mp3`;
        const specificPath = path.join(soundsPath, specificFile);
        
        // 特定キー用のサウンドファイルが存在するか確認
        if (fs.existsSync(specificPath)) {
            soundFile = specificFile;
        }
    }

    // 音量調整（0-100の範囲）
    let playerArgs: string[] = [];
    
    if (process.platform === 'darwin') {
        // Macの場合はafplayの-vオプションで音量指定（0.0～1.0）
        const volumeLevel = volume / 100;
        playerArgs = ['-v', volumeLevel.toString()];
    } else if (process.platform === 'win32') {
        // Windowsの場合は音量調整が必要ならばここに実装
        // PowerShellでは直接音量制御が難しいので、必要に応じて別の方法を検討
    }

    const soundPath = path.join(soundsPath, soundFile);

    // ファイルの存在確認
    if (fs.existsSync(soundPath)) {
        player.play(soundPath, { [process.platform === 'darwin' ? 'afplay' : process.platform === 'win32' ? 'powershell' : 'play']: playerArgs }, (err: any) => {
            if (err) {
                console.error('Error playing sound:', err);
            }
        });
    } else {
        console.warn(`Sound file not found: ${soundPath}`);
    }
}

export function deactivate() {
    // 拡張機能の終了時に必要な処理があればここに
}
