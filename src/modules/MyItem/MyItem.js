import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import DB from '@DB'
import './MyItem.scss'
import '@pages/base.css'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			classList: [
				{
					icon: 'icon-Style_user-4',
					title: '教师管理',
					url: '/pages/teacherManag/teacherManag'
				},
				{
					icon: 'icon-Style_text-data',
					title: '数据报告',
					url: '/pages/statistics/statistics'
				},
				{
					icon: 'icon-Style_account-organ',
					title: '切换机构',
					url: '/pages/switchOrg/switchOrg'
				},
				{
					icon: 'icon-Style_account-organ',
					title: '机构开通',
					url: '/pages/isErp/isErp'
				},
				{
					icon: 'icon-Style_text-pen1',
					title: '我的作业',
					url: '/pages/workRecord/workRecord'
				}
			],
			isInRouterChange: true
		}
	}
	timeFormat(date) {
		function full(number) {
			return number < 10 ? '0' + number : number
		}
		return `${date.getFullYear()}.${full(date.getMonth() + 1)}.${full(date.getDate())}`
	}
	changeRouter(url) {
		// 解决点击跳转出现多个页面的问题
		if (this.state.isInRouterChange) {
			this.setState({
				isInRouterChange: false
			})
			const that = this
			// 家长情况下跳转我的作业并传参
			wx.miniProgram.navigateTo({
				url: (this.props.userInfo && this.props.userInfo.identity === 2) ? `${url}?stuId=${this.props.userInfo.stuinfo.stu_id}&identity=2&me=true` : url
			})
			setTimeout(() => {
				that.setState({
					isInRouterChange: true
				})
			}, 1000);
		}
	}

	render() {
		var rendList, overdueDate
		if(this.props.userInfo && this.props.userInfo.identity && this.props.userInfo.identity === 1) {
			// 判定是否教师身份
			if(this.props.userInfo.is_manager) {
				// 判定是否是管理员
				rendList = this.state.classList.slice(0,3),
				overdueDate = this.timeFormat(new Date(this.props.validateDate))
			} else {
				// 不是管理员的普通教师
 				rendList =this.state.classList.slice(2,3)
			}
		} else if (this.props.userInfo && this.props.userInfo.identity && this.props.userInfo.identity === 2){
			// 学员家长
			rendList = this.state.classList.slice(4,5)
		} else {
			// 游客登录
			rendList = this.state.classList.slice(3,4)
		}
		// 机构类型 专业版 1的情况不现实续费
		const type = this.props.type !== 1 
		return (
			<div className='my-item'>
				{this.props.userInfo && this.props.userInfo.is_manager && <div className="item" >
					<img className='icon-vip' src={prefix + '/homework/assets/images/icon-vip.png'} alt=""/>
					<p className="title">我的会员</p>
					<p className="outdate">{overdueDate} 到期</p>
					{type && <p className="pay" onClick={() => {this.changeRouter(`/pages/vip/vip?isOverdue=${overdueDate}`)}}>去续费</p>}
				</div>}
				{rendList.map(ele => <div className="item" onClick={() => {this.changeRouter(ele.url)}}>
					<i className={'iconfont logo icon-dark ' + ele.icon}></i>
					<p className="title">{ele.title}</p>
					<i className="iconfont icon-tongyong_Arrow-right more icon-tint"></i>
				</div>)}
			</div>
		)
	}
}

export default hot(module)(Home)
