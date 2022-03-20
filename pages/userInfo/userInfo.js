// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示用户信息
    isShowedInUser : false,

    //用户信息
    username: '',
    userID : '',
    Gender : '',
    Age : '',
    City : '',
    Telephone : '',
  },

  switchShowed: function() {
    this.setData({
      isShowedInUser : !this.data.isShowedInUser,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  returnLogin() {
    wx.navigateTo({
      url: '../user/user',
    })
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
    const app = getApp();
    if (this.data.username != '' || this.data.userID != '') {
      return;
    }
    this.setData({
      username : app.globalData.username,
      userID : app.globalData.userID
    })
    console.log(this.data.userID)
    console.log(this.data.username)
    var that = this;
    wx.request({
      url: 'http://121.196.40.63:80/UserQuery', //后端查询用户信息接口
      method : 'POST',
      data: {
          UserID : this.data.userID,
      },
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        that.setData({
          Gender : res.data.Gender,
          Age : res.data.Age,
          City : res.data.City,
          Telephone : res.data.Telephone,
        })
      }
    })
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