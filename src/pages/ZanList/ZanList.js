import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import Listtab from '@modules/Listtab'
import ModalTips from '@comp/ModalTips'
import DB from '@DB'
import './ZanList.scss'

class ZanList extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
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
			me:{//👈我的排行,如需要
				sum:134,
				name:'我的名字',
				sort:5,//排行
			},
			list:[],
			pickerFlag:false,
            tipText:'',
            isShowModal: false
		}
	}
	componentDidMount(){
		const group_id = this.props.match.params.groupId;
		const current_identity = this.props.location.search.split('?')[1];
		this.setState({
			group_id:group_id
		});
		if(group_id!=='demo'){
			DB.GetUser.sendRequest().then((res)=>{
				res.user=res.user==null?{}:res.user;
				this.setState({
					userInfo:{
						...this.state.userInfo,
						...res
					}
				});
				if(res.user.create_time){
					DB.Workflow.ZanGrouplist({group_id}).then((res)=>{
						this.setState({
							list:res.list,
							me:res.me || ''
						});
					}).catch(err=>{
						this.setState({
							isShowModal:true,
							tipText:err.errorMsg || '您好！服务挂咯！'
						})
					});
				}
				
			}).catch(err=>{
				this.setState({
					list:[],
					isShowModal:true,
					tipText:err.errorMsg || '您好！服务挂咯！'
				})
			});
		}else{
			var data = Object.assign({}, this.state.userInfo, {sign:{ current_identity: current_identity }})
			this.setState({
				userInfo:data
			})
		}
	}
	//tipClose组件回调必须将isShowModal改未false
	tipClose(){
		this.setState({
            isShowModal:false
        })
	}
	flg(identity,index){
		return identity==1?(identity==1&&index>0):(identity==2);
	}
	//返回首页按钮
	goToHome() {
		wx.miniProgram.reLaunch({url: '/pages/groupList/groupList'})
	}
	render() {
		var {group_id, list, me,  userInfo} = this.state;
		const identity = userInfo.sign.current_identity
		return (
			<div className="ZanList">
				{(list&&list.length)?(
					<React.Fragment>
						<div className="header">
							<div className="logo"><img src={prefix+"/homework/assets/images/zan_top_bg.png"}/></div>
							<div className="text">本班作业点赞排行</div>
							<div className="info_box">
								{identity==1?
									(
										<div className="info">
											<div className="name">
												<div className="num0 num"><img src={prefix+`/homework/assets/images/num_${list[0].sort>3?0:(+list[0].sort-1)}.png`}/></div>
												{list[0].name}
											</div>
											<div className="zanum">{list[0].sum}<i className="iconfont icon-SL_-heart-solid"></i></div>
										</div>
									):(
										<div className="info">
											<div className="name">
												<div className="num3 num me_num"><img src={prefix+`/homework/assets/images/num_${me.sort>3?'me':(+me.sort-1)}.png`}/><span>{me.sort>3?me.sort:''}</span></div>
												{me.name}
											</div>
											<div className="zanum">{me.sum}<i className="iconfont icon-SL_-heart-solid"></i></div>
										</div>
								)}
							</div>
						</div>
						<div className="list_box">
							{list.map((item,index)=>{
								if(this.flg(identity,index)){
									return (
										<div className="item flex-h ai-center" key={index}>
											<div className="name flex-h ai-center">
													{index<3?(
															<div className="num"><img src={prefix+`/homework/assets/images/num_${index}.png`}/></div>
														):(
															<div className="num">{+index+1}</div>
														)
													}
												{item.name}
											</div>
											<span>{item.sum}</span>
										</div>
									)}
								})
							}
						</div>
					</React.Fragment>
				):(
					<div className="no_data">
						<img src={prefix+"/homework/assets/images/no_data_zan.png"}/>
						还没有赞噢
					</div>
				)}
				<div className="home" onClick={() => {this.goToHome()}}><i className='iconfont icon-Style_basic-home logo'></i></div>
				<Listtab 
					identity={identity}
					groupId={group_id}
					on='ZanList'/>
				<ModalTips tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
			</div>
		)
	}
}

export default ZanList
