demo = {
    result:{
        status:'200',
        data: {
            name:'name'
        },
        total:0
    }

}

// Home 首页
this.state = {
    //通告文本
    noticeB1arText: "这是 NoticeB1ar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏",
    // tabBar 当前所处index
    current: 0,
    // 轮播图链表 link = '广告链接'，上传时间
    swiperList: [
        {
            id: '', imageUrl: '', link: '', upDate: '',
        },
    ],
    // 人气作评数据
    popularitys: {
        defalut: {
            category: '类别',
            list: [
                {
                    authorId: '', type: '', workName: '', coverLink: '', workLink: '', authorName: '', authorFrom: '', pulishDate: ''
                }
            ]
        }
    },
    // 新秀作品数据
    newProducts: {
        default: {
            category: '类别',
        },
        list: [
            {
                authorId: '', type: '', workName: '', coverLink: '', workLink: '', authorName: '', authorFrom: '', pulishDate: ''
            }
        ]
    },
    // 预告作品数据
    notices: {
        defalut: {
            category: '类别',
            list: [
                {
                    authorId: '', type: '', workName: '', coverLink: '', workLink: '', authorName: '', authorFrom: '', pulishDate: ''
                }
            ]
        }
    }
}
this.offset = 0;
this.pageSize = 10;
this.total = 0;

Photoshow // 摄影作评

this.state = {
    ImageList: [
        {
            authorId: '001',
            authorName: 'name',
            authorHeader: '../../static/img/default.jpg',
            authorFrom: '来自哪里',
            workLink: '../../static/img/default.jpg',
            worksId: '001',
            worksType: 'photo',
            publihTime: '2019-12-12'
        }
    ],
}
this.offset = 1;
this.pageSize = 10;
this.total = 0;


Movieshow // 影视列表
this.state = {
    VidemoList: [
        {
            authorId: '001',
            authorName: 'name',
            authorHeader: '../../static/img/default.jpg',
            authorFrom: '来自哪里',
            worksId: '001',
            coverLink: 'http: //misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
            worksType: ' movie',
            workLink: 'http: //wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
            publihTime: '2019-12-12'
        }
    ]
}
this.offset = 1
this.pageSize = 10
this.total = 0


// MovieDetail  影视作评详情
this.state = {
    // 视频
    VidemoList: {
        authorName: '001',
        authorName: 'name',
        authorHeader: '../../static/img/default.jpg',
        authorFrom: '来自哪里',
        workLink: 'http: //wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        worksId: '001',
        coverLink: 'http: //misc.aotu.io/booxood/mobile-video/cover_900x500.jpg',
        worksType: ' movie',
        publihTime: '2019-12-12'
    },
    // 弹幕
    danmuList: [
        {
            text: "cao", color: '#ff00ff', time: 3
        },
        {
            text: "cao", color: '#ff00ff', time: 3
        },
        {
            text: "cao", color: '#ff00ff', time: 3
        }
    ],
    // 弹幕
    value: "",
    // 作者寄语
    authorMessage: ""
}



// selfspace 个人中心
this.state = {
    /** 用户信息 */
    userInfo: {
        /** 昵称 */
        nickName: 'zs',
        /** 头像 */
        avatarUrl: 'https: //jdc.jd.com/img/200',
        /** 性别 `0`: 未知 `1`: 男- `2`: 女  */
        gender: 0 | 1 | 2,
        /** 省份，如：`Yunnan` */
        province: '湖南',
        /** 城市，如：`Dalian` */
        city: '耒阳',
        /** 国家，如：`China` */
        country: '中国',
    },
    // 投稿
    ContributeUrl: 'https: //jdc.jd.com/img/200',
    // 反馈
    Feedback: '',
    // 关于以及责任说明
    isAbout: '',
    value: '' // 返回信息
}


Authorization // 授权
this.state = {
    /** 用户信息 */
    userInfo: {
        /** 昵称 */
        nickName: 'zs',
        /** 头像 */
        avatarUrl: 'https: //jdc.jd.com/img/200',
        /** 性别 `0`: 未知 `1`: 男- `2`: 女  */
        gender: 0 | 1 | 2,
        /** 省份，如：`Yunnan` */
        province: '湖南',
        /** 城市，如：`Dalian` */
        city: '耒阳',
        /** 国家，如：`China` */
        country: '中国',
    },
}