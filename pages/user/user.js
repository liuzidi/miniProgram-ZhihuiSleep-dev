// pages/user/user.js
Page({
  data: {
    // 输入框
    wifi_acc_input: "",
    wifi_mm_input: "",
    focus:true,//是否获取焦点

    // 密码框
    isPassword : 'password',
    //显示隐藏密码的单选框
    checked: false,
    mima : '显示密码',
    //加载条
    loading: false,
  },

  loginClick : function() {
    var that = this;
    if (this.data.wifi_acc_input.length == 0) {
      wx.showToast({
        title: "账号不允许为空",
        icon: "error",
        duration : 1000,
        })
        return;
    }
    if (this.data.wifi_mm_input.length == 0) {
      wx.showToast({
        title: "密码不允许为空",
        icon: "error",
        duration : 1000,
        })
        return;
    }
    this.setData({
      loading : true,
    })
    wx.request({
      url: 'http://121.196.40.63:80/LoginQuery', //后端查询账号密码接口
      method : 'POST',
      data: {
          UserNm : this.data.wifi_acc_input,
      },
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        if (res.data.PassWord === that.data.wifi_mm_input) {
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration : 1000,
            })
            that.setData({
              loading : false,
            });
            const app = getApp();
            app.globalData.username = res.data.UserNm;
            app.globalData.userID = res.data.UserID;
            wx.switchTab({
              url: '../userInfo/userInfo',
            })
        } else {
          wx.showToast({
            title: "账号或密码错误",
            icon: "error",
            duration : 1000,
            })
            that.setData({
              loading : false,
            })
        }
      }
    })
  },
  otherLoginClick(){
    wx.switchTab({
      url: '../userInfo/userInfo',
    })
  },
  loginSuccess : function() {
    wx.showToast({
      title: "连接成功",
      icon: "success",
      duration : 1000,
      })
  },
  
  loginFail : function() {
    wx.showToast({
      title: "连接失败请重试",
      icon: "error",
      duration : 1000,
      })
  },
  bindKeyInput_acc: function (e) {
    this.setData({
      wifi_acc_input: e.detail.value
    })
  },
  //绑定输入账号框
  bindKeyInput_mm: function (e) {
    this.setData({
      wifi_mm_input: e.detail.value
    })
  },
  //绑定输入密码框
  handleCheckboxChange({ detail = {} }) {
      if (this.data.mima === '显示密码') {
          this.setData({
            mima : '隐藏密码',
            isPassword : 'text',
            checked: detail.current
        }); 
      } else {
        this.setData({
          mima : '显示密码',
          isPassword : 'password',
          checked: detail.current
      }); 
      }
  },
  //获取焦点
  focus(){
    this.setData({
      focus:true
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})