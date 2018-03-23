//app.js
App({
  globalData:{
    userInfo: null,
    apiUrl: "http://127.0.0.1:8080/tongdao/"
  },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },



  getUserInfo:function(cb){
    var that = this;

    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success:function(r){
          var code = r.code;
          if(code){
            wx.getUserInfo({
              success:function(res){
                console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code})
                wx.request({
                  url: "http://127.0.0.1:8080/tongdao/getUserInfo",
                  method: 'post',
                  header:{
                    'content-type': 'application/x-www-form-urlencoded'

                  },
                  data: { encryptedData: res.encryptedData, iv: res.iv, code: code},
                  success:function(data){
                    //jiemi
                    if(data.data.status == 1){
                      var userInfo = data.data.userInfo;
                      that.globalData.userInfo = data.data.userInfo;
                      console.log(userInfo);
                      typeof cb == "function" && cb(that.globalData.userInfo)
                    }else{
                      console.log("fail")
                    }
                  },
                  fail:function(){
                    console.log("error");
                  }

                })
              },
              fail:function(){
                console.log('获取用户信息失败')

              }
            })
          }else{
            console.log('获取用户登录态失败！' + r.errMsg)

          }
        },
        fail:function(){
          console.log('登陆失败')

        }

      })   
  }
  }
})