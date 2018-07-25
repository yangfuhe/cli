import React, {Component} from 'react'
import { Input } from 'antd';
import DB from '@DB'
import SimpleModal from '@comp/SimpleModal'

const { TextArea } = Input;
class IsErp extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isnew: false,  
            isold: false,
            type: null,                 //机构类型
            inputText:"",               //后缀或名称
            payNum:99,
            payType:'',


            //modal
            isshow: false,                              //弹框组件是否显示
            title:'抱歉，没有找到相应的机构，请确认信息',
            btnText:'我知道了',
            status:'fail'


        }
    }
	componentDidMount() {
        // 获取小程序页面传入的cookie写入h5页面
        document.cookie = this.props.location.search?this.props.location.search.split('?')[1].split('httponly')[0]:''
    }

    toLogin=()=>{
        const { isshow, inputText, type, title, payType, payNum,  orderType} = this.state
        if (!inputText) {
            this.setState({
                isshow: true,
                title: this.state.type ? '请输入ERP机构后缀' : '请输入机构名称'
            })
            return
        }
        let errormsg= ''
        DB.HomeWork.Create({
            type: type,                 //  为0 新用户 为1 已购买erp用户
            text: inputText             //  type为0 机构名称 type为1 机构后缀
        }).then(res=>{
            let payNum = res.data&&res.data.payNum? res.data.payNum :null
            let payType = res.data&&res.data.payType? res.data.payType :null
            this.setState({
                payNum: payNum,
                payType: payType,
                orderType: res.type
            },()=>{
                wx.miniProgram.navigateTo({url : `/pages/introduce/introduce?type=${this.state.orderType}`})
            })

        }, err=>{
            errormsg = err.errorMsg
            this.setState({
                isshow: true,
                title: errormsg
            })

        })
   
    }

  
    WorkModalSuc=()=>{
        const {isshow} = this.state
        this.setState({
            isshow: false,
        })
    }

    _select=(e)=>{
        const { isnew, isold, type } = this.state
        let keywords = e.target.innerText
        if(keywords.search(/已购买校宝系统/)>-1){
            this.setState({
                inputText: '',
                isold: true,
                isnew: false,
                type: 1
            })
            
        }else if(keywords.search(/新机构/)>-1){
            this.setState({
                inputText: '',
                isnew: true,
                isold: false,
                type: 0
            })
        }
    }

    render(){
        const {isshow, title, btnText, status, isnew, isold} = this.state
        return(
            <div className="iserp">
                <p className="title">请选择</p>
                <div className="content">
                    <div className="select" onClick={this._select}>
                        <div className="til" >已购买校宝系统的机构
                        {
                            isold? (
                                <span className='icon'><i className="iconfont icon-tongyong_Success-solid"></i></span>
                            ):('')
                        }
                        </div>
                        {
                            isold? (
                                <div className="inp">
                                    <span className="trangle"></span>
                                    <TextArea 
                                        autosize = {{minRows: 1, maxRows: 2}}
                                        placeholder="请输入机构后缀" 
                                        maxLength='30' 
                                        className='inputs'
                                        onChange={e=>{
                                            this.setState({
                                                inputText: e.target.value
                                            })
                                        }}
                                        style={{color:'#888',fontSize:'1.6rem'}}
                                    />
                                </div>
                            ):(
                                <div className='line'></div>
                            )
                        }
                    </div>
                    <div className="select" onClick={this._select}>
                        <div className="til">新机构
                        {
                            isnew? (
                                <span className='icon'><i className="iconfont icon-tongyong_Success-solid"></i></span>
                            ):('')
                        }
                        </div>
                        {
                            isnew? (
                                <div className="inp">
                                    <span className="trangle"></span>
                                    <TextArea 
                                        autosize = {{minRows: 1, maxRows: 2}}
                                        placeholder="请输入机构名称"
                                        maxLength='30' 
                                        className='inputs'
                                        onChange={e=>{
                                            this.setState({
                                                inputText: e.target.value
                                            })
                                        }}
                                        style={{color:'#888',fontSize:'1.6rem'}}
                                    />
                                </div>
                            ):(
                                <div className='line'></div>
                            )
                        }
                    </div>
                </div>
                <div onClick={this.toLogin} className="tologin"><button>确定</button></div>
                {
                    isshow?(
                        <SimpleModal
                        title={title}
                        btnText={btnText}
                        success={(e)=>this.WorkModalSuc()}
                    />
                    ):('')
                }
            </div>
        )
    }
}

export default IsErp
