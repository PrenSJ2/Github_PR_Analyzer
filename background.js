// Use chrome.action instead of chrome.browserAction in MV3
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectButton,
  });
});

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg) {
    if (msg.action == "getFilesChanged") {
      const githubToken = await getGitHubToken();
      fetchGitHubData(githubToken, msg.url)
        .then(response => port.postMessage(response))
        .catch(error => console.error(error));
    } else if (msg.action == "generateDescription") {
      const openAIToken = await getOpenAiToken();
      generateDescription(openAIToken, msg.prompt)
        .then(response => port.postMessage(response))
        .catch(error => console.error(error));
    }
  });
});

function getGitHubToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('githubToken', function(data) {
      resolve(data.githubToken);
    });
  });
}

function getOpenAiToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('openAIToken', function(data) {
      resolve(data.openAIToken);
    });
  });
}

async function fetchGitHubData(githubToken, url) {
  const headers = new Headers();
  headers.append("Authorization", `token ${githubToken}`);

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  return await response.json();
}

async function generateDescription(openAIToken, prompt) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${openAIToken}`);
  headers.append("Content-Type", "application/json");

  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      'prompt': prompt,
      'max_tokens': 60
    }),
  });

  return await response.json();
}
G