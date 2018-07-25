import React, {Component} from 'react'

class ModalTips extends React.Component {
    constructor(props){
        super(props)
        this.state={
        }
    }
	componentDidMount() {
        
    }
    toastIt=(text, timeout, options)=>{
        try {
            document.body.removeChild(document.querySelector('div.toast-it'));
        } catch (e) {
    
        }
    
        var timeout = timeout || 3000;
        let toast = document.createElement('DIV');
        toast.classList.add('toast-it');
        let content = document.createTextNode(text);
        if (this.props.type) {
            let img = document.createElement('img');
            img.src = `${prefix}/homework/assets/images/icon-prompt-success.png`
            img.className = 'logo'
            toast.appendChild(img)
            console.log(img)
        }
        toast.appendChild(content);
        toast.style.animationDuration = timeout / 1000 + 's';
        console.log(this.props)
        for (let prop in options) {
            toast.style[prop] = options[prop];
        }
        var t = this;
        toast.style['z-index'] = 9999999;
        document.body.appendChild(toast);
        setTimeout(function () {
            try {
                t.props.hide();
                document.body.removeChild(toast);
            } catch (e) {  

             }
        }, timeout);
    }

    render(){
        const { tipText, isShowModal } = this.props
        return(
            <div>
            {isShowModal&&
               this.toastIt(tipText, 3000, {fontSize: '1.4rem'})
            }
            </div>
        )
    }
}

export default ModalTips


