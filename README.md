<h1 align="center">
  <img src="logo.png" alt="Project Logo" width="200">
  <br>
  GitHub PR Technical Description Generator
</h1>

<p align="center">
  Chrome extension for generating technical descriptions of PR changes on GitHub.
</p>

<p align="center">
  <img src="screenshot.png" alt="Extension Screenshot">
</p>

## Description

The GitHub PR Technical Description Generator is a Chrome extension that integrates with GitHub to provide a convenient way to generate technical descriptions of changes made in a PR. The extension analyzes the files changed in the PR and utilizes the power of ChatGPT to generate a comprehensive technical description. It aims to save time and improve communication during code reviews and collaboration.

## Features

- Automatic detection of PR description edit mode
- Generate technical description of PR changes
- Seamless integration with the GitHub interface
- Easy-to-use interface with a single button click

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and go to `chrome://extensions`.
3. Enable the **Developer mode** toggle in the top-right corner.
4. Click on the **Load unpacked** button and select the project directory.
5. The extension will be installed and ready to use.

## Usage

1. Open any Pull Request (PR) page on GitHub.
2. When the PR description edit mode is available, a **Generate Technical Description** button will appear above the description field.
3. Click the button to generate the technical description.
4. The extension will analyze the changed files and use ChatGPT to generate the technical description.
5. The generated technical description will be logged in the console.

## Configuration

Before using the extension, you need to configure your GitHub API token and OpenAI API token.

1. Get a GitHub API token by following the instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
2. Get an OpenAI API token by signing up for an account at [OpenAI](https://openai.com) and generating an API token.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to contribute to this project by opening issues or submitting pull requests. Contributions are always welcome!
