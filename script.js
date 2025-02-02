// Mock Data for MediSphere Dashboard
const data = {
  patients: {
    labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [20, 35, 25, 15, 5],
        backgroundColor: ['#4CAF50', '#FF5722', '#2196F3', '#9C27B0', '#FFC107'],
      },
    ],
  },
  hospital: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Patient Satisfaction (%)',
        data: [85, 78, 90, 88, 92, 95],
        borderColor: '#4CAF50',
        fill: false,
      },
    ],
  },
  diseases: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'COVID-19 Cases',
        data: [100, 200, 300, 400, 500, 600],
        borderColor: '#FF5722',
        fill: false,
      },
      {
        label: 'Flu Cases',
        data: [150, 250, 350, 450, 550, 650],
        borderColor: '#2196F3',
        fill: false,
      },
    ],
  },
};

// Initialize Charts
const barChartCtx = document.getElementById('barChart').getContext('2d');
const lineChartCtx = document.getElementById('lineChart').getContext('2d');
const pieChartCtx = document.getElementById('pieChart').getContext('2d');

let barChart, lineChart, pieChart;

function renderCharts(filter) {
  const chartData = data[filter] || data.patients; // Default to patient data

  // Bar Chart (Age Distribution)
  if (barChart) barChart.destroy();
  barChart = new Chart(barChartCtx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });

  // Line Chart (Hospital Performance or Disease Trends)
  if (lineChart) lineChart.destroy();
  lineChart = new Chart(lineChartCtx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });

  // Pie Chart (Age Distribution)
  if (pieChart) pieChart.destroy();
  pieChart = new Chart(pieChartCtx, {
    type: 'pie',
    data: data.patients, // Always show age distribution for pie chart
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });
}

// Filter Data
document.getElementById('data-filter').addEventListener('change', (e) => {
  renderCharts(e.target.value);
});

// Dark/Light Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Initialize Map
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Add Markers (Example)
L.marker([51.505, -0.09]).addTo(map).bindPopup('Hospital A');
L.marker([48.8566, 2.3522]).addTo(map).bindPopup('Hospital B');

// Real-Time Metrics Update
function updateMetrics() {
  document.getElementById('total-patients').textContent = Math.floor(Math.random() * 1000);
  document.getElementById('recovery-rate').textContent = `${Math.floor(Math.random() * 100)}%`;
  document.getElementById('active-cases').textContent = Math.floor(Math.random() * 500);
  document.getElementById('total-hospitals').textContent = Math.floor(Math.random() * 100);
}

setInterval(updateMetrics, 3000); // Update every 3 seconds

// Initial Render
renderCharts('patients');
updateMetrics();