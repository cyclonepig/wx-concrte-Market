var app = getApp()
Page( {
    data: {
        userInfo: {},
        userListInfo: [{
            text: '头像',
            key: 'avatarUrl',
            avatar: true
        }, {
            text: '昵称',
            key: 'nickName',
            nickName: true
        }, {
            text: '手机号码',
            key: 'loginname',
            loginname: true
        }, {
            text: '二维码',
            qrcode: true
        }, {
            text: '性别',
            key: 'gender',
            gender: true
        }, {
            text: '地区',
            key:'city',
            city: true
        }, {
            text: '地址',
            key:'address',
            address: true
        }, {
            text: '个性签名',
            hastext: true
        }, , {
            text: '收货地址管理'
        }]
    },

    onLoad: function() {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo( function( userInfo ) {
            //更新数据
            that.setData( {
                userInfo: userInfo
            })
        })
    }
})