const htmlDate = document.querySelector('[date]');
const htmlTemp = document.querySelector('[temp]');
const htmlHu = document.querySelector('[hu]');
const chartContainer = document.querySelector('[chart-container]');

getData();
setInterval(() => getData(), 4000);

function getData() {
  fetch('/api/v1/stats')
    .then(res => res.json())
    .then(data => showData(data))
    .catch(err => { });
}

function showData(data) {
  if (data.error_message) return console.log(data.error_message);
  const d = new Date(data.currentDate);
  if (data.temp < 16) {
    document.body.classList.add('cold');
  } else {
    document.body.classList.remove('cold');
  }
  htmlDate.textContent = `${format(d.getHours())}:${format(d.getMinutes())}`;
  htmlTemp.textContent = `Temperatura: ${data.currentTemp}`;
  htmlHu.textContent = `Umidità: ${data.currentHu}`;
  showChart(data.story.dates.map(date => new Date(date).toLocaleTimeString()), data.story.temps, data.story.hus);
}

function format(n) {
  return (n <= 9) ? "0" + n : "" + n;
}

function showChart(dates, temps, hus) {
  chartContainer.innerHTML = '<canvas id="chart" width="900" height="300"></canvas>';
  const ctx = document.getElementById('chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Temperatura',
        data: temps,
        backgroundColor: "transparent",
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }, {
        label: 'Umidità',
        data: hus,
        backgroundColor: "transparent",
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      }
    }
  });
}