// 参数修改请参考https://segmentfault.com/a/1190000007770098

import React, { PureComponent } from 'react'
import './Audio.scss'

class Audio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false,
            isMuted: false,
            volume: 100,
            allTime: 0,
            currentTime: 0
        }
    }

    millisecondToDate(time) {
        const second = Math.floor(time % 60)
        let minite = Math.floor(time / 60)
        // let hour
        // if(minite > 60) {
        //   hour = minite / 60
        //   minite = minite % 60
        //   return `${Math.floor(hour)}:${Math.floor(minite)}:${Math.floor(second)}`
        // }
        return `${minite}:${second >= 10 ? second : `0${second}`}`
    }

    controlAudio(type, value) {
        const { id, src } = this.props
        const audio = document.getElementById(`audio${id}`)
        switch (type) {
            case 'allTime':
                this.setState({
                    allTime: audio.duration
                })
                break
            case 'play':
                // this.allPause();
                // console.log('play');
                audio.play()
                this.setState({
                    isPlay: true
                })
                break
            case 'pause':
                audio.pause()
                this.setState({
                    isPlay: false
                })
                break
            case 'muted':
                this.setState({
                    isMuted: !audio.muted
                })
                audio.muted = !audio.muted
                break
            case 'changeCurrentTime':
                this.setState({
                    currentTime: value
                })
                audio.currentTime = value
                if (value == audio.duration) {
                    this.setState({
                        isPlay: false
                    })
                }
                break
            case 'getCurrentTime':
                this.setState({
                    currentTime: audio.currentTime
                })
                if (audio.currentTime == audio.duration) {
                    this.setState({
                        isPlay: false
                    })
                }
                break
            case 'changeVolume':
                audio.volume = value / 100
                this.setState({
                    volume: value,
                    isMuted: !value
                })
                break
        }
    }
    // allPause(){
    //     console.log('all')
    //     var audios = document.getElementsByTagName("audio");
    //     for(var i=0;i<audios.length;i++){
    //         audios[i].pause();
    //     }
    //     this.setState({
    //         isPlay: false
    //     })
    // }
    
    render() {
        const { id, src, width=16.5} = this.props;
        const { isPlay, currentTime, allTime, isMuted, volume} = this.state;
        return (
            <div className="AudioBox" style={{width:`${width}rem`}}>
                <div className={isPlay ? 'pause  flex-h ai-center jc-start' : 'play  flex-h ai-center jc-start'}
                    onClick={() => this.controlAudio(isPlay ? 'pause' : 'play')}>
                        <div className="icon iconfont icon-tongyong_Play"></div>
                        <audio
                            id={`audio${id}`}
                            src={src}
                            preload={true}
                            onCanPlay={() => this.controlAudio('allTime')}
                            onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
                        >
                            您的浏览器不支持 audio 标签。
                        </audio>
                        <span className="current">
                            {/* 注释了当前音乐播放了几秒 */}
                            {/* {this.millisecondToDate(currentTime) + '/' + this.millisecondToDate(allTime)} */}
                            {this.millisecondToDate(allTime)}
                        </span>
                </div>
                {/* <input
                    type="range"
                    className="time"
                    step="0.01"
                    max={allTime}
                    value={currentTime}
                    onChange={(value) => this.controlAudio('changeCurrentTime', value)}
                /> */}
                {/* <i
                    className={isMuted ? 'mute' : 'nomute'}
                    onClick={() => this.controlAudio('muted')}
                >111</i>
                <input
                    type="range"
                    className="volume"
                    onChange={(value) => this.controlAudio('changeVolume', value)}
                    value={isMuted ? 0 : volume}
                /> */}
            </div>
        )
    }
}

export default Audio
