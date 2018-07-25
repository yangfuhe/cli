import React, { PureComponent } from 'react'
import {Link } from 'react-router-dom'
import DB from '@DB'
import SimpleModal from '@comp/SimpleModal'
import './StuManage.scss'

class StuManage extends PureComponent {
	constructor(props){
        super(props);
        let id = this.props.match.params.groupId;
        console.log(id)
        this.state = {
            _id: id,          // 群的id
            stuList: [],      // 学员列表
            count: 0,         // 学员总数
            oprateId: '',     // 正在操作的学员Id 
            visible: false    // 是否展示弹窗
        }
    }
    componentDidMount(){
        this._handleStuList();
    }
    // 获取学员列表
    _handleStuList = () => {
        let { _id, stuList } = this.state;
        DB.Student.stuList({ 
            _id: _id,
        }).then(({count, list})=>{
            // 创建成果，则弹窗提示成功
            if(list){
                 this.setState({
                    count: count,
                    stuList: list
                })
            }
        },(err) => {
            console.error(err.errorMsg) 
        });
    }
    // 删除学员
    deleteStu = (e, groupId, stuId) => {
        this.setState({
            oprateId: stuId,
            visible: true
        })
    }

    // 邀请学员
    invite = (e, groupId) => {
        console.log(groupId)
    }

    // 弹窗点击取消删除
    WorkModalCal = () =>{
        this.setState({
            oprateId: '',
            visible: false
        })
    }
    // 弹窗确认删除
    WorkModalSuc = () => {
        let { _id, oprateId } = this.state;
        DB.Student.delete({ 
            _id: _id,
            stuId: oprateId
        }).then((res)=>{
            // 创建成果，则弹窗提示成功
            if(res){
                 this.setState({
                    oprateId: '',
                    visible: false
                }, ()=>{
                    this._handleStuList();
                })
            }
        },(err) => {
            console.error(err.errorMsg) 
        });
    }
    goToHome() {
        wx.miniProgram.reLaunch({url: '/pages/groupList/groupList'})
    }
    render(){
        let { _id, stuList, visible, oprateId } = this.state;
        return (
            <div className="stumanage">
                {
                    stuList.length === 0 ?
                    <div className="stu-empty flex-v ai-center jc-center">
                        <img src={`${prefix}/homework/assets/images/stulist-empty.png`}/>
                        <span className="gray">还没有学员噢，快去邀请吧</span>
                    </div>
                    :
                    <div className="stu-content">
                        <p className="stu-count">学员({stuList.length})</p>
                        <div className="stu-list">
                            {
                                stuList.map((stu,index)=>(
                                    <div className="stu-item">
                                        <p className="stu-name">{stu.name}</p>
                                        <p className="gray"><span className="call">本人</span><span>{stu.phone}</span></p>
                                        {
                                            stu.users.map((user,jndex)=>(
                                                <p className="gray"><span className="call">{user.reverse_relation}</span><span>{user.phone}</span></p>
                                            ))
                                        }
                                        <span className="delete iconfont icon-Style_basic-trash" onClick={(e)=>this.deleteStu(e, stu._id)}></span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                <div className="inviteStu">
                    <div className="big_blue_btn" onClick={(e)=>this.invite(e, _id)}>邀请学员</div>
                </div>
                {
                    visible && 
                    <SimpleModal
                        // title={'标题'}
                        text={'是否确认删除该学员？'}
                        btnText={'确认删除'}
                        cancleText={'取消'}
                        status={'warn'}  //这儿已有三种状态，success，fail，warn
                        success={(e)=>this.WorkModalSuc()}
                        cancle={(e)=>this.WorkModalCal()}
                    />
                }
                <div className="home" onClick={() => {this.goToHome()}}><i className='iconfont icon-Style_basic-home logo'></i></div>
            </div>
        )
    }
}
export default StuManage