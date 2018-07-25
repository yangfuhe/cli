import React from 'react'
import './Listtab.scss'
import {Link } from 'react-router-dom'

export default class Listtab extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hasNavigateTo:true
		}
	}
	goNavigateTo(url){
        let {hasNavigateTo} = this.state;
        let that = this;
        
        if(hasNavigateTo){
            this.setState({
                hasNavigateTo:false
            });
            wx.miniProgram.navigateTo({
                url: url,
                success(res){
                    setTimeout(function(){
                        that.setState({
                            hasNavigateTo:true
                        })
                    },3000)
                }
            })
        }
    }
	goWorkList(groupId,identity){
		wx.miniProgram.redirectTo({url: `/pages/workList/workList?group_id=${groupId}&identity=${identity}`})
	}
	goZanList(groupId,identity){
		wx.miniProgram.redirectTo({url: `/pages/zanList/zanList?group_id=${groupId}&identity=${identity}`})
	}
	creatHomework(groupId){
		if(groupId!=='demo'){
			wx.miniProgram.redirectTo({url: `/pages/createHomework/createHomework?group_id=${groupId}`})
		}
	}
	render() {
		var {on, identity ,groupId} = this.props;
		return (
			<div className="list_nav flex-h ai-center">
				<div className={on==="WorkList"?"flex1 on":"flex1"} onClick={(e)=>this.goWorkList(groupId,identity)}>
					<i className="iconfont icon-Style_Style-text"></i>作业薄
				</div>
				{identity==1&&
					<div className="flex1 " onClick={(e)=>this.creatHomework(groupId)}><i className="iconfont icon-tongyong_Plus-solid add_btn"></i></div>
				}
				<div className={on==="ZanList"?"flex1 on":"flex1"} to={`/zanList/${groupId}`} onClick={(e)=>this.goZanList(groupId,identity)}>
					<i className="iconfont icon-Style_Style-like"></i>点赞榜
				</div>
			</div>
		)
	}
}
