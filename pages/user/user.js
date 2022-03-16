// pages/user/user.js
const { $Toast } = require('../../lib/iview-weapp/dist/toast/index');
Page({
  data: {
    //是否在登录界面
    loginIsDisabled : false,
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
            title: "连接成功",
            icon: "success",
            duration : 1000,
            })
            that.setData({
              loading : false,
              loginIsDisabled : true,
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

  //延时函数
  delay : function(milSec) {
    return new Promise(resolve => {
      setTimeout(resolve, milSec)
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
  bindKeyInput_mm: function (e) {
    this.setData({
      wifi_mm_input: e.detail.value
    })
  },
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
  focus(){
    this.setData({
      focus:true
    })
  },
  blur(){
    this.setData({
      focus:false
    })
  },
  tapName: function(event) {
    this.setData({
      loading: !this.data.loading
    })
    wx.showToast({
      title: '连接中',
      icon: "loading",
      duration: 1000
      })
    var acc = this.data.wifi_acc_input
    var mm = this.data.wifi_mm_input
    this.send_acc_mm_udp(acc, mm)
  },
  send_acc_mm_udp(acc, mm) {
    const udp = wx.createUDPSocket()
    udp.bind()
    // 连发2次udp连接
    for (let index = 0; index < 5; index++) {
      // 发送密钥
      udp.send({
        address: '10.10.100.254',
        port: 48899,
        message: 'www.usr.cn'
      })
    }
    const set_mode = 'AT+WMODE=APSTA' + '\\'+'r'
    const set_acc_mm = 'AT+WSTA='+ acc + ',' + mm + '\\'+'r'
    // 改变wifi模块的wifi账号密码
    for (let index = 0; index < 2; index++) {
      udp.send({
        address: '10.10.100.254',
        port: 48899,
        message: set_mode
      })
      udp.send({
        address: '10.10.100.254',
        port: 48899,
        message: set_acc_mm
      })
    }
    this.setData({
      loading: !this.data.loading
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