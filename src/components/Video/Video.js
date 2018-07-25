// 参数修改请参考https://segmentfault.com/a/1190000007770098

import React, { PureComponent } from 'react'
import './Video.scss'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlay: false,
            allTime:0,
            currentTime: 0
        }
    }
    millisecondToDate(time) {
        const second = Math.floor(time % 60)
        let minite = Math.floor(time / 60)
        return `${minite}:${second >= 10 ? second : `0${second}`}`
    }
    controlAudio(type, value) {
        const { id, src } = this.props
        const video = document.getElementById(`video${id}`)
        switch (type) {
            case 'allTime':
                this.setState({
                    allTime: video.duration
                })
                break
            case 'play':
                video.play()
                this.setState({
                    isPlay: true
                })
                break
            case 'pause':
                video.pause()
                this.setState({
                    isPlay: false
                })
                break
            case 'muted':
                this.setState({
                    isMuted: !video.muted
                })
                video.muted = !video.muted
                break
            case 'changeCurrentTime':
                this.setState({
                    currentTime: value
                })
                video.currentTime = value
                if (value == video.duration) {
                    this.setState({
                        isPlay: false
                    })
                }
                break
            case 'getCurrentTime':
                this.setState({
                    currentTime: video.currentTime
                })
                if (video.currentTime == video.duration) {
                    this.setState({
                        isPlay: false
                    })
                }
                break
            case 'changeVolume':
                video.volume = value / 100
                this.setState({
                    volume: value,
                    isMuted: !value
                })
                break
        }
    }
    render() {
        const {id, src} = this.props;
        const {isPlay, allTime, currentTime} = this.state;
        return (
            <div className="VideoBox">
                <video
                    id={`video${id}`}
                    onCanPlay={() => this.controlAudio('allTime')}
                    onTimeUpdate={(e) => this.controlAudio('getCurrentTime')}
                    preload="auto"
                    x-webkit-airplay="allow"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="true"
                    x5-video-orientation="portraint"
                    webkit-playsinline="true"
                    playsinline="true"　
                    style={{objectFi:"fill"}}
                    src={src}
                ></video>
                {isPlay?(
                        
                        <div className="mask_pause" onClick={() => this.controlAudio('pause')}></div>
                    ):(
                        <div className="mask_video">
                            <div className="play_btn iconfont icon-tongyong_Play-circle" 
                                onClick={() => this.controlAudio('play')}>
                            </div>
                            <span className="current">
                                {/* 注释了当前音乐播放了几秒 */}
                                {this.millisecondToDate(currentTime) + '/' + this.millisecondToDate(allTime)}
                                {/* {this.millisecondToDate(allTime)} */}
                            </span>
                        </div>
                    )
                }
                
            </div>
        )
    }
}

export default Video
