import React, { PureComponent } from 'react'
import './Picker.scss'

class Picker extends React.Component {
    constructor(props){
        super(props);
    }
    hide(){
        this.props.hide();
    }
	render() {
        var {flag} = this.props;
		return (
            <div className="picker_box">
                {flag&&
                    <div className="mask" onClick={(e)=>this.hide()}></div>
                }
                <div className={flag?"transitionY show":'transitionY'}>
                    {this.props.children}
                </div>
            </div>
                
        )
	}
}

export default Picker
