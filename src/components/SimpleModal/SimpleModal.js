import React, {Component} from 'react'

class SimpleModal extends React.Component {
    constructor(props){
        super(props)
        this.state={
            show:false
        }
    }
	componentDidMount() {
        // this._status()
        
    }

    _status=()=>{
        const {status} = this.props
        if(status == 'success'){
            return <span className='iconspan'><i className="iconfont icon-tongyong_Success-solid"></i></span>
        }else if(status == 'fail'){
            return <span className='iconspan'><i className="iconfont icon-tongyong_Error-solid"></i></span>
        }else if(status == 'warn'){
            return <span className='iconspan'><i className="iconfont icon-tongyong_Information-solid"></i></span>
        }

    }
    successBtn(){
    }
    cancleBtn(){

    }
    render(){
        const {title, btnText, cancleText, text} = this.props
        return(
            <div className='modal'> 
                <a></a>
                <div className="showModal">
                    {title&&<p className="modaltitle">{title}</p>}
                    {this._status()}
                    <p className="modaltext">{text}</p>
                    <div className="btn_box flex-h">
                        {cancleText&&<div onClick={e=>this.props.cancle()} className="btn cancle">{cancleText}</div>}
                        {btnText&&<div onClick={(e)=>{this.props.success()}} className="btn">{btnText}</div>}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SimpleModal
