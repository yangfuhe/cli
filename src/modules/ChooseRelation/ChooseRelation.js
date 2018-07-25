import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import DB from '@DB'
import '@pages/base.css'
import './ChooseRelation.scss'

class ChooseRelation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			relationList: ['本人', '爸爸', '妈妈', '家长']
		}
	}

	render() {
		return (
			<div className='choose-relation-container'>
				<div className={this.props.show ? 'choose-relation-list' : 'none choose-relation-list'}>
				</div>
				<div id='box' className={this.props.show ? 'show box' : 'box'}>
					<div onClick={() => {this.props.onCancel()}} className="cancel text-sup">取消</div>
					{this.state.relationList.map((ele, index) => <div onClick={() => {this.props.onConfirm(ele,index)}} className="item text-title">{ele}</div>)}
				</div>
			</div>
		)
	}
}

export default hot(module)(ChooseRelation)
