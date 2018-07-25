import React from 'react'
import './SlideToggle.scss'
import {Link } from 'react-router-dom'

//用ref取到content的高还有子组件的高度（contHeight:content高度，height:子组件高度，插槽高度）
//比对判断显不显示按钮，用style去控制高度，changeHeight存储当前要执行的是content原始高度还是子组件的高度
//判断当不等于0时，才用style去控制高度，因为componentDidMount会在页面完全挂载好才去执行，呢时候还未给state.changeHeight赋值，所以是0；
export default class SlideToggle extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			flag:true,
			contHeight:0,
			changeHeight:0,
		}
	}
	componentDidMount(){
		var contHeight = this.content.clientHeight;
		this.setState({
			contHeight:contHeight,
			changeHeight:contHeight
		})
	}
	_toggle(flag){
		var {height} = this.props;
		var {contHeight} = this.state;
		if(flag){
			this.setState({
				changeHeight:height,
				flag:!flag
			})
		}else{
			this.setState({
				changeHeight:contHeight,
				flag:!flag
			})
		}
	}
	render() {
		var {contHeight,changeHeight,flag} = this.state;
		var {height} = this.props;
		return (
			<div className="SlideToggle">
				{changeHeight!==0?(
						<div className="content" ref={r=>this.content=r} style={{height:changeHeight}}>
							{this.props.children}
						</div>
					):(
						<div className="content" ref={r=>this.content=r}>
							{this.props.children}
						</div>
					)
				}
				{contHeight<height&&
					<div className="slide_btn" onClick={(e)=>this._toggle(flag)}>
						<span className={flag?'icondown icon':'icon iconup'}>
							<i className="iconfont icon-tongyong_Arrow-down"></i>
						</span>
					</div>
				}
			</div>
		)
	}
}
