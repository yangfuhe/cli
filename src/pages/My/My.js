import React from 'react'
import { hot } from 'react-hot-loader'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import { Spin } from 'antd'
import DB from '@DB'
import './My.scss'
import ModalTips from '@comp/ModalTips'
import SimpleModal from '@comp/SimpleModal'

const loading = () => <Spin/>
// 异步加载页面的方式(基于组件的分割)：
const User = Loadable({
    loader: () => import('@modules/UserInfoBar'),
    loading
  });

const Item = Loadable({
	loader: () => import('@modules/MyItem'),
    loading
});


class My extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userInfo: {},
			signInfo: {
				wx: {}
			},
			errorText: '是否确认退出登录',
			isShowDelete: false,
			errorMessage: '',
			isShowError: false,
			overdate: '',
			tipText: '',
			isShowModal: false,
			type: 0
		}
	}

	componentDidMount() {
		// 获取小程序页面传入的cookie写入h5页面
		this.props.location.search && (document.cookie = this.props.location.search.split('?')[1].split('httponly')[0])
		this.request()
	}
	request() {
		DB.My.getUserInfo().then(data => {
			if (data.user && data.user.identity === 1) {
				// 老师的情况下进行机构校验
				DB.My.validate().then(res => {
					this.setState({
						userInfo: data.user,
						signInfo: data.sign,
						overdate: res.validate_date,
						type: res.type,
						isShowModal: false
					})
				})
			} else {
				this.setState({
					userInfo: data.user,
					signInfo: data.sign,
					isShowModal: false
				})
			}
		}).catch(err => {
			this.setState({
				isShowError: true,
				isShowModal: false,
				errorMessage: err.errorMsg || 'Internal Server Error'
			})
		})
	}
	handleChange() {
		this.setState({
			isShowModal: true,
			tipText: `已切换为${this.state.userInfo.identity % 2 ? '学员' : '教师'}`,
		})
		this.request()
	}
	logout() {
		this.setState({
			isShowDelete: true,
			isShowModal: false
		})
	}
	ModalSuc() {
		this.setState({
			isShowDelete: false,
			isShowModal: false
		})
		DB.My.logout().then(res => {
			console.log(res)
			if (res === '退出成功') {
				wx.miniProgram.postMessage({type: 'logout' })
				wx.miniProgram.reLaunch({url: '/pages/index/index'})
			}
		}).catch(err => {
			this.setState({
				isShowError: true,
				errorMessage: err.errorMsg,
				isShowModal: false
			})
		})
	}
	ModalCal() {
		this.setState({
			isShowDelete: false,
			isShowModal: false
		})
	}
	goToHome() {
		wx.miniProgram.reLaunch({url: '/pages/groupList/groupList'})
	}
	handleError() {
		this.setState({
			isShowError: false,
			isShowModal: false
		})
		wx.miniProgram.postMessage({type: 'logout' })
		wx.miniProgram.reLaunch({url: '/pages/index/index'})
	}
	// 错误的请求回调
	handleRequestError(error) {
		this.setState({
			isShowError: true,
			isShowModal: false,
			errorMessage: err.errorMsg || 'Internal Server Error'
		})
	}
	tipClose() {
		this.setState({
            isShowModal:false
        })
	}
	render() {
		return (
			<div className='page-my'>
				<User onError={error => {this.handleRequestError(error)}} userInfo={this.state.userInfo} signInfo={this.state.signInfo} onChange={() => {this.handleChange()}}></User>
				<Item userInfo={this.state.userInfo} validateDate={this.state.overdate} type={this.state.type}></Item>
				<div className="my-button" onClick={() => {this.logout()}}>退出登录</div>
				<div className="home" onClick={() => {this.goToHome()}}><i className='iconfont icon-Style_basic-home logo'></i></div>
				{this.state.isShowDelete&&
					<SimpleModal
						// title={'标题'}
						text={this.state.errorText}
						btnText={'确定'}
						cancleText={'取消'}
						status={'warn'}  //这儿遗鸥三种状态，success，fail，warn
						success={(e)=>this.ModalSuc()}
						cancle={(e)=>this.ModalCal()}
                    />
				}
				{this.state.isShowError&&
					<SimpleModal
						// title={'标题'}
						text={this.state.errorMessage}
						btnText={'我知道了'}
						status={'warn'}  //这儿遗鸥三种状态，success，fail，warn
						success={(e)=>this.handleError()}
					/>}
				<ModalTips type tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default hot(module)(My)
