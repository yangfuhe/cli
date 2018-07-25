

import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import StuHomework from '@modules/StuHomework'
import udio.js from '../../components/Audio'
import SimpleModal from '../../components/SimpleModal'
import './WorkDetailOne.scss'

class WorkDetailOne extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tabOn:0,//选中的是评价还有赞列表；0：评价，1：列表
            hasMore: 1,//0:不显示加载更多，1：显示加载更多
            PlFlag:false,//是否显示删除评论弹出框
            identity:1,
            plpage:{
                currpage:1,
                pagesize:5,
                pagetatol:12
            },
            zanpage:{
                currpage:1,
                pagesize:4,
                pagetatol:12
            },
            stuDataWork:{
                id:1,
                name:'是我',//用户姓名
                reverse_relation:0,
                createTime:'2018.04.10 09:34',//提交时间
                headimage:String,//头像
                content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                image_url:['111','222'],
                audio_url:['http://fs.w.kugou.com/201806131545/4d57bbb78e1d30831c01fe670f94e5fa/G129/M08/17/09/IYcBAFsbzZyAVCjfACDyB8xuYSw882.mp3','http://fs.w.kugou.com/201806131653/0003512053b74db55eddef94004c04a1/G132/M07/0D/09/xA0DAFsaalqAXZk8AECGtDA3gOs186.mp3'],
                video_url:[],
                like:{
                    num:12,//点赞数
                    liked:true,//我点赞了吗
                },
                comments:[{//评论
                    name:'yumi老师',//用户姓名
                    headimage:'',//头像
                    content:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                    createTime:'2018.04.10 09:34',
                    image_url:[],
                    audio_url:[],
                    video_url:[],
                }]
            },
            plList:[
                {
                    id:1,
                    name:'yumi老师',
                    timer:'2018.04.10 09:34',
                    content:{
                        text:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                        audioList:[
                            {id:1,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'},
                            {id:2,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'}
                        ],
                        imgList:[
                            {src:''},
                            {src:''},
                            {src:''},
                            {src:''}
                        ],
                    },
                },
                {
                    id:1,
                    name:'yumi老师',
                    timer:'2018.04.10 09:34',
                    content:{
                        text:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                        audioList:[
                            {id:1,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'},
                            {id:2,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'}
                        ],
                        imgList:[
                            {src:''},
                            {src:''},
                            {src:''},
                            {src:''}
                        ],
                    },
                }
            ],
            zanList:[
                {
                    name:'陈嗯嗯',
                    src:''
                },
                {
                    name:'陈嗯嗯',
                    src:''
                },
                {
                    name:'陈嗯嗯',
                    src:''
                },
                {
                    name:'陈嗯嗯',
                    src:''
                }
            ]
        }
    }
    loadMore(resolve) {
        var {tabOn} = this.state;
        if(tabOn===0){
            setTimeout(() => {
                var cur = this.state.plpage.currpage+1;
                var l = this.state.plpage.pagesize*cur;
                var list = this.state.plList.concat([
                    {
                        id:1,
                        name:'yumi老师',
                        timer:'2018.04.10 09:34',
                        content:{
                            text:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                            audioList:[
                                {id:1,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'},
                                {id:2,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'}
                            ],
                            imgList:[
                                {src:''},
                                {src:''},
                                {src:''},
                                {src:''}
                            ],
                        },
                    },
                    {
                        id:1,
                        name:'yumi老师',
                        timer:'2018.04.10 09:34',
                        content:{
                            text:'我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正我是正文我是正文我是正文我是正文我是正',
                            audioList:[
                                {id:1,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'},
                                {id:2,audiosrc:'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'}
                            ],
                            imgList:[
                                {src:''},
                                {src:''},
                                {src:''},
                                {src:''}
                            ],
                        },
                    }
                ]);
                this.setState({
                    plpage:{
                        currpage:cur,
                        pagesize:5,
                        pagetatol:12
                    },
                    plList:list,
                    hasMore: l > 0 && l < this.state.plpage.pagetatol
                });
                resolve();
            }, 2e3);
        }else{
            setTimeout(() => {
                var cur = this.state.zanpage.currpage+1;
                var l = this.state.zanpage.pagesize*cur;
                var list = this.state.zanList.concat([
                    {
                        name:'陈嗯嗯',
                        src:''
                    },
                    {
                        name:'陈嗯嗯',
                        src:''
                    },
                    {
                        name:'陈嗯嗯',
                        src:''
                    },
                    {
                        name:'陈嗯嗯',
                        src:''
                    }
                ]);
                this.setState({
                    zanpage:{
                        currpage:cur,
                        pagesize:4,
                        pagetatol:12
                    },
                    zanList:list,
                    hasMore: l > 0 && l < this.state.zanpage.pagetatol
                });
                resolve();
            }, 2e3);
        }
    }
    changeTab(type){
        console.log(type)
        this.setState({
            tabOn:type,
            hasMore:1
        })
    }
    delList(id){
		this.setState({
			PlFlag:true,
			del_id:id
		})
	}
	PlModalSuc(){
		var {del_id} = this.state;
		// DB.TaskDelete.sendRequest({_id:del_id}).then((data)=>{

		// })
		this.setState({
			PlFlag:false
		});

	}
	PlModalCal(){
		this.setState({
			PlFlag:false
		})
	}
    render(){
        var {stuDataWork, identity, tabOn, hasMore, plList, zanList, PlFlag} = this.state;
        return (
            <div className="WorkDetailOne">
                <Tloader className="tloader pb64"
                    onLoadMore={(resolve) => this.loadMore(resolve)}
                    hasMore={hasMore}>
                    <div className="stuwork_box">
                        <StuHomework 
                            stuData={stuDataWork} 
                            identity={identity}
                            isPlZan={false}
                            delBtn={true}>
                        </StuHomework>
                    </div>
                    <div className="plzan_list">
                        <div className="tab_head flex-h">
                            <span className={tabOn===0?'on':''} onClick={(e)=>{this.changeTab(0)}}>评价 2<em></em></span>
                            <span className={tabOn===1?'on':''} onClick={(e)=>{this.changeTab(1)}}>赞 11<em></em></span>
                        </div>
                        <div className="tab_item">
                            {tabOn===0&&
                                <div className="pj_box">
                                    {(plList&&plList.length>0)?(
                                        plList.map((plitem,index)=>
                                            <div className="item flex-h ai-start" key={index}>
                                                <div className="head"><img  src={prefix+"/homework/assets/images/avatar.png"}/></div>
                                                <div className="flex_1 pl_info">
                                                    <div className="name">{plitem.name}</div>
                                                    <div className="text">
                                                        {plitem.content.text}
                                                    </div>
                                                    <div className="img_box">
                                                    {(plitem.content.imgList&&plitem.content.imgList.length>0)&&
                                                        plitem.content.imgList.map((imgsrc,index)=>
                                                            <div className="img_item"><img/></div>
                                                        )
                                                    }
                                                    </div>
                                                    <div className="audio_box">
                                                        <div className="audio">
                                                            <Audio 
                                                                src={'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'} 
                                                                id={1}
                                                                width={14.5}/>
                                                        </div>
                                                        <div className="audio">
                                                            <Audio 
                                                                src={'http://fs.w.kugou.com/201806101147/a6f41a525b54c955475ab8744ad9c8de/G133/M07/09/15/JYcBAFsZPJuATeoSAEGLYeoHVtA759.mp3'} 
                                                                id={1}
                                                                width={14.5}/>
                                                        </div>
                                                    </div>
                                                    <div className="timer">2018.08.29 20:40<span className="del_btn" onClick={(e)=>this.delList(plitem.id)}>删除</span></div>
                                                </div>
                                            </div>
                                        )):(
                                            <div className="nodata">快去点评论吧</div>
                                        )
                                    }
                                </div>
                            }
                            {tabOn===1&&
                                <div className="zan_box">
                                    {(zanList&&zanList.length>0)?(
                                        zanList.map((zanitem,index)=>
                                            <div className="item flex-h jc-start ai-center" key={index}>
                                                <div className="head"><img  src={prefix+"/homework/assets/images/avatar.png"}/></div>
                                                <div className="name flex_1">{zanitem.name}</div>
                                            </div>
                                        )):(
                                            <div className="nodata">快去点赞吧</div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </Tloader>
                <div className="fixed_tab flex-h ai-center">
                    <div className="btn flex_1 flex-h">
                        <span><i className="iconfont icon-Style_basic-share"></i>分享</span>
                        {stuDataWork.like.liked?(
                                <span><i className="red iconfont icon-SL_-heart-solid"></i>点赞</span>
                            ):(
                                <span><i className="iconfont icon-SL_-heart-line"></i>点赞</span>
                            )
                        }
                    </div>
                    {identity===0&&<Link to="/" className="zan_btn">写评价</Link>}
                </div>
                {PlFlag&&
					<SimpleModal
						// title={'标题'}
						text={'确定删除该评论吗？'}
						btnText={'确定'}
						cancleText={'取消'}
						//status={'success'}  //这儿遗鸥三种状态，success，fail，warn
						success={(e)=>this.PlModalSuc()}
						cancle={(e)=>this.PlModalCal()}
                    />
                }
                
            </div>
        )
    }
}

export default WorkDetailOne