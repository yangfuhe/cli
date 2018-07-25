import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import TeaHomework from '@modules/TeaHomework'
import StuHomework from '@modules/StuHomework'
import SlideToggle from '../../components/SlideToggle'
import DB from '@DB'
import './WorkDetail.scss'

class WorkDetail extends PureComponent {
	constructor(props){
        super(props);
        const gropuId = this.props.match.params.groupId;
        console.log(gropuId);
        this.state = {
            gropuId:gropuId,
            hasMore: 1,
            page:{
                currpage:1,
                pagesize:2,
                pagetatol:10
			},
            teaHeight:0,//教师作业内容高度
            identity:0,//0老师,1学生
            ispost:0,//作业是否已经提交过；0：不是，1：是
            teaDataWork:{
                name:'每天阅读一篇文章1',
                teaName:'yuli老师',
                timer:'2018.04.10 09:34',
                content:{
                    text:'我是正文我是正文我是正文我是正文我是正',
                    audioList:[
                        {id:1,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'},
                        {id:2,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'}
                    ],
                    // imgList:[
                    //     {src:''},
                    //     {src:''},
                    //     {src:''},
                    //     {src:''}
                    // ],
                    videoList:[
                        {id:5,src:'http://122.228.251.152/variety.tc.qq.com/AJMgVE52T1l6ADvVzaJGJ6JIHJSwEdvsFRnGCKbCfyyM/p0200a0gfqt.p201.1.mp4?vkey=D41CC11919C44EECC0481270C10D3B382F8AC0F928A56FBE003CC5615D9355A2B7220CDBB1F14CA14471E01052D900945655842C160EAB6611807C3F9522967604F07E78BFA1FD4209F8EC20D3A5E94127C9BBC7267253B60E082FFD1819162733D1A873B023C6C3B7A20D72BC3D371C93A121046FEA9F8F&platform=10201&sdtfrom=&fmt=shd&level=0'},
                        {id:8,src:'http://122.228.251.152/variety.tc.qq.com/AJMgVE52T1l6ADvVzaJGJ6JIHJSwEdvsFRnGCKbCfyyM/p0200a0gfqt.p201.1.mp4?vkey=D41CC11919C44EECC0481270C10D3B382F8AC0F928A56FBE003CC5615D9355A2B7220CDBB1F14CA14471E01052D900945655842C160EAB6611807C3F9522967604F07E78BFA1FD4209F8EC20D3A5E94127C9BBC7267253B60E082FFD1819162733D1A873B023C6C3B7A20D72BC3D371C93A121046FEA9F8F&platform=10201&sdtfrom=&fmt=shd&level=0'},
                        {id:9,src:'http://122.228.251.152/variety.tc.qq.com/AJMgVE52T1l6ADvVzaJGJ6JIHJSwEdvsFRnGCKbCfyyM/p0200a0gfqt.p201.1.mp4?vkey=D41CC11919C44EECC0481270C10D3B382F8AC0F928A56FBE003CC5615D9355A2B7220CDBB1F14CA14471E01052D900945655842C160EAB6611807C3F9522967604F07E78BFA1FD4209F8EC20D3A5E94127C9BBC7267253B60E082FFD1819162733D1A873B023C6C3B7A20D72BC3D371C93A121046FEA9F8F&platform=10201&sdtfrom=&fmt=shd&level=0'}
                    ]
                }
            },
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
                    content:'加载的',
                    image_url:['111','222'],
                    audio_url:[],
                    video_url:[],
                    like:{
                        num:12,//点赞数
                        liked:false,//我点赞了吗
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
    componentDidMount() {
        var {clientHeight} = this.teaChild.TeaHomework;
        this.setState({
            teaHeight:clientHeight
        })
    }
    render(){
        var {teaHeight, ispost, identity, teaDataWork, stuDataWork, hasMore, gropuId} = this.state;
        return (
            <div className="WorkDetail">
                <Tloader 
                    className={identity===0?"tloader":"tloader pb54"}
                    onLoadMore={(resolve) => this.loadMore(resolve)}
                    hasMore={hasMore}>
                        <SlideToggle height={teaHeight}>
                            <TeaHomework 
                                ref={r => { this.teaChild = r; }}
                                teaData={teaDataWork}>
                            </TeaHomework>
                        </SlideToggle>
                        <div className="stu_list_box">
                            {(stuDataWork&&stuDataWork.length>0)?(
                                    stuDataWork.map((stuwork,index)=>
                                        <StuHomework 
                                            stuData={stuwork} 
                                            identity={identity}
                                            key={index}
                                            gropuId={gropuId}
                                            isWatchAll={true}
                                            isWatchOne={true}
                                            imgNum={3}>
                                        </StuHomework>
                                    )
                                ):(

                                    <div className="no_studata">{identity===0?'还没有人提交作业':'还没有人提交作业，快去提交吧'}</div>
                                )
                            }
                        </div>
                        {identity===1&&
                            <div className="sub_btn_box">
                                <Link to="/" className="sub_btn">{ispost===0?'提交作业':'再次提交'}</Link>
                            </div>
                        }
                </Tloader>
            </div>
        )
    }
}
export default WorkDetail