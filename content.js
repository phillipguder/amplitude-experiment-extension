// Este script será injetado em todas as páginas para buscar experimentos do Amplitude Experiment

function getAmplitudeExperiments() {
  const experiments = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('amp-exp-')) {
      try {
        const value = localStorage.getItem(key);
        experiments.push({ key, value });
      } catch (e) {
        // ignora erros de parsing
      }
    }
  }
  return experiments;
}

// Listener para mensagens vindas do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_EXPERIMENTS') {
    const experiments = getAmplitudeExperiments();
    sendResponse({ experiments });
  }
}); 