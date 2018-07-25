import React from 'react'
import { hot } from 'react-hot-loader'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import DB from '@DB'
import { Spin } from 'antd'
import './Overdue.scss'
import ModalTips from '@comp/ModalTips'
import SimpleModal from '@comp/SimpleModal'
class Overdue extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orgName: '',
			message: {},
			isShowError: false,
			type: ''
		}
	}
	componentDidMount() {
		// 获取小程序页面传入的cookie写入h5页面
		this.props.location.search && (document.cookie = this.props.location.search.split('?')[1].split('httponly')[0])
		this.handleRequest()
	}
	handleRequest() {
		DB.My.getUserInfo().then(data => {
			DB.My.getOrgName({
				_id: data.user.org_id
			}).then(res => {
				let list = []
				data.sign.users.map(ele => {
					ele.identity === 1 && list.push(ele)
				})
				this.setState({
					message: data,
					isShowSwitchOrg: list.length > 1,
					orgName: res.name,
					isShowModal: false
				})
			})
			DB.My.validate().then(res => {
				this.setState({
					type: res.type
				})
			})
		})
	}
	renew() {
		if (this.state.type === 1) {
			this.setState({
				isShowError: true,
				isShowModal: false
			})
		} else {
			wx.miniProgram.reLaunch({url: '/pages/vip/vip'})
		}
	}
	switchOrg() {
		wx.miniProgram.reLaunch({url: '/pages/switchOrg/switchOrg'})
	}
	handleError() {
		this.setState({
			isShowError: false,
			isShowModal: false
		})
	}
	handleRole() {
		DB.My.changeIdentity().then(data => {
			this.setState({
				isShowModal: true
			})
			setTimeout(() => {
				wx.miniProgram.reLaunch({url: '/pages/index/index'})
			}, 2000);
		})
	}
	tipClose() {
		this.setState({
			isShowModal: false
		})
	}
	render() {
		const isShowSwitchRole = this.state.message.sign && this.state.message.sign.identitys.length === 2
		const isManager = this.state.message.user && this.state.message.user.is_manager
		return (
			<div className='org-overdue'>
				<img className='header center' src={prefix + '/homework/assets/images/org-overdue.png'} alt=""/>
				<div className="prompt center">{this.state.orgName}机构会员到期喽，{isManager ? '快去续费吧' : '快去通知管理员续费吧'}</div>
				{isManager && <div className="button center bg-primary" onClick={() => {this.renew()}}>立即续费</div>}
				<div className="switch">
					{this.state.isShowSwitchOrg &&<div className={isShowSwitchRole ? 'switch-org' : 'switch-org center'} onClick={()=> {this.switchOrg()}}>切换机构</div>}
					{isShowSwitchRole &&<div  className={this.state.isShowSwitchOrg ? 'switch-stu' : 'switch-stu center'}  onClick={() => {this.handleRole()}}>{this.state.isShowSwitchOrg && <div className="line"></div>}切换为学员</div>}
				</div>
				{this.state.isShowError&&
					<SimpleModal
						// title={'标题'}
						text={'专业版机构请前往ERP续费'}
						btnText={'我知道了'}
						status={'warn'}  //这儿遗鸥三种状态，success，fail，warn
						success={(e)=>this.handleError()}
					/>}
				<ModalTips type tipText='已切换为学员' isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default hot(module)(Overdue)
