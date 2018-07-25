import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import StuHomework from '@modules/StuHomework'

import DB from '@DB'
import '../WorkDetail/WorkDetail.scss'

class WorkRecord extends PureComponent {
	constructor(props){
        super(props);
        const gropuId = this.props.match.params.groupId;
        this.state = {
            gropuId:gropuId,
            hasMore: 1,
            page:{
                currpage:1,
                pagesize:2,
                pagetatol:10
			},
            identity:0,//0老师,1学生
            stuDataWork:[
                {
                    id:1,
                    name:'是我',//用户姓名
                    reverse_relation:0,
                    createTime:'2018.04.10 09:34',//提交时间
                    headimage:String,//头像
                    content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                    image_url:['111','222'],
                    audio_url:[],
                    video_url:[],
                    like:{
                        num:12,//点赞数
                        liked:true,//我点赞了吗
                    },
                    comments:[{//评论
                        name:String,//用户姓名
                        headimage:String,//头像
                        content:String,
                        image_url:[],
                        audio_url:[],
                        video_url:[],
                    }]
                },
                {
                    id:1,
                    name:'是我',//用户姓名
                    reverse_relation:0,
                    createTime:'2018.04.10 09:34',//提交时间
                    headimage:String,//头像
                    content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                    image_url:['111','222'],
                    audio_url:[],
                    video_url:[],
                    like:{
                        num:12,//点赞数
                        liked:true,//我点赞了吗
                    },
                    comments:[{//评论
                        name:String,//用户姓名
                        headimage:String,//头像
                        content:String,
                        image_url:[],
                        audio_url:[],
                        video_url:[],
                    }]
                }
            ]
        }
    }
    loadMore(resolve) {
        setTimeout(() => {
			var cur = this.state.page.currpage+1;
			var l = this.state.page.pagesize*cur;
            var list = this.state.stuDataWork.concat([
                {
                    id:1,
                    name:'是我',//用户姓名
                    reverse_relation:0,
                    createTime:'2018.04.10 09:34',//提交时间
                    headimage:String,//头像
                    content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                    image_url:['111','222'],
                    audio_url:[],
                    video_url:[],
                    like:{
                        num:12,//点赞数
                        liked:true,//我点赞了吗
                    },
                    comments:[{//评论
                        name:String,//用户姓名
                        headimage:String,//头像
                        content:String,
                        image_url:[],
                        audio_url:[],
                        video_url:[],
                    }]
                },
                {
                    id:1,
                    name:'是我',//用户姓名
                    reverse_relation:0,
                    createTime:'2018.04.10 09:34',//提交时间
                    headimage:String,//头像
                    content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                    image_url:['111','222'],
                    audio_url:[],
                    video_url:[],
                    like:{
                        num:12,//点赞数
                        liked:true,//我点赞了吗
                    },
                    comments:[{//评论
                        name:String,//用户姓名
                        headimage:String,//头像
                        content:String,
                        image_url:[],
                        audio_url:[],
                        video_url:[],
                    }]
                }
            ]);
            this.setState({
                page:{
                    currpage:cur,
                    pagesize:2,
                    pagetatol:10
                },
                stuDataWork:list,
                hasMore: l > 0 && l < this.state.page.pagetatol
            });

            resolve();
        }, 2e3);
    }
    render(){
        var {identity, stuDataWork, hasMore, gropuId} = this.state;
        return (
            <div className="WorkDetail">
                <Tloader 
                    className="tloader"
                    onLoadMore={(resolve) => this.loadMore(resolve)}
                    hasMore={hasMore}>
                        {(stuDataWork&&stuDataWork.length>0)&&
                            stuDataWork.map((stuwork,index)=>
                                <div className="record_box">
                                    <StuHomework 
                                        stuData={stuwork} 
                                        identity={identity}
                                        key={index}
                                        isWatchOne={true}
                                        gropuId={gropuId}
                                        imgNum={3}>
                                    </StuHomework>
                                </div>
                            )
                        }
                </Tloader>
            </div>
        )
    }
}
export default WorkRecord