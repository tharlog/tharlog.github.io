(function ($) {
    lerArquivoCSV()
})

function lerArquivoCSV() {
  fetch('/documents/tabela.csv')
    .then(response => response.text())
    .then(data => {
      // aqui você pode chamar uma função para criar a tabela
      criarTabela(data);
    });
}

function criarTabela(dadosCSV) {
  // quebra a string em linhas e colunas
  const linhas = dadosCSV.trim().split('\n');
  const colunas = linhas[0].split(',');

  // cria a tabela HTML
  const tabela = document.getElementById('_table');
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

window.addEventListener('load', lerArquivoCSV);
