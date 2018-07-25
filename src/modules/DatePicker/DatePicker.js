/**
 * @module DatePicker Component
 */

import React, { Component } from 'react';
import DatePickerItem from './DatePickerItem.js';
import PureRender from './pureRender.js';
import { convertDate, nextDate } from './time.js';

type Props = {
    value: Object,
    min: Object,
    max: Object,
    customHeader?: React.Element<*>,
    showHeader: boolean,
    dateFormat: Array<*>,
    dateSteps: Array<*>,
    showFormat: string,
    confirmText: string,
    cancelText: string,
    onSelect: Function,
    onCancel: Function,
}

type State = {
    value: Date,
}

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class DatePicker extends Component<void, Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            value: nextDate(this.props.value),
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update value of state
        const date = nextDate(nextProps.value);
        if (date.getTime() !== this.state.value.getTime()) {
            this.setState({ value: date });
        }
    }

    /**
     * When you swipe two datepickeritems at the same time.
     * Prevent dates from going out.
     */
    componentDidUpdate() {
        const value = this.state.value;
        const { min, max } = this.props;
        if (value.getTime() > max.getTime()) {
            this.setState({ value: max });
        }

        if (value.getTime() < min.getTime()) {
            this.setState({ value: min });
        }
    }
        
    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        const date = nextDate(nextState.value);
        return date.getTime() !== this.state.value.getTime() ||
                PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        this.props.onSelect(this.state.value);
    }

    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleDateSelect(value) {
        this.setState({ value });
    }

    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { min, max, dateFormat, confirmText, cancelText, showFormat, showHeader, customHeader, dateSteps } = this.props;
        const value = this.state.value;
        return (
            <div
                className={`datepicker ios`}>
                {showHeader &&
                    <div className="datepicker-header"></div>}
                <div className="datepicker-content">
                    {dateFormat.map((format, index) => (
                        <DatePickerItem
                            key={index}
                            step={dateSteps[index] || 1}
                            value={value}
                            min={min}
                            max={max}
                            format={format}
                            units={index === 0 ? '年' : '月'}
                            onSelect={this.handleDateSelect} />
                    ))}
                </div>
                <div className="datepicker-navbar">
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.handleFinishBtnClick}>{confirmText}</a>
                    <a
                        className="datepicker-navbar-btn cancel"
                        onClick={this.props.onCancel}>{cancelText}</a>
                </div>
            </div>
        );
    }
 }

export default DatePicker;
