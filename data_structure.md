Home
this.state = {
    //通告文本
    noticeB1arText: "这是 NoticeB1ar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏",
    // tabBar 当前所处index
    current: 0,
    // 轮播图链表 link = '广告链接'，上传时间
    swiperList: [
    { id: '', imageUrl: '', link: '', upDate: '', },
    ],
    // 人气作评数据
    Popularitys:{
    defalut: {
        category:'类别',
        list:[{
        id:'',type:'',workName:'',overLink:'',workLink:'',author:'',from:'',pulishDate:''
        }]
    }
    },
    // 新秀作品数据
    NewProducts:{
    default:{
        category:'类别',
    },
    list:[{
        id:'',type:'',workName:'',coverLink:'',workLink:'',author:'',from:'',pulishDate:''
    }]
    },
    // 预告作品数据
    Notices:{
    defalut: {
        category:'类别',
        list:[{
        id:'',type:'',workName:'',overLink:'',workLink:'',author:'',from:'',pulishDate:''
        }]
    } 
    }

}
this.offset = 0;
this.pageSize = 10;
this.total = 0;