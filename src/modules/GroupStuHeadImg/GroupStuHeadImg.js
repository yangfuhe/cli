import React from 'react'
import './GroupStuHeadImg.scss'
import {Link } from 'react-router-dom'

export default class groupStuHeadImg extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
        var {headimgurls=[]} = this.props;
        var stuCounts = headimgurls.length;
		return (
            <div className={"item_head item_head_"+stuCounts}>
                {headimgurls.length>0?(
                        headimgurls.map((item,index)=>(
                            <div ><img src={item}/></div>
                        ))
                    ):(
                        <i className="iconfont icon-Style_user-1"></i>
                    )
                }
            </div>
		)
	}
}
