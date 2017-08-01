import echarts from 'echarts';

let myChart = echarts.init(document.getElementById('root'));

let now = +new Date(2010, 10, 10);
let value = Math.random() * 1000;
const oneSecond = 1000 * 60;

let data = [];

// 初始化
// 原有的 data 的大小，决定了在时间轴上的数据量的大小，也就是间隔大小
// 如：目前的跳变精度为 1 秒，那么设置为 60 时，即想要在时间轴上保持 1 分钟的数据。
for (let index = 0; index < 120; index++) {
  data.push(randomData());
}

function randomData() {
  now = new Date(+now + oneSecond);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      now,
      Math.round(value)
    ]
  }
}

let option = {
  title: {
    text: '动态数据 + 时间坐标轴'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      return date.toLocaleString() + ' : ' + params.value[1];
    },
    axisPointer: {
      animation: false
    }
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty'
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'empty'
    }
  ],
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    },
    axisLabel: {
      interval: 20,
      show: true
    },
    // axisLine: {show: false},
    splitNumber: 3,
    // boundaryGap: ['20%', '20%']
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [{
    name: '模拟数据',
    type: 'line',
    showSymbol: false,
    hoverAnimation: false,
    data: data
  }]
}

setInterval(() => {
  //for (let i = 0; i < 1; i++) {
  // data.shift();
  // data.push(randomData());
  //}

  data.shift();
  data.push(randomData());

  myChart.setOption({
    series: [
      {data}
    ]
  });

}, 1000);

myChart.setOption(option);