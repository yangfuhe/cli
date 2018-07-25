import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Tloader from 'react-touch-loader'
import Picker from '@comp/Picker'
import GroupStuHeadImg from '@modules/GroupStuHeadImg'
import SimpleModal from '@comp/SimpleModal'
import ModalTips from '@comp/ModalTips'
import DB from '@DB'
import './index.scss'
class Myclass extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isSecond:false,//是否请求过的参数，避免页面闪烁
            userInfo:{
                user:{
                    name: '',
                    identity: '',
                    stuinfo:{name:'',reverse_relation:''},
                    phone: '',
                    org_id: ''
                },
                sign: {
                    identitys:[],
                    current_identity: '',
                    phone:'',
                    wx:{
                        nickname:'',
                        headimgurl:'',
                    }
                }
            },
            identity:0 ,                    //0老师,1学生
            groupList:[],
            page:{
                pageNum:1,
                pageSize:10,
                pagetatol:20
            },
            hasNavigateTo:true,
            hasMore: 1,//0:不显示加载更多，1：显示加载更多
            del_id:'',//删除和编辑时保持的id
            del_index:'',//删除和编辑时保持的index
            groupName:'',//删除和编辑时保持的name
            groupDelFlag:false,
            pickerFlag:false,
            errorFlag:false,
            errorStatus:'warn',
            errorText:'',
            changeIdentity:true,//切换身份拦截点击
            isShowModal:false,
            tipText:'',
            date:''
        }
    }
    loadMore(resolve) {
            var {page} = this.state;
            var cur = page.pageNum+1;
            var l = page.pageSize*cur;
            DB.Workflow.GroupList({pageSize:page.pageSize,pageNum:cur}).then((res)=>{
                var list = this.state.groupList.concat(res.list);
                this.setState({
                    page:{
                        pageNum:cur,
                        pageSize:page.pageSize,
                        pagetatol:page.pagetatol
                    },
                    groupList:list,
                    hasMore: l > 0 && l < page.pagetatol
                });
                resolve();
            }).catch(err=>{
                this.setState({
                    isShowModal:true,
                    tipText:err.errorMsg || '您好！服务挂咯！'
                })
            });
    }
    //切换身份
    changeIdentity(){
        var {changeIdentity} = this.state;
        if(changeIdentity){
            this.setState({
                changeIdentity:false
            })
            DB.My.changeIdentity().then(data => {
                this.handleRequest()
                this.setState({
                    changeIdentity:true,
                    isShowModal:true,
                    tipText:'切换成功',
                })
            }).catch(err=>{
                this.setState({
                    isShowModal:true,
                    tipText:err.errorMsg || '您好！服务挂咯！',
                    changeIdentity:true
                })
            });
        }
        
    }
    //出现删除班级的弹出,保存id和Index
    pickerType(_id,name,index){
        this.setState({
            pickerFlag:true,
            del_id:_id,
            del_index:index,
            isShowModal:false,
            groupName:name
        })
    }
    pickerClose(){
        this.setState({
            pickerFlag:false,
            isShowModal:false,
        })
    }
    //错误弹窗成功回调
    errorBtn(){
        this.setState({
            errorFlag:false,
            errorStatus:'warn',
            isShowModal:false,
        })
    }
    //删除班级按钮点击
    delGroup(){
        this.setState({
            groupDelFlag:true,
            errorStatus:'warn',
            isShowModal:false,
        })
    }
    //确认/取消删除该班级
    delGroupSuccess(){
        const {del_id}= this.state;
        DB.Workflow.GroupDelete({_id:del_id}).then((res)=>{
            this.getGroupList();
            this.setState({
                pickerFlag:false,
                groupDelFlag:false,
                isShowModal:true,
                tipText:res
            })
        }).catch(err=>{
            this.setState({
                groupDelFlag:false,
                isShowModal:true,
                tipText:err.errorMsg || '您好！服务挂咯！',
                pickerFlag:false
            })
        });
    }
    delGroupCancle(){
        this.setState({
            pickerFlag:false,
            groupDelFlag:false,
            isShowModal:false,
        })
    }
    //tipClose组件回调必须将isShowModal改未false
    tipClose(){
        this.setState({
            isShowModal:false
        })
    }
    goNavigateTo(url){
        let {hasNavigateTo} = this.state;
        let that = this;
        
        if(hasNavigateTo){
            this.setState({
                hasNavigateTo:false,
                isShowModal:false,
            });
            wx.miniProgram.navigateTo({
                url: url,
                success(res){
                    setTimeout(function(){
                        that.setState({
                            hasNavigateTo:true,
                            isShowModal:false,
                        })
                    },3000)
                }
            })
        }
    }
    goWorkList(id,overdue,identity){
        if(!overdue){
            wx.miniProgram.reLaunch({url:`/pages/workList/workList?group_id=${id}&identity=${identity}`})
        }else{
            wx.miniProgram.redirectTo({url:'/pages/error/error?err=该机构已过期'})
        }
    }
    goMy(){
        wx.miniProgram.redirectTo({url:`/pages/my/my?${document.cookie}`})
    }
    goCreatClass(group_id,group_name=''){
        wx.miniProgram.redirectTo({url:`/pages/createClass/createClass?group_id=${group_id}&group_name=${group_name}`})
        
    }
    componentDidMount(){
        this.props.location.search && (document.cookie = this.props.location.search.split('?')[1].split('httponly')[0])
        this.handleRequest()
    }
    getGroupList(){
        var pageNum = 1,pageSize = 10;
        DB.Workflow.GroupList({pageSize,pageNum}).then((res)=>{
            var more = +!(res.count<pageSize);
            this.setState({
                isSecond:true,
                groupList:res.list,
                page:{
                    pagetatol:res.count,
                    pageSize,
                    pageNum
                },
                hasMore:more,
                isShowModal:false,
            });
        }).catch(err=>{
            if(err.error==='e506'){
                wx.miniProgram.redirectTo({url:'/pages/overdue/overdue'})
            }else{
                this.setState({
                    isSecond:true,
                    isShowModal:true,
                    tipText:err.errorMsg || 'Internal Server Error',
                })
            }
        });
    }
    handleRequest() {
        DB.GetUser.sendRequest().then((res)=>{
            res.user=res.user==null?{}:res.user;
            this.setState({
                userInfo:{
                    ...this.state.userInfo,
                    ...res,
                    isShowModal:false,
                }
            });
            //user有信息时才去请求列表，不然展示示例
            if(res.user.create_time){
                this.getGroupList();
            }else{
                this.setState({
                    isSecond:true,
                    isShowModal:false,
                })
            }
        }).catch(err=>{
            if(err.error === 'e207'){ // 用户未登录，跳转到登录页面
                wx.miniProgram.reLaunch({url: '/pages/index/index'})
                return
            }
            this.setState({
                isSecond:true,
                isShowModal:true,
                tipText:err.errorMsg || 'Internal Server Error',
            })
        });
    }
	render() {
        const {isSecond, userInfo, groupList, hasMore, pickerFlag, errorFlag, errorText, errorStatus, groupDelFlag ,del_id, groupName} = this.state;
        const {name,stuinfo, org_id } = userInfo.user;     
        const {wx,identitys} = userInfo.sign;
        const identity = userInfo.sign.current_identity
        const phone = userInfo.user.phone ? userInfo.user.phone:userInfo.sign.phone;
        var headImg = wx.headimgurl?wx.headimgurl:(prefix+'/homework/assets/images/avatar.png');
		return (
            isSecond&&(
			<div class="Index">
                <div className="header flex-h ai-center jc-start">
                    <div className="head" onClick={(e)=>this.goMy()}>
                        <img src={headImg}/>
                    </div>
                    <div className="head_info flex1 ">
                        <div className="name_box flex-h ai-center">
                            <div className="name flex1 ellipsis">
                            {stuinfo&&stuinfo.name?stuinfo.name:(name?name:wx.nickname)}{stuinfo&&stuinfo.reverse_relation?stuinfo.reverse_relation:''}
                            </div>
                            {
                                (!phone&&identitys.length==2)&&
                                <div className="change_btn" onClick={(e) => this.changeIdentity()}>
                                        <i className="iconfont icon-Style_basic-switch"></i>切换为{identity===2?'教师':'学员'}
                                </div>
                            }
                        </div>
                        {
                            (phone&&identitys.length==2)&&
                            <div className="phone flex-h ai-center">
                                {phone}
                                <div className="change_btn" onClick={(e) => this.changeIdentity()}>
                                    <i className="iconfont icon-Style_basic-switch"></i>切换为{identity===2?'教师':'学员'}
                                </div>
                            </div>  
                        }
                    </div>
                </div>
                <div className="list_box">
                    {(groupList.length>0&&userInfo.user)?(
                        <React.Fragment>
                            <Tloader className="tloader"
                                onLoadMore={(resolve) => this.loadMore(resolve)}
                                hasMore={hasMore}>
                                {
                                    groupList.map((item,index)=>
                                        <div className="item" key={index}>
                                            {identity===1&&
                                                <div className="awake_btn flex-h" onClick={(e)=>this.pickerType(item._id,item.name,index)}><em></em><em></em><em></em></div>
                                            }
                                            <div className="item_box flex-h ai-center jc-start" onClick={(e)=>this.goWorkList(item._id,item.overdue)}>
                                                <GroupStuHeadImg headimgurls={item.headimgurls}></GroupStuHeadImg>
                                                <div className="item_info flex1">
                                                    <div className="title ">{item.name}</div>
                                                    <div className="num ellipsis">{item.tasknum}个作业</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Tloader>
                            {identity===1&&
                                <view onClick={(e)=>this.goCreatClass('new')}  className="add_btn flex-v jc-center ">
                                    <i className="iconfont icon-Style_text-pen1"></i>
                                    <p>创建班级</p>
                                </view>
                            }
                        </React.Fragment>
                    ):(
                        //没有数据时
                        <div className="demo">
                            <div className="item">
                                <div className="item_box flex-h ai-center jc-start" onClick={(e)=>this.goWorkList('demo',false,identity)}>   
                                    <div className="icon_demo"><img src={prefix+'/homework/assets/images/example.png'}/></div>
                                    <GroupStuHeadImg></GroupStuHeadImg>
                                    <div className="item_info flex1">
                                        <div className="title ellipsis">英语四班</div>
                                        <div className="num ellipsis">1个作业</div>
                                    </div>
                                </div>
                            </div>
                            {identity===1&&
                                <div className="go_btn">
                                    <p>还没有班级噢</p>
                                    <view onClick={(e)=>this.goCreatClass('new')} className="btn">去创建</view>
                                </div>
                            }
                        </div>
                    )}
                </div>
            
                <Picker flag={pickerFlag} hide={this.pickerClose.bind(this)}>
                    <div className="class_picker">
                        <div onClick={(e)=>this.goCreatClass(del_id,groupName)}>编辑班级名称</div>
                        <div className="del_class" onClick={(e)=>this.delGroup()}>删除该班级</div>
                        <div className="page_line"></div>
                        <div className="cancle_btn" onClick={(e)=>this.pickerClose()}>取消</div>
                    </div>
                </Picker>
                <ModalTips type tipText={this.state.tipText} isShowModal={this.state.isShowModal} hide={this.tipClose.bind(this)}/>
                {groupDelFlag&&
                    <SimpleModal
                        // title={'标题'}
                        text={'确定删除该班级吗？'}
                        btnText={'确定'}
                        cancleText={'取消'}
                        status={errorStatus}  //这儿遗鸥三种状态，success，fail，warn
                        success={(e)=>this.delGroupSuccess()}
                        cancle={(e)=>this.delGroupCancle()}
                    />
                }
			</div>
            )
		)
    }
    
}

export default Myclass
