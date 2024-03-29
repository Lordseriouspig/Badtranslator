# Bad Translator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![VS Code](https://img.shields.io/badge/vscode-^1.87.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

This VS Code extension allows you to translate text using Google Translate, and back to English, as many times as you want. It's perfect for those who enjoy the chaos of mistranslations and humorous results!

## Features

- Translate text from any language to any language using Google Translate.
- Translate text back and forth multiple times for fun and chaos.
- Customizable translation options, including start and end languages, and the number of translations.
- Keyboard shortcut support for quick translation.
- GUI-based notifications for informative feedback during translation tasks.

## Usage

1. Highlight the text you want to translate in the editor.
2. Use the `Ctrl+Shift+T` (or `Cmd+Shift+T` on macOS) keyboard shortcut to trigger the translation command.
3. Sit back and watch as your text gets translated and mistranslated multiple times!
4. Enjoy the chaos of the results!

## Configuration

You can customize the translation behavior by modifying the extension settings in your VS Code settings:

- `badtranslator.startLanguage`: The starting language code. Use 'auto' for automatic detection. This uses ISO-639-1 formatting. Get the full list [here](https://cloud.google.com/translate/docs/languages)
- `badtranslator.endLanguage`: The target language code. This uses ISO-639-1 formatting. Get the full list [here](https://cloud.google.com/translate/docs/languages)
- `badtranslator.translationCount`: The number of times to translate the text. I would reccomend around 100, but do not go above 1000.

## Installation

You can get our free extension [here](https://marketplace.visualstudio.com/items?itemName=lordseriouspig.Badtranslator&ssr=false#overview)
Simply click install, and follow the prompts from there

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Acknowledgements

- This extension utilizes the Google Translate API for text translation.
- Inspired by the concept of "translation telephone" and the humor of mistranslations.

## Support, Bugs, and suggestions

If you encounter any issues, have an idea for a feature, or need some help, please don't hesitate to create an issue.

