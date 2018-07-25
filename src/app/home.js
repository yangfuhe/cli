import React from 'react'
import { render } from 'react-dom'
import Home from '@pages/Home'
import { EventEmitter } from 'fbemitter'
window.prefix = __PRO__ ? 'https://cdn.xiaobao100.com' : 'https://jiaopeitoutiao-test.oss-cn-hangzhou.aliyuncs.com/mieba'
window.emitter = new EventEmitter()

render(<Home />, document.getElementById('app'))
