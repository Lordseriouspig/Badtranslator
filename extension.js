const vscode = require('vscode');
const https = require('https');
let statusBarItem;

// Function to translate text using Google Translate API
function translateText(text, startingLang, targetLang) {
    // Construct the URL for the translation request
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${startingLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    // Send HTTP GET request to Google Translate API
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            // Collect response data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Parse JSON response and extract translated text
            res.on('end', () => {
                try {
                    const translatedText = JSON.parse(data)[0][0][0];
                    resolve(translatedText);
                } catch (error) {
                    reject(error.message);
                }
            });
        }).on('error', (error) => {
            reject(error.message);
        });
    });
}

// Function to replace the original text with translated text
function replaceText(editor, originalText, translatedText) {
    editor.edit(editBuilder => {
        editBuilder.replace(editor.selection, translatedText);
    });
}

// Function to generate a random language code
function getRandomLanguage() {
    const languages = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'];
    return languages[Math.floor(Math.random() * languages.length)];
}

// Function to show status message in status bar
function showStatusMessage(message) {
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        statusBarItem.color = 'yellow';
        statusBarItem.text = 'Bad Translator';
    }
    statusBarItem.text = message;
    statusBarItem.show();
}

// Function to hide status message in status bar
function hideStatusMessage() {
    if (statusBarItem) {
        statusBarItem.hide();
    }
}

// Function to handle command execution
async function translateTextCommand() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active editor found!");
        return;
    }

    let selection = editor.selection;
    let text = editor.document.getText(selection);

    // Get configuration settings
    const config = vscode.workspace.getConfiguration('badtranslator');
    const startLanguage = config.get('startLanguage');
    const endLanguage = config.get('endLanguage');
    const translationCount = config.get('translationCount');

    try {
        // Show status message
        showStatusMessage('Translating...');

        // Show progress bar
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Translating...",
            cancellable: false
        }, async (progress, token) => {
            // Initialize progress value
            progress.report({ increment: 0 });

            // Perform multiple translations
            let translatedText = text;
            for (let i = 0; i < translationCount; i++) {
                let targetLang = getRandomLanguage();
                translatedText = await translateText(translatedText, startLanguage, targetLang);
                // Update progress bar
                progress.report({ increment: (100 / translationCount) });
            }

            // Translate the final translated text to the configured end language
            let finalTranslatedText = await translateText(translatedText, startLanguage, endLanguage);

            // Replace the original text with the final translated text
            replaceText(editor, text, finalTranslatedText);

            // Hide status message
            hideStatusMessage();
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Translation failed: ${error}`);
        // Hide status message
        hideStatusMessage();
    }
}

// Activate the extension
function activate(context) {
    let disposable = vscode.commands.registerCommand('badtranslator.translateText', translateTextCommand);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
