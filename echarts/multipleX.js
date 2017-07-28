import echarts from 'echarts';

let myChart = echarts.init(document.getElementById('root'));
let colors = ['#5793f3', '#d14a61', '#675bba'];
let option = {
  title: {
    text: "一周气温变化",
    subtext: "虚构"
  },
  color: colors,
  tooltip: {
    trigfer: 'axis',
    // 使用游标来定位某一x轴上的y轴值
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['最高气温', '最低气温']
  },
  // 调整图形上下的填充
  // grid: {
  //       top: 70,
  //       bottom: 50
  // },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readonly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  // 双x轴使用数组
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一','周二','周三','周四','周五','周六','周日'],
      axisPointer: {
        label: {
          formatter: function (params) {
            return params.value + ' 气温 '
              + '最高' + (params.seriesData.length ? ': ' + params.seriesData[0].data : '')
              + '\t'
              + '最低' + (params.seriesData.length ? ': ' + params.seriesData[1].data : '')
          }
        }
      }
      // x轴显示的方位
      // position: 'top'
    },
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
    // 在哪个grid
    // gridIndex: 1

    // Y轴翻转
    // inverse: true
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'empty'
    },
    {
      type: 'slider',
      yAxisIndex: 0,
      filterMode: 'empty'
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'empty'
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'empty'
    }
  ],
  // 多幅图形
  grid: [
    {
      left: 50,
      right: 50,
      height: '35%'
    },
    {
      left: 50,
      right: 50,
      top: '55%',
      height: '35%'
    }
  ],
  series: [
    {
      name: '最高气温',
      type: 'line',
      data:[11, 11, 15, 13, 12, 10, 20],
      // 点与点之间的连线光滑度
      // smooth: true,
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    },
    {
      name: '最低气温',
      type: 'line',
      data: [1, -2, 2, 7, -5, 3, 4, 6, 0],
      markPoint: {
        data: [
          {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'},
          [
            {
            symbol: 'none',
            x: '90%',
            yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                normal: {
                  position: 'start',
                  formatter: '最大值'
                }
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      }
    }
  ]
};

myChart.setOption(option);