import React from 'react'
import './TeaHomework.scss'
import Audio from '../../components/Audio'
import Video from '../../components/Video'
import {Link } from 'react-router-dom'

export default class TeaHomework extends React.Component {
	constructor(props){
		super(props);
	}
	share(){
		console.log('我')
		// 获取jssdk需要的数据
		let jssdk = data.jssdk;
		// 配置功能
		wx.config({
			debug: false,
			appId: jssdk.appId,
			timestamp: parseInt(jssdk.timestamp),
			nonceStr: jssdk.nonceStr,
			signature: jssdk.signature,
			jsApiList: [
				"onMenuShareTimeline",
				"onMenuShareAppMessage"
			]
		});
		wx.ready(function () {
			wx.onMenuShareTimeline({
				title: "我们的班级我们的团，快来为" + self.headerData.class + "班级荣誉而战！", // 分享标题
				desc: "哥们儿，咱多久没一起喝酒吃饭了，多久没促膝长谈了，Hey兄弟们！咱该聚聚了！",
				link: location.href, // 分享链接
				imgUrl: "https://tup.iheima.com/sport.png", // 分享图标
				success: function () {
					console.log(1)
					// alert("成功");
				},
				cancel: function () {
					// alert("失败")
				}
			});
		});
	}
	render() {
		const {teaData} = this.props;
		const {content} = teaData;
		return (
			<div className="TeaHomework" ref={r => this.TeaHomework = r} >
				<div className="title">
					<div className="name flex-h ai-center">
						<span className="ellipsis">{teaData.name}</span>
						<i className="share_btn iconfont icon-Style_basic-share" onClick={(e)=>{this.share()}}></i>
					</div>
					<div className="timer">{teaData.teaName} {teaData.timer}</div>
				</div>
				<div className="content_box">
					<div className="text">{content.text}</div>
					{(content.imgList&&content.imgList.length>0)&&
						<div className="img_box">
							{
								content.imgList.map((item,index)=>(
									<div className="img_item" key={index}><img/></div>
								))
							}
						</div>
					}
					{(content.audioList&&content.audioList.length>0)&&
						<div className="audio_box">
							{
								content.audioList.map((item,index)=>(
									<div className="audio" key={index}><Audio src={item.audiosrc} id={item.id} className=""/></div>
								))
							}
						</div>
					}
					{(content.videoList&&content.videoList.length>0)&&
						<div className="video_box">
							{
								content.videoList.map((item,index)=>(
									<div className="video" key={index}><Video id={item.id} src={item.src}></Video></div>
								))
							}
						</div>
					}
				</div>
			</div>
		)
	}
}
