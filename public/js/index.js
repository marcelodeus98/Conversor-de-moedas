const TOP_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];

document.querySelector('.menu-toggle').addEventListener('click', function () {
  const menuLinks = document.getElementById('menuLinks');
  menuLinks.style.display = menuLinks.style.display === 'flex' ? 'none' : 'flex';
});

$(document).ready(function () {
  $('.js-example-basic-single').select2({
    theme: 'bootstrap-5',
    width: '100%',
    placeholder: "Selecione ou digite para buscar",
    language: {
      noResults: function () {
        return "Nenhum resultado encontrado";
      },
      searching: function () {
        return "Buscando...";
      }
    }
  });

  $('.js-example-basic-multiple').select2({
    theme: 'bootstrap-5',
    width: '100%',
    placeholder: "Selecione as moedas para comparar",
    closeOnSelect: false,
    language: {
      noResults: function () {
        return "Nenhum resultado encontrado";
      },
      searching: function () {
        return "Buscando...";
      }
    }
  });

  document.getElementById('swapCurrencies').addEventListener('click', function () {
    const moedaOneValue = $('#selectMoedaOne').val();
    const moedaTwoValue = $('#selectMoedaTwo').val();

    $('#selectMoedaOne').val(moedaTwoValue).trigger('change');
    $('#selectMoedaTwo').val(moedaOneValue).trigger('change');

    if (document.getElementById('valueId').value) {
      Converter();
    }
  });
});

let Converter = async () => {
  try {
    let valueCoin = parseFloat(document.getElementById("valueId").value) || 1;
    let coinOne = document.getElementById("selectMoedaOne").value.split(',')[0];
    let coinTwo = document.getElementById("selectMoedaTwo").value.split(',')[0];
    let elementConvertido = document.getElementById("valueConvert");
    let conversionRateElement = document.getElementById("conversionRate");

    const app_URL = `https://economia.awesomeapi.com.br/json/last/${coinOne}-${coinTwo}`;

    const response = await fetch(app_URL);
    if (!response.ok) {
      throw new Error('Erro ao consumir API');
    }

    const data = await response.json();
    const key = `${coinOne}${coinTwo}`;
    const bidValue = data[key]?.bid || data[key]?.low;

    if (!bidValue) {
      throw new Error('Dados de conversão não encontrados');
    }

    const valueConverted = bidValue * valueCoin;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: coinTwo,
    });

    elementConvertido.innerHTML = `O valor convertido é: ${formatter.format(valueConverted)}`;
    conversionRateElement.innerHTML = `Taxa de conversão: 1 ${coinOne} = ${formatter.format(bidValue)} ${coinTwo}`;

    loadHistory(coinOne, coinTwo);
  }
  catch (error) {
    console.error('Erro ao conveter moeda:', error);
    document.getElementById("valueConvert").innerHTML = 'Erro ao converter moeda. Tente novamente.';
  }
}

