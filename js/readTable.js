function lerArquivoCSV(nome) {
  fetch('/documents/'+nome)
    .then(response => response.text())
    .then(data => {
      // aqui você pode chamar uma função para criar a tabela
      criarTabela(data,nome);
    });
}

function criarTabela(dadosCSV,nome) {
  // quebra a string em linhas e colunas
  const linhas = dadosCSV.trim().split('\n');
  const colunas = linhas[0].split(',');

  // cria a tabela HTML
  const tabela = document.getElementById(nome.replace('.csv',''));
  tabela.innerHTML = '';

  // adiciona os cabeçalhos da tabela
  const cabecalho = tabela.createTHead();
  const rowCabecalho = cabecalho.insertRow();
  for (let coluna of colunas) {
    const th = document.createElement('th');
    th.textContent = coluna;
    rowCabecalho.appendChild(th);
  }

  // adiciona as linhas da tabela
  const corpo = tabela.createTBody();
  for (let i = 1; i < linhas.length; i++) {
    const row = corpo.insertRow();
    const valores = linhas[i].split(',');
    for (let j = 0; j < colunas.length; j++) {
      const td = row.insertCell();
      td.textContent = valores[j];
    }
  }
}

function lerArquivos() {
  fetch('/documents/')
    .then(response => response.text())
    .then(data => {
      // aqui você pode chamar uma função para criar a tabela
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, 'text/html');
      const links = htmlDocument.querySelectorAll('a'); // Obtém todos os elementos <a> na página

      links.forEach((link) => {
        var linkText = link.textContent; // Obtém o texto dentro da tag <a>
        if(linkText.includes('.csv')){
            lerArquivoCSV(linkText)
        }
      });
    });
}

window.addEventListener('load', lerArquivos);
