// pages/personal/personal.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'userInfoId',
      success: function(res) {
        wx.request({
          url: app.baseUrl + '/user/info',
          method: 'post',
          data: {
            id: res.data
          },
          success: function (res) {
            if (res.data.code != 0) {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          }
        })
      },
    })
  },

  /**
   * 退出登录
   */
  loginOut: function() {
    wx.getStorage({
      key: 'userInfoId',
      success: function(res) {
        wx.request({
          url: app.baseUrl + '/login/out',
          method: 'post',
          data: {
            userInfoId: res.data
          },
          success: function(result) {
            wx.redirectTo({
              url: '../index/index',
            })
          }
        })
      },
    })
  },
  /**云打印 */
  cloudePrint: function() {
    wx.redirectTo({
      url: '../print/print',
    })
  },
  /**商品管理 */
  manageProduct: function() {
    wx.redirectTo({
      url: '../product/product',
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