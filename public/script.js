const currentDate = document.querySelector('.date');
const currentTemp = document.querySelector('.temp');
const currentHu = document.querySelector('.hu');
const toggleTheme = document.querySelector('#toggle-theme');
const toggleType = document.querySelector('#toggle-type');
const url = '/api/v1/stats';
let currentTheme = localStorage.getItem('home-theme') || 'light';

const colors = {
  light: {
    t: 'rgba(255, 99, 132, 1)',
    h: 'rgba(153, 102, 255, 1)',
    bg: '#fff',
    text: '#333'
  },
  dark: {
    t: 'rgba(235, 130, 88, 1)',
    h: 'rgba(153, 93, 129, 1)',
    bg: '#555',
    text: '#fff'
  }
}

window.addEventListener('load', () => {
  updateDomElements();
  Chart.defaults.global.defaultFontColor = colors[currentTheme].text;
  Chart.defaults.global.defaultFontSize = 20;
});

function updateDomElements() {
  document.body.style.backgroundColor = colors[currentTheme].bg;
  currentDate.style.color = colors[currentTheme].text;
  currentTemp.style.color = colors[currentTheme].text;
  currentHu.style.color = colors[currentTheme].text;
}

toggleType.addEventListener('click', () => {
  if (chart.config.type === 'line')
    chart.config.type = 'bar';
  else
    chart.config.type = 'line';
  chart.update();
})

toggleTheme.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('home-theme', currentTheme);
  updateDomElements();
  chart.data.datasets[0].backgroundColor = colors[currentTheme].t;
  chart.data.datasets[0].borderColor = colors[currentTheme].t;
  chart.data.datasets[1].backgroundColor = colors[currentTheme].h;
  chart.data.datasets[1].borderColor = colors[currentTheme].h;
  Chart.defaults.global.defaultFontColor = colors[currentTheme].text;
  chart.update();
});

getData();
setInterval(() => getData(), 4000);

async function getData() {
  try {
    const stats = await fetch(url).then(res => res.json());
    if (stats.error) {
      console.log(stats);
    }
    else {
      updateStats(stats);
    }
  } catch (err) {
    console.log(err.message);
  }
}

function updateStats(stats) {
  const d = new Date(stats.currentDate);
  currentDate.textContent = `${format(d.getHours())}:${format(d.getMinutes())}`;
  currentTemp.textContent = `Temperatura: ${stats.currentTemp} °C`;
  currentHu.textContent = `Umidità: ${stats.currentHu} %`;
  updateChart(stats.story.dates.map(date => new Date(date).toLocaleTimeString()), stats.story.temps, stats.story.hus);
}

function format(n) {
  return (n <= 9) ? "0" + n : "" + n;
}

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperatura',
      data: [],
      backgroundColor: colors[currentTheme].t,
      borderColor: colors[currentTheme].t,
      fill: false,
      borderWidth: 5
    },
    {
      label: 'Umidità',
      data: [],
      backgroundColor: colors[currentTheme].h,
      borderColor: colors[currentTheme].h,
      fill: false,
      borderWidth: 5
    }
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }
});

function updateChart(dates, temps, hus) {
  chart.data.labels = dates;
  chart.data.datasets[0].data = temps;
  chart.data.datasets[1].data = hus;
  chart.update();
}