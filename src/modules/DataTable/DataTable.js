import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import DB from '@DB'
import '@pages/base.css'
import './DataTable.scss'

class DataTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabList: ['创建作业', '提交作业', '评价作业'],
			activeIndex: 0,
			currentDate: '',
			currentMonth: '',
			currentYear: '',
			chart: null,
			chartList: '',
			devicePixelRatio: 1
		}
	}
	getRequestParams(date = new Date()) {
		var y = date.getFullYear()
		var m = date.getMonth()
		var endY = y, endM = m + 1
		if (m === 11) {
			endY = y + 1
			endM = 0
		}
		return {
			start: new Date(y, m, 1).getTime(),
			end: new Date(endY, endM, 1).getTime() - 1
		}
	}
	componentDidMount() {
		// 确定当前日期月份
		this.setState({
			currentMonth: new Date().getMonth(),
			currentYear: new Date().getFullYear(),
			devicePixelRatio: window.devicePixelRatio
		},() => {
			// 第一次请求获取数据
		const params = this.getRequestParams()
		const t = this
		DB.My.task(params).then(res => {
			var data = t.getChartsData(res.list)
			this.drawTable(data)
			})
		})
		// 监听选择日期
		emitter.addListener('handleDateChange', date => {
			this.setState({
				currentDate: this.dateFormat(date) + '01',
				currentMonth: date.getMonth(),
				currentYear: date.getFullYear()
			},() => {
				// 之后的请求
			const params = this.getRequestParams(new Date(this.state.currentYear, this.state.currentMonth))
			const t = this
			const api = this.state.activeIndex ? (this.state.activeIndex === 1 ? 'commit' : 'comment') : 'task'
			DB.My[api](params).then(res => {
				var data = t.getChartsData(res.list)
				this.drawTable(data)
			})
			})
		})
	}
	// 图标数据
	getChartsData(data) {
		var dayCount = new Date(this.state.currentYear,this.state.currentMonth + 1, 0).getDate();
		var dateList = []
		var min,max
		if (data.length) {
			min = new Date(data[0].createTimestamp * 1000).getDate()
			max = new Date(data[data.length - 1].createTimestamp * 1000).getDate()
		} else {
			min = 1
			max = 0
		}
		// 获取本月最大值
		var maxValue
		for (var i = 0 ;i < data.length; i++) {
			dateList.push(data[i].zy)
			if (!i) {
				maxValue = data[i].zy
			} else {
				data[i].zy > maxValue && (maxValue = data[i].zy)
			}
		}
		// 判定时间注入数据
		dateList = new Array(min - 1).fill(0).concat(dateList).concat(new Array(dayCount - max).fill(0))
		// 获取本月天数数组
		var days = []
		for (var i = 1 ;i <= dayCount; i++) {
			var res = i < 10 ? '0' + i : i + ''
			days.push(res)
		}
		var topNumber = Number(maxValue || 0) ? Number(maxValue) : 0
		if (topNumber) {
			topNumber = topNumber % 5 ? (Math.ceil(topNumber / 5)) * 5 : topNumber + 5
		}
		return {
			max: topNumber,
			min: 0,
			categories: days,
			data: dateList
		}
	}
	dateFormat(date) {
		const y = this.state.currentYear
		const m = this.state.currentMonth
		date = new Date(y,m)
		const dateFormat = date.getFullYear() + '.' + (date.getMonth() < 9 ? ('0' + ((date.getMonth() + 1))) : (date.getMonth() + 1)) + '.'
		return dateFormat
	}

	handleTab(index) {
		const t = this
		const params = this.getRequestParams(new Date(this.state.currentYear, this.state.currentMonth))
		const api = index ? (index === 1 ? 'commit' : 'comment') : 'task'
		DB.My[api](params).then(res => {
			var data = t.getChartsData(res.list)
			this.drawTable(data)
		})
		this.setState({
			activeIndex: index
		})
	}
	drawTable(data) {
		// 图表初始化
	const _this = this
	var chart = new Highcharts.Chart(this.refs.container, {
		chart: {
				type: 'areaspline',
				panning: true,
				pinchType: 'x',
				resetZoomButton: {
						position: {
								y: -1000
						}
				}
		},
		credits: {
				enabled: false
		},
		title: {
			text:null,
			},
		xAxis: {
			tickLength: 0,
			minPadding:0 ,
			labels: {
					rotation:0,
					style : {
						fontSize: '1.3rem',
						color: 'rgba(21,30,38,0.5)',
						transform: 'translateY(1rem)'
					}
			},
			categories: data.categories
		},
		yAxis: {
				max: data.max,
				min: data.min,
				tickInterval: (data.max - data.min) / 5,
				lineWidth: 1,
				gridLineWidth: 0,
				title: {
						text: null
				},
				labels: {
					style : {
						fontSize: '1.3rem',
						color: 'rgba(21,30,38,0.5)',
						transform: 'translateY(1rem)'
					}
			}
		},
		tooltip: {
			enabled: false,
			followTouchMove: false
		},
		plotOptions: {
			series: {
					connectNulls: true,
					stickyTracking: false,
					allowPointSelect: true,
					events: {
						click: function(event) {
							_this.setState({
								currentDate: _this.dateFormat() + event.point.category,
								number: event.point.options.y
							})
						}
					},
					   lineWidth: 4 *_this.state.devicePixelRatio,
					marker: {
						fillColor:'#6093FF',
						radius: 6 *_this.state.devicePixelRatio,
							states: {
									select: {
											lineColor: '#ffffff',
											fillColor: '#F5A623',
											lineWidth: 2 * _this.state.devicePixelRatio,
											radius: 7 * _this.state.devicePixelRatio
									}
							}
					}
			}
		},
		legend: {
				enabled: false
		},
		series: [{
				color: '#6093FF', // 颜色
				fillOpacity: 0.2, // 透明度
				data: data.data
		}]
	}, function(c) {
		// 动态改变 x 轴范围即可实现拖动
		c.xAxis[0].setExtremes(1, 5, true, true);
		_this.setState({
			currentDate: _this.dateFormat() + data.categories[new Date().getDate() - 1],
			number: data.data[new Date().getDate() - 1]
		})
	});
	chart.series[0].data[new Date().getDate() - 1].select()
	}

	render() {
		return (
			<div className='data-table'>
				<div className="tab">
					{this.state.tabList.map((ele, index) => <div onClick={() => {this.handleTab(index)}} className={this.state.activeIndex === index ? 'tab-item active' : 'tab-item'}>{ele}
					{this.state.activeIndex === index && <div className="line"></div>}</div>)}
				</div>
				<div className="message">
					<div className="number"><span className='digtial'>{this.state.number}</span>份</div>
					<div className="date">{this.state.currentDate}</div>
				</div>
				<div ref='container' className='table'></div>
			</div>
		)
	}
}

export default hot(module)(DataTable)
