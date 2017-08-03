import echarts from 'echarts';
import io from 'socket.io-client';

let myChart = echarts.init(document.getElementById('root'));

let now = +Date.now();
// let value = Math.random() * 1000;
const oneSecond = 1000;

const socket = io('http://localhost:3000');

let analogData = [];
let digitalData = [];

// 初始化
// 原有的 data 的大小，决定了在时间轴上的数据量的大小，也就是间隔大小
// 如：目前的跳变精度为 1 秒，那么设置为 60 时，即想要在时间轴上保持 1 分钟的数据。
for (let index = 0; index < 60; index++) {
  now = new Date(+now + oneSecond);
  analogData.push(randomData(now, 0, 500));
  digitalData.push(randomData(now, 0, 1));
}

function randomData(time, lower, upper) {
  const diff = upper - lower + 1;
  const value =  Math.floor(Math.random() * diff + lower);
  return {
    name: time.toString(),
    value: [
      time,
      value
    ]
  }
}

let option = {
  title: {
    text: '动态数据 + 时间坐标轴',
    x: 'center',
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
  legend: {
    data:['模拟量数据', '开关量数据'],
    x: 'left'
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
  yAxis: [
    {
      name: '模拟量',
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    {
      name: '开关量',
      max: 8,
      type: 'value'
    }
  ],
  series: [
    {
      name: '模拟量数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: analogData
    },
    {
      name: '开关量数据',
      yAxisIndex: 1,
      type: 'line',
      step: true,
      showSymbol: false,
      hoverAnimation: false,
      data: digitalData
    }
  ]
}

socket.on('Analog', (msg, time) => {
  now = new Date(time);
  const point = {
    name: now.toString(),
    value: [
      now,
      msg
    ]
  }
  analogData.shift();
  analogData.push(point);

  // myChart.setOption({
  //   series: {data}
  // });
  myChart.setOption(
    {
      series: [
        {
          data: analogData
        },
        {
          data: digitalData
        }
      ]
    }
  )
});

socket.on('Digital', (msg, time) => {
  now = new Date(time);  
  const point = {
    name: now.toString(),
    value: [
      now,
      msg
    ]
  }
  digitalData.shift();
  digitalData.push(point);

  myChart.setOption(
    {
      series: [
        {
          data: analogData
        },
        {
          data: digitalData
        }
      ]
    }
  )
});


myChart.setOption(option);