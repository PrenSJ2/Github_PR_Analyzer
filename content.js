chrome.storage.sync.get(['githubToken', 'openaiToken'], (tokens) => {
  if (!tokens.githubToken || !tokens.openaiToken) {
    return;
  }
  let githubToken = tokens.githubToken;
  let openaiToken = tokens.openaiToken;

  // Function to inject the button on a pull request page
  const injectButton = () => {
    const prTitleElement = document.querySelector('.js-issue-title');
    if (prTitleElement) {
      const prDescriptionElement = document.querySelector('.comment-body.timeline-comment');
      if (prDescriptionElement) {
        const targetDiv = prDescriptionElement.closest('.js-comment-container');
        if (targetDiv && !document.querySelector('.generate-description-button')) {
          const button = document.createElement('button');
          button.textContent = 'Generate Technical Description';
          button.className = 'generate-description-button';

          button.addEventListener('click', () => {
            generateTechnicalDescription(githubToken, openaiToken);
          });

          targetDiv.insertBefore(button, targetDiv.firstChild);

          console.log('Button inserted successfully.');
        }
      }
    }
  };

  // Observe changes in the DOM to inject the button on a pull request page
  const observer = new MutationObserver(() => {
    injectButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Inject the button on script start in case the pull request page is already loaded
  injectButton();

  console.log('Content script initialized.');
});

async function generateTechnicalDescription(githubToken, openaiToken) {
  // Retrieve relevant information from the PR page
  let titleElement = document.querySelector('.js-issue-title');
  let descriptionElement = document.querySelector('.comment-body.timeline-comment');

  if (!titleElement || !descriptionElement) {
    console.error('Failed to locate PR title or description elements.');
    return;
  }

  let title = titleElement.innerText.trim();
  let description = descriptionElement.innerText.trim();

  // Prepare input for ChatGPT
  let inputText = `Title: ${title}\n\nDescription: ${description}`;

  // Call OpenAI API to generate technical description
  let response = await generateDescriptionWithGPT(inputText, openaiToken);

  // Retrieve the generated technical description
  let technicalDescription = response.choices[0].text.trim();

  // Perform any further processing or actions with the generated technical description
  console.log('Generated Technical Description:', technicalDescription);
}

async function generateDescriptionWithGPT(inputText, openaiToken) {
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = 'Generate a technical description:';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiToken}`
      },
      body: JSON.stringify({
        prompt: `${prompt}\n\n${inputText}`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error generating technical description:', error);
    return null;
  }
}
