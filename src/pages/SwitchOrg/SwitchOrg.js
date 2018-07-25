import React from 'react'
import { hot } from 'react-hot-loader'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import DB from '@DB'
import { Spin } from 'antd'
import './SwitchOrg.scss'
import ModalTips from '@comp/ModalTips'
const loading = () => <Spin/>
// 异步加载页面的方式(基于组件的分割)：
const ChooseOrg = Loadable({
    loader: () => import('@modules/ChooseOrg'),
    loading
});
class SwitchOrg extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: '',
			isShowModal: false,
			tipText: '切换成功',
			isOverDue: false,
			tipType: false
		}
	}
	handleChoose(selectedOrg) {
		this.setState({
			id: selectedOrg._id,
			// 判定机构是否过期
			isOverDue: new Date().getTime() > selectedOrg.validate_date,
			isShowModal: false
		})
	}
	save() {
		DB.My.changeOrg({
			orgId: this.state.id
		}).then(data => {
			console.log(data)
			this.setState({
				tipType: true,
				isShowModal: true,
				tipText: '切换成功'
			})
			// 根据切换的机构是否过期跳转不同分支页面
			setTimeout(() => {
				if (this.state.isOverDue) {
					wx.miniProgram.reLaunch({url: '/pages/overdue/overdue'})
				} else {
					wx.miniProgram.reLaunch({url: '/pages/my/my'})
				}
			}, 2000);
		}).catch(err => {
			this.setState({
				isShowModal: true,
				tipType: false,
				tipText: err.errorMsg
			})
		})
	}

	tipClose(){
		this.setState({
            isShowModal:false
        })
	}
	render() {
		return (
			<div className='switch-org bg-cover'>
				<div className="title text-minor">请选择要切换的机构</div>
				<ChooseOrg className='' onChoose={selectedOrg => {this.handleChoose(selectedOrg)}}></ChooseOrg>
				<div className="container">
					<div onClick={() => {this.save()}} className="button bg-primary">切换机构</div>
				</div>
				<ModalTips type={this.state.tipType} tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default hot(module)(SwitchOrg)
