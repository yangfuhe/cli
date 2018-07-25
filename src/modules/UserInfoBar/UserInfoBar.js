import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import DB from '@DB'
import './UserInfoBar.scss'


class UserInfoBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isInRouterChange: true
		}
	}
	changeRole() {
		DB.My.changeIdentity().then(data => {
			this.props.onChange()
		}).catch(error => {
			this.props.onError(error)
		})
	}
	changeRouter() {
		// 解决点击跳转出现多个页面的问题
		if (this.state.isInRouterChange) {
			this.setState({
				isInRouterChange: false
			})
			const that = this
			wx.miniProgram.navigateTo({
				url: this.props.userInfo.identity === 1 ? '/pages/editInfo/editInfo' : '/pages/editStu/editStu'
			})
			setTimeout(() => {
				that.setState({
					isInRouterChange: true
				})
			}, 1000);
		}
	}
	render() {
		let username = '';
		if (this.props.userInfo && this.props.userInfo.identity) {
			if (this.props.userInfo.identity === 1) {
				//老师
				username = this.props.userInfo.name
			} else {
				//家长
				username = this.props.userInfo.stuinfo.name + this.props.userInfo.stuinfo.reverse_relation
			}
		} else {
			// 游客显示微信昵称
			username = (this.props.signInfo.wx && this.props.signInfo.wx.nickname) || '作业小叮用户'
		}
		return (
			<div className='container'>
				<div className='username' onClick={() => {this.changeRouter()}}>
				<span className='content'>{username}</span>
				{this.props.userInfo && <i className='iconfont icon-Style_basic-edit edit'></i>}
				</div>
				<div className="tel">{this.props.userInfo ? this.props.userInfo.phone : this.props.signInfo.phone}</div>
				<img src={(this.props.signInfo.wx && this.props.signInfo.wx.headimgurl)} alt="" className={this.props.signInfo.identitys && this.props.signInfo.identitys.length > 1 ? 'avatar' : 'avatar center'} />
				{Array.isArray(this.props.signInfo.identitys) && this.props.signInfo.identitys.length > 1 && <div onClick={() => {this.changeRole()}} className="changeRole">
				<i className="iconfont icon-Style_basic-switch"></i>切换为{this.props.userInfo && this.props.userInfo.identity === 1 ? '学员' : '教师'}</div>}
			</div>
		)
	}
}

export default hot(module)(UserInfoBar)
