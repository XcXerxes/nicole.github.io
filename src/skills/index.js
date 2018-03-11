import Chart from 'chart.js'

export default {
  initChart(id) {
    const ctx = document.getElementById(id).getContext('2d')
    return new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ["Photoshop", "lllustrator", "Sketch", "Html", "CSS", "设计"],
        datasets: [{
          label: '技能掌握情况',
          data: [80, 100, 90, 70, 80, 70],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: '技能熟练程度（%）'
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}