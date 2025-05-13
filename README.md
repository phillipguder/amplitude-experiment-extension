# Amplitude Experiment Inspector

Esta extensão do Chrome permite visualizar de forma intuitiva todos os experimentos ativos e inativos do Amplitude Experiment presentes no localStorage da página visitada. Ideal para desenvolvedores, analistas e squads que utilizam testes A/B com Amplitude.

## Funcionalidades
- Lista todos os experimentos do Amplitude (exceto agrupamentos '-flags')
- Separa experimentos ativos e inativos
- Mostra nome, status e variante ativa de cada experimento
- Visualização detalhada do JSON de cada experimento
- Interface simples e intuitiva

## Instalação
1. Baixe ou clone este repositório:
   ```
   git clone https://github.com/seu-usuario/amplitude-experiment-inspector.git
   ```
2. No Chrome, acesse `chrome://extensions/` e ative o "Modo do desenvolvedor".
3. Clique em "Carregar sem compactação" e selecione a pasta do projeto.
4. O ícone da extensão aparecerá na barra do navegador.

## Como usar
1. Acesse qualquer site que utilize Amplitude Experiment.
2. Clique no ícone da extensão.
3. Veja a lista de experimentos ativos e inativos, com detalhes de variante e status.

## Permissões
- **activeTab**: Necessária para acessar o localStorage da página aberta.
- **scripting**: Para injetar o script que lê os experimentos.
- **storage**: Para possíveis configurações futuras (não armazena dados do usuário).
- **<all_urls>**: Para funcionar em qualquer site que utilize Amplitude Experiment.

## Privacidade
Esta extensão **não coleta, armazena ou transmite** nenhum dado pessoal do usuário. Todas as operações são realizadas localmente no navegador.

## Contribuição
Pull requests são bem-vindos! Para sugestões ou bugs, abra uma issue.

## Licença
[MIT](LICENSE) 