// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindWIFISSID : '',
    bindState:'',
    isBindWifi : false,
    wifiList: [],

  },
  
  getWifiList() {
    wx.startWifi({
      success: (res) => {
        wx.showToast({
          title: '搜索WIFI中',
          icon:'loading',
          duration:5000,
          success: () => {
            wx.getWifiList({
              success: (res) => {
                console.log("getWifiList=" + res);
                wx.showToast({
                  title: '已搜索到',
                  icon:'success',
                  duration:1000
                })
                this.showWifiListOn();
              },
            })
          },
          fail:()=> {
            wx.showToast({
              title: '搜索失败！',
              icon:'error'
            })
          }
        })
      },
    })
  },
  showWifiListOn(){
    var that = this;
    var showWifiList = new Array();
    wx.onGetWifiList((result) => {
      that.setData({
        wifiList: result.wifiList
      })
      var list = this.data.wifiList;
      for (let index = 0; index < list.length && index < 6; index++) {
        showWifiList.push(list[index].SSID);
        console.log(list[index].SSID);
      }
      wx.showActionSheet({
        itemList: showWifiList,
        success (res) {
          console.log(res.tapIndex)
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
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
    for (let index = 0; index < 2; index++) {
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
    udp.close();
  },

  clickTest: function() {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    if (!this.data.isBindWifi) {
      that.setData({
        bindWIFISSID : '未绑定',
        bindState:'立即绑定WIFI',
      })
    } else {
      that.setData({
        bindState : '修改绑定WIFI'
      })
    }
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