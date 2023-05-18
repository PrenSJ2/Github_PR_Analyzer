// Function to hide characters of a token except the last four
function hideCharacters(token) {
  let hiddenPart = '*'.repeat(token.length - 4);
  let visiblePart = token.substring(token.length - 4);
  return hiddenPart + visiblePart;
}

document.addEventListener('DOMContentLoaded', (event) => {
  // When DOM is fully loaded, retrieve tokens from storage and update inputs
  chrome.storage.sync.get(['githubToken', 'openaiToken'], (tokens) => {
    if(tokens.githubToken) {
      document.getElementById('githubToken').value = hideCharacters(tokens.githubToken);
    }
    if(tokens.openaiToken) {
      document.getElementById('openaiToken').value = hideCharacters(tokens.openaiToken);
    }
  });

  // Add event listener to the save button
  document.getElementById('save').addEventListener('click', () => {
    let githubToken = document.getElementById('githubToken').value;
    let openaiToken = document.getElementById('openaiToken').value;

    // Store tokens into chrome storage
    chrome.storage.sync.set({githubToken, openaiToken}, () => {
      console.log('Tokens are stored in Chrome storage.');
    });
  });
});
