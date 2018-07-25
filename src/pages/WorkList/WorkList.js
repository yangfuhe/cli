import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import moment from 'moment'
import Listtab from '@modules/Listtab'
import SimpleModal from '@comp/SimpleModal'
import ModalTips from '@comp/ModalTips'
import DB from '@DB'
import './WorkList.scss'

class WorkList extends PureComponent {
	constructor(props){
		super(props);
		
		this.state = {
			isSecond:false,//是否请求过的参数，避免页面闪烁
			userInfo:{
                user:{
                    name: '',
                    identity: '',
                    stuinfo:'',
                    phone: ''
                },
                sign: {
					identitys:[],
					current_identity:'',
                    wx:{
                        nickname:'',
                        headimgurl:'',
                    }
                }
            },
			group_id:'',
			page:{
                pageSize:10,
				pageNum:1,
				pagetatol:20
			},
			hasMore: 1,//0:不显示加载更多，1：显示加载更多
			modalFlag:false,//是否显示弹出框
			del_id:'',//要删除的id
			del_index:'',//要删除的是第几个
			group_name:'群名',
			list:[],
			delText:'', //删除返回结果时的弹窗
			delFlag:false,//删除返回结果时的弹窗
			delStatus:'',//删除返回结果时的弹窗
			tipText:'',
            isShowModal: false
			
		}
	}
	getTaskQlist(){
		var {group_id,page:{pageSize}} = this.state;
		var pageNum = 1;
		DB.Workflow.TaskQlist({group_id,pageSize,pageNum}).then((res)=>{
			var more = +!(res.count<pageSize);
			this.setState({
				isSecond:true,
				group_name:res.group_name,
				list:res.list,
				page:{
					pageSize,
					pageNum,
					pagetatol:res.count,
				},
				hasMore:more,
				isShowModal:false,
			})
		}).catch(err=>{
			this.setState({
				isSecond:true,
				isShowModal:true,
				tipText:err.errorMsg || '您好！服务挂咯！'
			})
		});
	}
	componentDidMount(){
		const group_id = this.props.match.params.groupId;
		const current_identity = this.props.location.search.split('?')[1];
		this.setState({
			group_id:group_id,
			isShowModal:false,
		})
		var {page:{pageSize,pageNum}} = this.state;
		//为示例作业时展示固定内容
		if(group_id!=='demo'){
			DB.GetUser.sendRequest().then((res)=>{
				res.user=res.user==null?{}:res.user;
				this.setState({
					userInfo:{
						...this.state.userInfo,
						...res,
						isShowModal:false,
					}
				});
				if(res.user.create_time){
					this.getTaskQlist();
				}else{
					this.setState({
						isSecond:true,
						isShowModal:false,
					})
				}
			}).catch(err=>{
				this.setState({
					errorStatus:'warn',
					isSecond:true,
					isShowModal:true,
					tipText:err.errorMsg || '您好！服务挂咯！'
				})
			});
		}else{
			var data = Object.assign({}, this.state.userInfo, {sign:{ current_identity: current_identity }})
			this.setState({
				group_name:'英语四班',
				hasMore:0,
				isSecond:true,
				userInfo: data,
				isShowModal:false,
			})
		}
	}
	loadMore(resolve) {
        var {group_id,page} = this.state;
		var cur = page.pageNum+1;
		var l = page.pageSize*cur;
		DB.Workflow.TaskQlist({group_id,pageSize:page.pageSize,pageNum:cur}).then((res)=>{
			var list = this.state.list.concat(res.list);
			this.setState({
				page:{
					pageNum:cur,
					pageSize:page.pageSize,
					pagetatol:page.pagetatol
				},
				list:list,
				hasMore: l > 0 && l < page.pagetatol,
				isShowModal:false,
			});
			resolve();
		}).catch(err=>{
            this.setState({
				isShowModal:true,
				tipText:err.errorMsg || '您好！服务挂咯！'
            })
		});
	}
	//点击删除按钮弹窗
	delList(id,index){
		this.setState({
			delFlag:true,
			del_id:id,
			del_index:index,
			delText:"确定删除该作业吗？",
			isShowModal:false,
		})
	}
	//tipClose组件回调必须将isShowModal改未false
	tipClose(){
		this.setState({
            isShowModal:false
        })
	}
	//点击确认删除
	ModalSuc(){
		var {del_id,del_index} = this.state;
		DB.Workflow.TaskDelete({_id:del_id}).then((res)=>{
			this.getTaskQlist();
            this.setState({
				delFlag:false,
				isShowModal:true,
				tipText:res,
            });
		}).catch(err=>{
			console.log(err)
            this.setState({
				delFlag:false,
                isShowModal:true,
				tipText:err.errorMsg || '您好！服务挂咯！'
            })
		});
	}
	//点击取消
	ModalCal(){
		this.setState({
			delFlag:false,
			isShowModal:false,
		})
	}
	//去创建班级页面
	goCreatHomework(group_id){
		if(group_id!=='demo'){
			wx.miniProgram.redirectTo({url: `/pages/createHomework/createHomework?group_id=${group_id}`})
		}
	}
	//去作业详情页面
	goDetail(id){
		wx.miniProgram.navigateTo({url:`/pages/workDetail/workDetail?task_id=${id}`})
	}
	//去学员管理页面
	gostuManage(group_id){
		if(group_id!=='demo'){
			wx.miniProgram.navigateTo({url: `/pages/stuManage/stuManage?group_id=${group_id}`})
		}
	}
	//返回首页按钮
	goToHome(group_id) {
		if(group_id !== 'demo'){
			wx.miniProgram.reLaunch({url: '/pages/groupList/groupList'})
		}else{
			wx.miniProgram.reLaunch({url: '/pages/index/index'})
		}
	}
	render() {
		var {isSecond,userInfo, list, hasMore, group_id, group_name, errorText, delText, delFlag,delStatus,errorStatus} = this.state;
		const identity = userInfo.sign.current_identity
		return (
			isSecond&&(
			<div className="WorkList">
				<div className="title flex-h ai-center">
					<span className="name">{group_name}</span>
					{
						identity==1&&
						<view onClick={(e)=>{this.gostuManage(group_id)}} className="manage flex-h ai-center"><i className="iconfont icon-Style_basic-setting"></i>学员管理</view>
					}
				</div>
				<div className="list_box">
					{list.length>0?(
						<Tloader className="tloader"
							onLoadMore={(resolve) => this.loadMore(resolve)}
							hasMore={hasMore}>
							{
								list.map((item,index)=>
									<div className="item">
										<div onClick={(e)=>this.goDetail(item._id)}>
											<div className="name ellipsis">{item.title}</div>
											<div className="num"><span>{item.submitnum}人</span>提交</div>
										</div>
										<div className="timer flex-h ai-center">
											<span>{moment(item.pulish_time).format('YYYY.MM.DD HH:mm')}</span>
											{
												identity==1?(
													<i className="del_btn iconfont icon-Style_basic-trash" onClick={(e)=>{this.delList(item._id,index)}}></i>
												):(
													<div className={item.submit?'hui_bg type_btn':'blue_bg type_btn'}>{item.submit?'已提交':'未提交'}</div>
												)
											}
											
										</div>
									</div>
								)
							}
						</Tloader>
						):(
							<div className="demo">
								<div className="item">
									<div className="icon_demo"><img src={prefix+"/homework/assets/images/example.png"}/></div>
									<div onClick={(e)=>{this.goDetail('demo')}}>
										<div className="name ellipsis">阅读英语短文</div>
										<div className="num"><span>1人</span>提交</div>
									</div>
									<div className="timer flex-h ai-center">
										<span>2018.06.24 15:27</span>
									</div>
								</div>
								<div className="go_btn">
									<p>还没有作业噢</p>
									{identity==1&&
										<view onClick={(e)=>{this.goCreatHomework(group_id)}} className="btn">去创建</view>
									}
								</div>
							</div>
						)
					}
				</div>
				<div className="home" onClick={() => {this.goToHome(group_id)}}><i className='iconfont icon-Style_basic-home logo'></i></div>
				<Listtab 
					identity={identity}
					groupId={group_id}
					on='WorkList'>
				</Listtab>
				<ModalTips type tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
				{delFlag&&
					<SimpleModal
					// title={'标题'}
					text={delText}
					btnText={'确定'}
					cancleText={'取消'}
					status={delStatus}  //这儿遗鸥三种状态，success，fail，warn
					success={(e)=>this.ModalSuc()}
					cancle={(e)=>this.ModalCal()}
					/>
				}
			</div>
			)
		)
	}
}

export default WorkList
