// Solicita ao content script os experimentos do Amplitude
function parseExperiments(experiments) {
  const parsed = [];
  experiments.forEach(exp => {
    // Ignorar experimentos com '-flags' na chave
    if (exp.key.includes('-flags')) return;
    let json;
    try {
      json = JSON.parse(exp.value);
    } catch (e) {
      return;
    }
    // Se for um objeto com vários experimentos dentro
    Object.entries(json).forEach(([expName, expData]) => {
      // Alguns experimentos podem estar aninhados em arrays, tratar isso
      if (typeof expData === 'object' && !Array.isArray(expData)) {
        let status = 'Ativo';
        let variante = '-';
        if (expData.value === 'off' || expData.key === 'off') status = 'Inativo';
        if (expData.value && expData.value !== 'on' && expData.value !== 'off') variante = expData.value;
        else if (expData.key && expData.key !== 'on' && expData.key !== 'off') variante = expData.key;
        else if (expData.metadata && expData.metadata.default) variante = 'default';
        parsed.push({
          nome: expName,
          status,
          variante,
          detalhes: expData
        });
      }
    });
  });
  return parsed;
}

function renderExperiments(experiments) {
  const container = document.getElementById('experiments');
  const parsed = parseExperiments(experiments);
  if (!parsed.length) {
    container.innerHTML = '<p>Nenhum experimento encontrado.</p>';
    return;
  }
  const ativos = parsed.filter(e => e.status === 'Ativo');
  const inativos = parsed.filter(e => e.status === 'Inativo');
  let html = '';
  if (ativos.length) {
    html += '<h2>Ativos</h2>';
    ativos.forEach(e => {
      html += `
        <div class="exp">
          <div class="key">${e.nome}</div>
          <div>Status: <span class="variant">${e.status}</span></div>
          <div>Variante: <span class="variant">${e.variante}</span></div>
          <details><summary>Detalhes</summary><div class="json">${JSON.stringify(e.detalhes, null, 2)}</div></details>
        </div>
      `;
    });
  }
  if (inativos.length) {
    html += '<h2>Inativos</h2>';
    inativos.forEach(e => {
      html += `
        <div class="exp">
          <div class="key">${e.nome}</div>
          <div>Status: <span class="inactive">${e.status}</span></div>
          <div>Variante: <span class="inactive">${e.variante}</span></div>
          <details><summary>Detalhes</summary><div class="json">${JSON.stringify(e.detalhes, null, 2)}</div></details>
        </div>
      `;
    });
  }
  container.innerHTML = html;
}

// Envia mensagem para o content script na aba ativa
function getExperiments() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: 'GET_EXPERIMENTS' },
      function(response) {
        if (chrome.runtime.lastError || !response) {
          document.getElementById('experiments').innerHTML = '<p>Não foi possível acessar os experimentos nesta página.</p>';
          return;
        }
        renderExperiments(response.experiments);
      }
    );
  });
}

document.addEventListener('DOMContentLoaded', getExperiments); 