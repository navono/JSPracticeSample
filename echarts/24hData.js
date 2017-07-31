import echarts from 'echarts';

let myChart = echarts.init(document.getElementById('root'));

const data = [
  {name:'2016/12/18 6:38:08', value:['2016/12/18 6:38:08', 80]},
  {name:'2016/12/18 16:18:18', value:['2016/12/18 16:18:18', 60]},
  {name:'2016/12/18 19:18:18', value:['2016/12/18 19:18:18', 90]}
];
const anchor = [
  {name:'2016/12/18 00:00:00', value:['2016/12/18 00:00:00', 0]},
  {name:'2016/12/19 00:00:00', value:['2016/12/19 00:00:00', 0]}
];

let option = {
  title: {
    text: '动态数据 + 时间坐标轴'
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '模拟数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: data
    },
    // {
    //   name:'.anchor',
    //   type:'line', 
    //   showSymbol:false, 
    //   data:anchor,
    //   itemStyle:{normal:{opacity:0}},
    //   lineStyle:{normal:{opacity:0}}
    // }
  ]
};

myChart.setOption(option);