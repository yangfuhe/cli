import React from 'react'
import { hot } from 'react-hot-loader'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import { Spin } from 'antd'
import DB from '@DB'
import '../base.css'
import './Statistics.scss'
const loading = () => <Spin/>
// 异步加载页面的方式(基于组件的分割)：
const DataTable = Loadable({
    loader: () => import('@modules/DataTable'),
    loading
});
const DatePicker = Loadable({
    loader: () => import('@modules/DatePicker'),
    loading
});
class Statistics extends React.Component {
	constructor(props) {
		super(props);
		const date = new Date()
		this.state = {
			isOpen: false,
			totalGroups: 0,
			totalStudents: 0,
			date: date.getFullYear() + '.' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1)
		}
	}
	componentDidMount() {
		DB.My.task({
			start: new Date().getTime() / 1000,
			end: new Date().getTime() / 1000,
			is_static: true
		}).then(res => {
			this.setState({
				totalGroups: res.info.totalGroups,
				totalStudents: res.info.totalStudents
			})
		})
	}
	handleSelect(date) {
		this.setState({
			isOpen: false,
			date: date.getFullYear() + '.' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1)
		})
		emitter.emit('handleDateChange', date)
	}
	handleToggle() {
		this.setState({
			isOpen: false
		})
	}
	showMoadl() {
		this.setState({
			isOpen: true
		})
	}
	render() {
		return (
			<div className='statistics bg-cover'>
				<div className="statistics-message">
					<div className="item">
						<div className="number">{this.state.totalGroups}</div>
						<div className="title">班级数</div>
					</div>
					<div className="item">
						<div className="number">{this.state.totalStudents}</div>
						<div className="title">学员数</div>
					</div>
					<div className="date" onClick={() => {this.showMoadl()}}>
						<div className="date-time">{this.state.date}</div>
						<img src={prefix + '/homework/assets/images/show-more.png'} alt="" className="logo"/>
					</div>
				</div>
				<div className='statistics-table'><DataTable ref='table'></DataTable></div>
				<DatePicker
                	dateSteps={[1, 1,]}
					max={new Date()}
					min={new Date(2018, 5, 1)}
                    dateFormat={['YYYY', 'MM']}
                    isOpen={this.state.isOpen}
                    onSelect={date => {this.handleSelect(date)}}
                    onCancel={() => {this.handleToggle(false)}} />
			</div>
		)
	}
}

export default hot(module)(Statistics)
