// Use chrome.action instead of chrome.browserAction in MV3
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: injectButton,
  });
});

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg) {
    console.log('Message received:', msg);
    if (msg.action == "getFilesChanged") {
      const githubToken = await getGitHubToken();
      console.log('GitHub Token:', githubToken);
      fetchGitHubData(githubToken, msg.url)
        .then(response => {
          console.log('GitHub Data:', response);
          port.postMessage(response);
        })
        .catch(error => console.error(error));
    } else if (msg.action == "generateDescription") {
      const openAIToken = await getOpenAiToken();
      console.log('OpenAI Token:', openAIToken);
      generateDescription(openAIToken, msg.prompt)
        .then(response => {
          console.log('Description:', response);
          port.postMessage(response);
        })
        .catch(error => console.error(error));
    }
  });
});

function getGitHubToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('githubToken', function(data) {
      console.log('Retrieved GitHub Token:', data.githubToken);
      resolve(data.githubToken);
    });
  });
}

function getOpenAiToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('openAIToken', function(data) {
      console.log('Retrieved OpenAI Token:', data.openAIToken);
      resolve(data.openAIToken);
    });
  });
}

async function fetchGitHubData(githubToken, url) {
  console.log('Fetching GitHub Data:', url);
  const headers = new Headers();
  headers.append("Authorization", `token ${githubToken}`);

  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  console.log('Fetched GitHub Data:', data);
  return data;
}

async function generateDescription(openAIToken, prompt) {
  console.log('Generating Description:', prompt);
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

  const data = await response.json();
  console.log('Generated Description:', data);
  return data;
}
