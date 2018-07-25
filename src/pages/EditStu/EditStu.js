import React from 'react'
import { hot } from 'react-hot-loader'
import DB from '@DB'
import './EditStu.scss'
import '@pages/base.css'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import { Spin } from 'antd'
const loading = () => <Spin/>
import ModalTips from '@comp/ModalTips'
// 异步加载页面的方式(基于组件的分割)：
const ChooseRelation = Loadable({
    loader: () => import('@modules/ChooseRelation'),
    loading
  });


class EditStu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stuname: '',
			relation: '',
			isShowDelete: true,
			isShowModal: false,
			tipText: '姓名不能为空',
			tipType: true
		}
	}
	componentDidMount() {
		DB.My.getUserInfo().then(data => {
			this.setState({
				stuname: data.user.stuinfo.name,
				relation: data.user.stuinfo.reverse_relation || '本人'
			})
		})
	}
	handleChange(event) {
		const {isShowModal} = this.state
        if(event.target.value){
            this.setState({
                stuname: event.target.value,
				isShowModal: false,
				isShowDelete: event.target.value
            })
        } else {
			this.setState({
                stuname: event.target.value,
				isShowDelete: event.target.value,
				isShowModal: false
            })
		}
	}

	handleClick() {
		this.setState({
			isShowRelation: true,
			isShowModal: false
		})
	}

	handleCancel(){
		this.setState({
			isShowRelation: false,
			isShowModal: false
		})
	}
	clear(){
		this.setState({
			stuname: '',
			isShowDelete: false,
			isShowModal: false
		})
	}

	handleConfirm(ele, index) {
		this.setState({
			isShowRelation: false,
			relation: ele,
			isShowModal: false
		})
	}

	save() {
		if (!this.state.stuname.trim()) {
			this.setState({
				tipType: false,
				isShowModal: true,
				tipText: '学员姓名不能为空'
			})
		} else if(!this.state.relation) {
			this.setState({
				tipType: false,
				isShowModal: true,
				tipText: '请选择当前学员关系'
			})
		}else {
			DB.My.editStuInfo({
				name: this.state.stuname.trim(),
				reverse_relation: this.state.relation === '本人' ? '' : this.state.relation
			}).then(data => {
				this.setState({
					tipType: true,
					tipText: '保存成功',
					isShowModal: true
				})
				setTimeout(() => {
					wx.miniProgram.reLaunch({url: '/pages/my/my'})
				}, 1000);
			}).catch(err => {
				this.setState({
					tipType: false,
					tipText: err.errorMsg,
					isShowModal: true
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
			<div className='bg-cover edit-stu'>
				<div className="input text-sup">
					<input type="text" placeholder='请输入学员姓名' maxLength='10' value={this.state.stuname} onChange={event => {this.handleChange(event)}}/>
					{this.state.isShowDelete && <img onClick={() => {this.clear()}} src={prefix + '/homework/assets/images/icon-close.png'} alt="" className="delete"/>}
				</div>
				<div className="relation text-title" onClick={() => {this.handleClick()} }>
					选择关系
					<p className="choose-relation">{this.state.relation}<i className="iconfont icon-tongyong_Arrow-right more icon-tint"></i></p>
				</div>
				<div onClick={() => {this.save()}} className="button bg-primary">保存</div>
				<ChooseRelation onCancel={() => {this.handleCancel()}} onConfirm={(ele, index) => {this.handleConfirm(ele,index)}} show={this.state.isShowRelation}></ChooseRelation>
				<ModalTips type={this.state.tipType} tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default hot(module)(EditStu)
