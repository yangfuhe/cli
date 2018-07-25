// import DBF from 'dbfac'
import DBF from './dbfac'
export default DBF

let prefix = ''

if (__LOCAL__) {
    prefix = 'https://test.xiaobao100.com/homework'
}
if (__TEST__) {
    prefix = '/homework'
}
if (__PRO__) {
	prefix = '/homework'
}

DBF.create('Test', {
	sendRequest: {
		url: '/api/test',
		method: 'GET',
	},
})
DBF.create('GetUser', {
	sendRequest: {
		url: `${prefix}/api/user/userinfo`,
		method: 'POST',
	},
})

DBF.create('Workflow', {
	//获取班级列表
	GroupList: {
		url: `${prefix}/api/group/list`,
		method: 'POST',
	},
	//删除班级
	GroupDelete:{
		url:`${prefix}/api/group/delete`,
		method: 'POST',
	},
	//获取作业列表
	TaskQlist:{
		url: `${prefix}/api/task/list`,
		method: 'POST',
	},
	//删除作业
	TaskDelete:{
		url: `${prefix}/api/task/delete`,
		method: 'POST'
	},
	//群点赞排行榜
	ZanGrouplist: {
		url: `${prefix}/api/zan/grouplist`,
		method: 'POST',
	},
	//点赞/取消
	ZanOperate: {
		url: '/api/zan/operate',
		method: 'POST',
	},
})
// 和班级相关的所有请求接口
DBF.create('Class', {
	// 创建班级
	operate: {
		url: `${prefix}/api/group/operate`,
		method: 'POST',
	},
	// 班级信息，名称
	detail: {
		url: '/api',
		method: 'POST',
	}
})
// 和学生相关的接口
DBF.create('Student', {
	// 绑定学员
	create: {
		url: `${prefix}/api/stu/addcreate`,
		method: 'POST',
	},
	// 同名学员列表
	sameName: {
		url: '/api',
		method: 'POST',
	},
	// 获取学员列表
	stuList: {
		url: '/api',
		method: 'POST',
	},
	// 删除学员
	delete: {
		url: '/api',
		method: 'POST',
	},
})
// 我的模块api接口
DBF.create('My', {
	getUserInfo: {
		url: prefix + '/api/user/userinfo',
		method: 'post'
	},
	//推出登陆
	logout: {
		url: prefix + '/api/member/logout',
		method: 'post'
	},
	// 编辑家长学员姓名和关系
	editStuInfo: {
		url: prefix + '/api/admin/editStuInfo',
		method: 'post'
	},
	// 编辑我的姓名
	editName: {
		url: prefix + '/api/admin/editName',
		method: 'post'
	},
	// 切换身份
	changeIdentity: {
		url: prefix + '/api/admin/changeIdentity',
		method: 'post'
	},
	// 获取机构列表
	getOrgList: {
		url: prefix + '/api/admin/getOrgList',
		method: 'post'
	},
	// 切换机构
	changeOrg: {
		url: prefix + '/api/admin/changeOrg',
		method: 'post'
	},
	// 该机构创建作业的数据统计
	task: {
		url: prefix + '/api/data/task',
		method: 'post'
	},
	// 该机构提交作业的数据统计
	commit: {
		url: prefix + '/api/data/commit',
		method: 'post'
	},
	// 该机构评价作业的数据统计
	comment: {
		url: prefix + '/api/data/comment',
		method: 'post'
	},
	// 机构是否过期
	validate: {
		url: prefix + '/api/org/validate',
		method: 'get'
	},
	getOrgName: {
		url: prefix + '/api/org/name',
		method: 'post'
	}
})

DBF.create('HomeWork', {
	//是否是erp
	Create: {
		url: prefix + '/api/org/create',
		method: 'POST',
	},
	//教师接受邀请
	createTeacher: {
		url: prefix + '/api/user/createTeacher',
		method: 'POST',
	},
	//微信授权登录
	wxLogin: {
		url: prefix + '/api/member/wxLogin',
		method: 'POST',
	},
	// 机构是否过期
	validate: {
		url: prefix + '/api/org/validate',
		method: 'get'
	},
	// 根据id获取 班级 name
	getClassName:{
		url: prefix + '/api/group/name',
		method: 'post'
	}

})
