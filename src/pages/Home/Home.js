import React from 'react'
import { hot } from 'react-hot-loader'
import DynamicImport from '@modules/DynamicImport'
import Loadable from 'react-loadable';
import { HashRouter, Route, Link } from 'react-router-dom'
import { Spin } from 'antd'
import DB from '@DB'
import '../base.css'
import './Home.scss'
const loading = () => <Spin/>
// 异步加载页面的方式(基于组件的分割)：
const My = Loadable({
    loader: () => import('@pages/My'),
    loading
  });

// 异步加载页面的方式：
const Index = DynamicImport(() =>
	import('@pages/Index'),
)
const WorkList = DynamicImport(() =>
	import('@pages/WorkList'),
)
const ZanList = DynamicImport(() =>
	import('@pages/ZanList'),
)
const StuManage = DynamicImport(() =>
	import('@pages/StuManage'),
)
const SwitchOrg = Loadable({
    loader: () => import('@pages/SwitchOrg'),
    loading
});
  
const EditInfo = Loadable({
    loader: () => import('@pages/EditInfo'),
    loading
});
// 异步加载页面的方式：

// const Index = DynamicImport(() =>
// 	import('@pages/Index'),
// )
// const WorkList = DynamicImport(() =>
// 	import('@pages/WorkList'),
// )
// const ZanList = DynamicImport(() =>
// 	import('@pages/ZanList'),
// )
// const WorkDetail = DynamicImport(() =>
// 	import('@pages/WorkDetail'),
// )
// const WorkRecord = DynamicImport(() =>
// 	import('@pages/WorkRecord'),
// )
// const workDetailOne = DynamicImport(() =>
// 	import('@pages/workDetailOne'),
// )

const IsErp = DynamicImport(() =>
	import('@pages/IsErp'),
)

const EditStu = Loadable({
    loader: () => import('@pages/EditStu'),
    loading
});

const Statistics = Loadable({
    loader: () => import('@pages/Statistics'),
    loading
});

const Overdue = Loadable({
    loader: () => import('@pages/Overdue'),
    loading
});
class Home extends React.Component {
	componentDidMount() {

	}
	render() {
		return (
			<HashRouter>
				<div style={{height: '100%'}}>
					<Route exact path="/" component={Index} />
					<Route exact path="/workList/:groupId" component={WorkList} />
					<Route exact path="/zanList/:groupId" component={ZanList} />
					{/*学员管理*/}
					<Route exact path="/stuManage/:groupId" component={StuManage} />
					<Route path="/editStu" component={EditStu} />
					<Route path="/editInfo" component={EditInfo} />
					<Route path="/my" component={My} />
					<Route path="/switchOrg" component={SwitchOrg} />
					<Route path="/statistics" component={Statistics} />
					<Route path="/overdue" component={Overdue} />
					<Route path="/iserp" component={IsErp} />
				</div>
			</HashRouter>
		)
	}
}

export default hot(module)(Home)
