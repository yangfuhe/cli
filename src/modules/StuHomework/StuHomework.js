
import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Audio from '../../components/Audio'
import Video from '../../components/Video'
import DB from '@DB'
import SimpleModal from '../../components/SimpleModal'
import './StuHomework.scss'

/*ceh
isWatchAll:是否显示查看所有提交按钮，默认不展示
isWatchOne:是否显示查看全文按钮,默认不展示
isPlZan:是否显示评论和点赞那一栏，默认展示
*/
class StuHomework extends React.Component {
	constructor(props){
        super(props);
        this.state={
            WorkFlag:false,//是否显示删除该作业弹出框
            del_id:''
        }
    }
    linkChange(id,is_zan){
        //点赞
        // DB.ZanOperate.sendRequest({_id:id,is_zan:!is_zan}).then(data=>{
            
        // })
    }
    delHomework(id){
		this.setState({
			WorkFlag:true,
			del_id:id
		})
	}
	WorkModalSuc(){
		var {del_id} = this.state;
		// DB.TaskDelete.sendRequest({_id:del_id}).then((data)=>{

		// })
		this.setState({
			WorkFlag:false
		});

	}
	WorkModalCal(){
		this.setState({
			WorkFlag:false
		})
	}
    render(){
        var {stuData, identity, gropuId, isWatchAll=false, isWatchOne=false, isPlZan=true, imgNum=1000, delBtn=false} = this.props;
        var {WorkFlag} = this.state;
        return (
            <div className="StuHomework">
                <div className="header flex-h ai-center jc-start">
                    <div className="head_img"></div>
                    <div className="info">
                        <div className="name ellipsis">{stuData.name}{stuData.reverse_relation===0?'爸爸':'妈妈'}</div>
                        <div className="timer">{stuData.createTime} 
                            {delBtn&&
                                <span onClick={(e)=>{this.delHomework('删除学生作业')}}>删除</span>
                            }
                        </div>
                    </div>
                </div>
                <div className="content_box">
                    <div className="text">{stuData.content}</div>
                    {(stuData.image_url&&stuData.image_url.length>0)&&
                        <div className="img_box">
                            {
                                stuData.image_url.map((item,index)=>{
                                    if(index<imgNum){
                                        return <div className="img_item" key={index}><img src={item}/></div>
                                    }
                                })
                            }
                        </div>
                    }
                    {(stuData.audio_url&&stuData.audio_url.length>0)&&
                        <div className="audio_box">
                            {
                                stuData.audio_url.map((item,index)=>(
                                    <div className="audio" key={index}><Audio src={item} id={item} className=""/></div>
                                ))
                            }
                        </div>
                    }
                    {(stuData.video_url&&stuData.video_url.length>0)&&
                        <div className="video_box">
                            {
                                stuData.video_url.map((item,index)=>(
                                    <div className="video" key={index}><Video id={item} src={item}></Video></div>
                                ))
                            }
                        </div>
                    }
                    {isWatchOne&&
                        <div className="watch_one"><Link to={`/workDetailOne/${gropuId}/${stuData.id}`}>查看全文<i className="iconfont icon-tongyong_Arrow-right"></i></Link></div>
                    }
                    {isPlZan&&
                        <div className="handle_box  flex-h ai-center">
                            <i className="fenx iconfont icon-Style_basic-share"></i>
                            <div className="flex-h ai-center">
                                {identity===0&&
                                    <div className="ml16 flex-h ai-center"><i className="fenx iconfont icon-Style_chat"></i>{stuData.comments.length}</div>
                                }
                                <div className="ml16 flex-h ai-center" onClick={(e)=>this.linkChange(stuData.id,stuData.like.liked)}>
                                    {stuData.like.liked?(
                                            <div className="liked iconfont icon-SL_-heart-solid"></div>
                                        ):(
                                            <div className="fenx iconfont icon-SL_-heart-line"></div>
                                        )
                                    }
                                    {stuData.like.num}
                                </div>
                            </div>
                        </div>
                    }
                    {isWatchAll&&
                        <div className="watch_all"><Link to={`/WorkRecord/${gropuId}/${stuData.id}`}>查看所有提交<i className="iconfont icon-tongyong_Arrow-right"></i></Link></div>
                    }
                </div>
                {WorkFlag&&
					<SimpleModal
						// title={'标题'}
						text={'确定删除该作业吗？'}
						btnText={'确定'}
						cancleText={'取消'}
						//status={'success'}  //这儿遗鸥三种状态，success，fail，warn
						success={(e)=>this.WorkModalSuc()}
						cancle={(e)=>this.WorkModalCal()}
                    />
				}
            </div>
        )
    }
}
export default StuHomework;