async function loadHistory(coinOne, coinTwo, days = 5) {
  try {
    const historyElement = document.getElementById("historyContainer");
    if (!historyElement) return;

    historyElement.innerHTML = '<p>Carregando histórico...</p>';

    const response = await fetch(`https://economia.awesomeapi.com.br/json/daily/${coinOne}-${coinTwo}/${days}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar histórico');
    }

    const historyData = await response.json();

    const dataArray = Array.isArray(historyData) ? historyData : [historyData];

    const sortedData = dataArray.sort((a, b) => {
      const dateA = new Date(a.create_date || a.timestamp * 1000);
      const dateB = new Date(b.create_date || b.timestamp * 1000);
      return dateB - dateA;
    });

    renderHistoryTable(sortedData, coinOne, coinTwo);
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    document.getElementById("historyContainer").innerHTML = '<p>Não foi possível carregar o histórico de cotações.</p>';
  }
}

function renderHistoryTable(data, coinOne, coinTwo) {
  const historyElement = document.getElementById("historyContainer");
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: coinTwo,
  });

  if (!data || data.length === 0) {
    historyElement.innerHTML = '<p>Nenhum dado histórico disponível.</p>';
    return;
  }

  let html = `
        <div class="history-section">
            <h3>Histórico de Cotações (${coinOne} para ${coinTwo})</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Alta</th>
                            <th>Baixa</th>
                            <th>Variação</th>
                            <th>% Variação</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

  data.forEach(item => {
    const date = item.create_date ?
      new Date(item.create_date).toLocaleDateString() :
      new Date(item.timestamp * 1000).toLocaleDateString();

    const variationClass = item.pctChange >= 0 ? 'positive' : 'negative';

    html += `
            <tr>
                <td>${date}</td>
                <td>${formatter.format(item.high)}</td>
                <td>${formatter.format(item.low)}</td>
                <td class="${variationClass}">${item.varBid}</td>
                <td class="${variationClass}">${item.pctChange}%</td>
            </tr>
        `;
  });

  html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

  historyElement.innerHTML = html;
}

async function loadTopCurrencies() {
  try {
    const resultsContainer = document.getElementById("comparisonResults");
    resultsContainer.innerHTML = '<p>Carregando comparação das top 5 moedas...</p>';

    const promises = TOP_CURRENCIES.map(currency =>
      loadCurrencyHistory(currency, 'BRL', 5)
    );

    const results = await Promise.all(promises);
    renderComparisonResults(results, 'BRL');
  } catch (error) {
    console.error('Erro ao carregar top moedas:', error);
    document.getElementById("comparisonResults").innerHTML =
      '<p>Erro ao carregar comparação de moedas.</p>';
  }
}

async function loadCustomComparison() {
  try {
    const selectedCurrencies = Array.from(
      document.getElementById("comparisonCurrencySelect").selectedOptions
    ).map(option => option.value);

    if (selectedCurrencies.length === 0) {
      alert('Selecione pelo menos uma moeda para comparar');
      return;
    }

    const resultsContainer = document.getElementById("comparisonResults");
    resultsContainer.innerHTML = '<p>Carregando comparação personalizada...</p>';

    const promises = selectedCurrencies.map(currency =>
      loadCurrencyHistory(currency, 'BRL', 5)
    );

    const results = await Promise.all(promises);
    renderComparisonResults(results, 'BRL');
  } catch (error) {
    console.error('Erro ao carregar comparação personalizada:', error);
    document.getElementById("comparisonResults").innerHTML =
      '<p>Erro ao carregar comparação de moedas.</p>';
  }
}

async function loadCurrencyHistory(coinOne, coinTwo, days) {
  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/json/daily/${coinOne}-${coinTwo}/${days}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao carregar ${coinOne}`);
    }

    const data = await response.json();
    return {
      currency: coinOne,
      data: Array.isArray(data) ? data : [data]
    };
  } catch (error) {
    console.error(`Erro ao carregar ${coinOne}:`, error);
    return {
      currency: coinOne,
      error: true
    };
  }
}

function renderComparisonResults(results, baseCurrency) {
  const resultsContainer = document.getElementById("comparisonResults");

  const validResults = results.filter(r => !r.error && r.data && r.data.length > 0);

  if (validResults.length === 0) {
    resultsContainer.innerHTML = '<p>Nenhum dado disponível para comparação.</p>';
    return;
  }

  const sortedData = validResults.map(result => {
    return {
      currency: result.currency,
      data: result.data.sort((a, b) => {
        const dateA = new Date(a.create_date || a.timestamp * 1000);
        const dateB = new Date(b.create_date || b.timestamp * 1000);
        return dateB - dateA;
      })
    };
  });

  let html = `
        <div class="comparison-table-container">
            <h4>Variação das moedas frente ao ${baseCurrency} (últimos 5 dias)</h4>
            <div class="table-scroll">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            ${sortedData.map(r => `<th>${r.currency}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
    `;

  const dates = sortedData[0].data.map(item =>
    item.create_date ?
      new Date(item.create_date).toLocaleDateString() :
      new Date(item.timestamp * 1000).toLocaleDateString()
  );

  dates.forEach((date, i) => {
    html += `<tr><td>${date}</td>`;

    sortedData.forEach(result => {
      const item = result.data[i];
      if (!item) {
        html += `<td>-</td>`;
        return;
      }

      const variation = item.pctChange;
      const variationClass = variation >= 0 ? 'positive' : 'negative';
      const bidValue = item.bid || item.low;

      html += `
                <td class="${variationClass}" title="${result.currency}: ${bidValue}">
                    ${variation}%
                </td>
            `;
    });

    html += `</tr>`;
  });

  html += `
                    </tbody>
                </table>
            </div>
            
            <div class="comparison-chart-container">
                <canvas id="comparisonChart"></canvas>
            </div>
        </div>
    `;

  resultsContainer.innerHTML = html;

  if (typeof Chart !== 'undefined') {
    renderComparisonChart(sortedData, dates, baseCurrency);
  }
}

function renderComparisonChart(data, dates, baseCurrency) {
  const ctx = document.getElementById('comparisonChart').getContext('2d');

  const datasets = data.map(currencyData => {
    return {
      label: `${currencyData.currency}/${baseCurrency}`,
      data: currencyData.data.map(item => parseFloat(item.pctChange)),
      borderWidth: 2,
      tension: 0.1,
      fill: false
    };
  });

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Variação Percentual das Moedas vs ${baseCurrency}`,
          font: {
            size: 16
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Variação Percentual (%)'
          }
        }
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const coinOne = document.getElementById("selectMoedaOne").value.split(',')[0];
  const coinTwo = document.getElementById("selectMoedaTwo").value.split(',')[0];
  loadHistory(coinOne, coinTwo);
});

function adjustParallaxHeight() {
  const parallax = document.querySelector('.parallax-container');
  if (window.innerWidth < 768) {
    parallax.style.minHeight = '300px';
    parallax.style.backgroundAttachment = 'scroll';
  } else {
    parallax.style.minHeight = '500px';
    parallax.style.backgroundAttachment = 'fixed';
  }
}

window.addEventListener('load', adjustParallaxHeight);
window.addEventListener('resize', adjustParallaxHeight);