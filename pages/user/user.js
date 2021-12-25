// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submit_text: "连接",
    loading: false,
    wifi_acc_input: "",
    wifi_mm_input: "",
    open: false,//默认不显示密码
    focus:false,//是否获取焦点
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
  switch() {
    this.setData({
      open: !this.data.open
    })
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
    // 连发5次udp连接
    for (let index = 0; index < 5; index++) {
      udp.send({
        address: '10.10.100.254',
        port: 48899,
        message: 'www.usr.cn'
      })
    }
    const set_mode = 'AT+WMODE=APSTA' + '\\'+'r'
    const set_acc_mm = 'AT+WSTA='+ acc + ',' + mm + '\\'+'r'
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

  }
})