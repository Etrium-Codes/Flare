function initializeChart(chartId, chartData) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const canvas = ctx.canvas;

  let gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.clientHeight);
  gradientFill.addColorStop(0, 'rgba(156, 39, 176, 0.3)');
  gradientFill.addColorStop(1, 'rgba(156, 39, 176, 0.05)');

  let gradientStroke = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);
  gradientStroke.addColorStop(0, 'rgba(156, 39, 176, 1)');
  gradientStroke.addColorStop(1, 'rgba(156, 39, 176, 0.8)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: chartData.label,
        data: chartData.data,
        fill: true,
        backgroundColor: gradientFill,
        borderColor: gradientStroke,
        pointBackgroundColor: 'rgb(156, 39, 176)',
        pointBorderColor: 'rgb(156, 39, 176)',
        pointRadius: 0,
        pointHoverRadius: 7,
        borderWidth: 2
      }]
    },
    options: chartData.options
  });
}

const chartData = {
  labels: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar'],
  data: [3715, 3800, 3890, 3719, 3650, 3720, 3715, 3800, 3890, 3719, 3650, 3720],
  label: 'Site views',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        //suggestedMin: 0,
        display: false, 
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.1)' 
        }
      },
      x: {
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.1)', 
          borderDash: [4, 4], 
          lineWidth: 1
        },
        ticks: {
          display: false 
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        displayColors: false,
        backgroundColor: 'rgba(16, 17, 20, 0.9)', 
        bodyColor: '#fff',
        titleColor: '#fff',
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 14
        },
        cornerRadius: 3,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          },
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
        },
        padding: 10
      },
      legend: {
        display: false
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    },
    elements: {
      line: {
        tension: 0.3 
      },
      point: {
        radius: 0, 
        hoverRadius: 4 
      }
    }
  }
};

const viewsChart = initializeChart('viewsChart', chartData);

function updateChart(chart, newChartData) {
  chart.data.labels = newChartData.labels;
  chart.data.datasets.forEach((dataset, i) => {
    dataset.data = newChartData.datasets[i].data;
  });
  chart.update();
}

// Example usage:
// updateChart(totalMembersChart, { labels: newLabels, datasets: [{ data: newData }] });
