
#@pages/index 首页

@router
    #/
@desc
    显示登录者头像，姓名，号码，和切换身份按钮，点击头像跳转至我的。群列表，群列表为一个上拉加载组件。
    没有成员进入时，显示群默认头像，有成员后，显示最新4个成员头像拼装
    老师：群为空时展示一个默认案例和一个小的去创建按钮，有群时显示群列表，显示创建群作业按钮，有群列表时可以换起悬浮菜单删除该群和换名字
    学生：显示群列表
    需求：上拉加载，头像（1,2,3,4）,删除班级，编辑班级名，
@modules
    LoadmoreModule //上拉加载模块
    //npm install react-touch-loader    https://github.com/Broltes/react-touch-loader
@components
    picker //点击出现的遮罩和选择功能
@db
    DB.Service.getUserInfo()   //获取用户信息
    DB.Service.getGroupList()  //获取群列表
    DB.service.delGroup()      //删除该群

#@pages/workList 作业列表

@router
    #/workList/:groupId
@desc
    查看作业列表
    老师：对作业的添加和删除
    学生：查看作业是否提交  
@modules
    LoadmoreModule //上拉加载模块
    //npm install react-touch-loader    https://github.com/Broltes/react-touch-loader
    Listtab //悬浮菜单
@db
    DB.service.getWorkList()  //获取作业列表
    DB.service.delWork()      //删除作业

#@pages/zanList 点赞排行
@router
    #/zanList/:groupId
@desc
    老师：查看点赞排行
    学生：查看点赞排行，并将自己的排行单独展示
@modules
    LoadmoreModule //上拉加载模块
    //npm install react-touch-loader    https://github.com/Broltes/react-touch-loader   
    Listtab //悬浮菜单
@db
    DB.service.getZanList()  //获取点赞排行列表

#@page/workDetail 作业详情
@router
    #/workDeatil/:groupId/:workId
@desc
    内容：老师布置作业（收缩，可展开），提交作业列表，点赞功能，分享功能，上拉加载
    分享：https://blog.csdn.net/sennyla/article/details/80022187，https://www.cnblogs.com/codeww/p/9138559.html
    逻辑：如作业提交多次，只显示第一条下方展示所有提交按钮
         老师有评论按钮，学生无评论按钮
         学员未提交就显示提交按钮，提交过显示再次提交
         游客只能点赞和分享
@modules
    teaHomework //老师布置的作业
    stuHomework //学生提交作业模块
    LoadmoreModule //上拉加载模块
    vedio //视频
    audio //音频
@components
    slideToggle //折叠模块

#@page/workDetailList 作业提交历史记录
@router
    #/workRecord/:groupId/:workId
@desc
    和作业详情差不多

#@page/workDetailOne 某学员作业详情
@router
    #/workDetailOne/:groupId/:workId

@desc
    和作业详情差不多
    逻辑：老师可以写评论，删除评论，点赞，分享
         学员自己的可以点赞和分享

#@page/bindStu
@router
    #/bindStu/:groupId
@desc
    输入框和选择框，选择自定义跳到自定义页面

#@page/bindCustom
@router
    #/bindCustom/:groupId
@desc
    输入框和确认按钮

