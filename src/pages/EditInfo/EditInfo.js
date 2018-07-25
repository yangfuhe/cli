import React from 'react'
import { hot } from 'react-hot-loader'
import DB from '@DB'
import './EditInfo.scss'
import '@pages/base.css'
import ModalTips from '@comp/ModalTips'

class EditInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isShowDelete: true,
			isShowModal: false,
			tipText: '姓名不能为空',
			tipType: true
		}
	}
	componentDidMount() {
		DB.My.getUserInfo().then(data => {
			this.setState({
				username: data.user.name
			})
		})
	}
	handleChange(event) {
		const {isShowModal} = this.state
        if(event.target.value){
            this.setState({
                isShowModal: false,
				username: event.target.value,
				isShowDelete: event.target.value
            })
        } else {
			this.setState({
                username: event.target.value,
				isShowDelete: event.target.value
            })
		}
	}
	clear() {
		this.setState({
			username: '',
			isShowDelete: false
		})
	}
	save() {
		if (!this.state.username.trim()) {
			this.setState({
				tipText: '姓名不能为空',
				isShowModal: true,
				tipType: false
			})
		} else {
			DB.My.editName({
				name: this.state.username.trim()
			}).then(data => {
				this.setState({
					tipText: '保存成功',
					isShowModal: true,
					tipType: true
				})
				setTimeout(() => {
					wx.miniProgram.reLaunch({url: '/pages/my/my'})
				}, 1000);
			}).catch(err => {
				this.setState({
					tipText: err.errorMsg,
					isShowModal: true,
					tipType: false
				})
			})
		}
	}
	tipClose(){
		this.setState({
            isShowModal:false
        })
	}
	render() {
		return (
			<div className='edit-info bg-cover'>
				<div className="input text-title">
					<input type="text" maxLength='10' placeholder='请输入您的姓名' value={this.state.username} onChange={event => {this.handleChange(event)}}/>
					{this.state.isShowDelete && <img onClick={() => {this.clear()}} src={prefix + '/homework/assets/images/icon-close.png'} alt="" className="delete"/>}
				</div>
				<div onClick={() => {this.save()}} className="button bg-primary">保存</div>
				<ModalTips type={this.state.tipType} tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default hot(module)(EditInfo)
