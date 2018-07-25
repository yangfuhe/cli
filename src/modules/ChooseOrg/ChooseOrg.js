import React from 'react'
import { hot } from 'react-hot-loader'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import DB from '@DB'
import '@pages/base.css'
import './ChooseOrg.scss'

class ChooseOrg extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orgList: [],
		}
	}

	componentDidMount() {
		console.log(1)
		DB.My.getOrgList().then(data => {
			data.map(ele => {
				ele.is_current_org && this.props.onChoose(ele)
			})
			this.setState({
				orgList: data
			})
		})
	}

	handleClick(index, select) {
		let orgList = this.state.orgList
		orgList.map(ele => {
			ele._id === select._id && (ele.is_current_org = true)
			ele._id !== select._id && (ele.is_current_org = false)
		})
		this.setState({
			activeIndex: index
		})
		this.props.onChoose(select)
	}

	render() {
		return (
			<div className='choose-org'>
				{this.state.orgList.map((ele, index) => <div onClick={() => {this.handleClick(index,ele)}} className="title text-title">{ele.name}
						{ele.is_current_org && <img src={prefix + '/homework/assets/images/icon-select.png'} alt="" className="logo"/>}
					</div>)}
			</div>
		)
	}
}

export default hot(module)(ChooseOrg)
