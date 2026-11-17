// Stage 2 Report Charts
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var warn = style.getPropertyValue('--warn').trim();

  // Load results data and render charts
  fetch('assets/results.json')
    .then(function(r) { return r.json(); })
    .then(function(data) { renderCharts(data); })
    .catch(function(err) {
      console.error('Failed to load results.json:', err);
      // 静态 fallback：硬编码关键数据
      renderCharts({
        overall_acc: 91.58,
        per_class: [
          { label: 'Tomato Early blight', acc: 58.1 },
          { label: 'Corn Cercospora leaf spot', acc: 66.3 },
          { label: 'Apple Cedar apple rust', acc: 67.3 },
          { label: 'Tomato mosaic virus', acc: 68.8 },
          { label: 'Tomato Target Spot', acc: 73.0 },
          { label: 'Pepper bell Bacterial spot', acc: 75.0 },
          { label: 'Potato Late blight', acc: 77.0 },
          { label: 'Tomato Leaf Mold', acc: 78.5 },
          { label: 'Tomato Spider mites', acc: 79.0 },
          { label: 'Apple Apple scab', acc: 80.0 },
          { label: 'Tomato Septoria leaf spot', acc: 81.0 },
          { label: 'Blueberry healthy', acc: 82.0 },
          { label: 'Peach Bacterial spot', acc: 83.0 },
          { label: 'Potato Early blight', acc: 84.0 },
          { label: 'Tomato Yellow Leaf Curl', acc: 85.0 },
          { label: 'Apple Black rot', acc: 85.5 },
          { label: 'Tomato Late blight', acc: 86.0 },
          { label: 'Grape Black rot', acc: 86.5 },
          { label: 'Grape Esca Black Measles', acc: 87.0 },
          { label: 'Strawberry Leaf scorch', acc: 88.0 },
          { label: 'Tomato Bacterial spot', acc: 88.5 },
          { label: 'Raspberry healthy', acc: 89.0 },
          { label: 'Pepper bell healthy', acc: 89.5 },
          { label: 'Peach healthy', acc: 90.0 },
          { label: 'Soybean healthy', acc: 90.5 },
          { label: 'Corn Northern Leaf Blight', acc: 91.0 },
          { label: 'Potato healthy', acc: 91.5 },
          { label: 'Orange Haunglongbing', acc: 99.4 },
          { label: 'Cherry Powdery mildew', acc: 94.0 },
          { label: 'Corn healthy', acc: 95.0 },
          { label: 'Strawberry healthy', acc: 95.5 },
          { label: 'Apple healthy', acc: 96.0 },
          { label: 'Grape Leaf blight', acc: 96.5 },
          { label: 'Tomato healthy', acc: 97.0 },
          { label: 'Cherry healthy', acc: 98.4 },
          { label: 'Squash Powdery mildew', acc: 98.6 },
          { label: 'Corn Common rust', acc: 98.8 },
          { label: 'Grape healthy', acc: 100.0 }
        ]
      });
    });

  function renderCharts(data) {
    // ===== Chart 1: Per-class accuracy (horizontal bar, ascending) =====
    var sorted = data.per_class.slice().sort(function(a,b) { return a.acc - b.acc; });
    var labels = sorted.map(function(d) { return d.label; });
    var values = sorted.map(function(d) { return d.acc; });

    var chart1 = echarts.init(document.getElementById('chart-class-acc'), null, { renderer: 'svg' });

    // Color: green for >=90%, orange 70-90%, red <70%
    var barColors = values.map(function(v) {
      if (v >= 90) return accent;
      if (v >= 70) return accent2;
      return warn;
    });

    chart1.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(p) { return p[0].name + '<br/>准确率: <strong>' + p[0].value + '%</strong>'; },
        appendToBody: true
      },
      grid: { left: 240, right: 40, top: 10, bottom: 30, containLabel: false },
      xAxis: {
        type: 'value',
        min: 50, max: 100,
        axisLabel: { color: muted, formatter: '{value}%' },
        axisLine: { lineStyle: { color: rule } },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        data: labels,
        inverse: true,
        axisLabel: { color: ink, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: values.map(function(v, i) {
          return { value: v, itemStyle: { color: barColors[i], borderRadius: [0, 4, 4, 0] } };
        }),
        barWidth: 14,
        label: {
          show: true, position: 'right',
          formatter: '{c}%',
          color: muted, fontSize: 11
        }
      }]
    });
    window.addEventListener('resize', function() { chart1.resize(); });
  }
})();
