// pages/brand/brand.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    introduce: '',
    news: [],
    productList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorage({
      key: 'code',
      data: options.code,
    })
    var that = this;
    wx.request({
      url: app.baseUrl +'/brand/info',
      method: 'post',
      data: {
        code: options.code
      },
      success: function(res) {
        if(res.data.code == 0) {
          that.setData({
            introduce: res.data.data.introduce
          });
          WxParse.wxParse('introduce', 'html', that.data.introduce, that, 5);
        }
      }
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

  /**
   * 滑动切换
   */
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab:e.detail.current
    });
  },
  /**
   * 点击切换
   */
  clickTab:function(e) {
    var that = this;
    wx.getStorage({
      key: 'code',
      success: function(res) {
        switch (e.target.dataset.current) {
          case '1':
            wx.request({
              url: app.baseUrl + '/brand/news',
              method: 'post',
              data: {
                code: res.data
              },
              success: function (res) {
                if (res.data.code == 0) {
                  that.setData({
                    news: res.data.data
                  });
                  let brandNews = that.data.news;
                  for(let i = 0; i < brandNews.length; i++) {
                    WxParse.wxParse('tmp'+ i, 'html', brandNews[i].detail, that);
                    if(i === brandNews.length-1) {
                      WxParse.wxParseTemArray('htmlDetail', 'tmp', brandNews.length, that);
                    }
                  }
                  for(let j = 0; j < that.data.news.length; j++) {
                    that.data.news[j].detail = that.data.htmlDetail[j][0];
                  }
                  console.log(that)
                }
              }
            })
            break;
          case '2':
            wx.request({
              url: app.baseUrl + '/brand/products',
              method: 'post',
              data: {
                code: res.data
              },
              success: function (res) {
                if (res.data.code == 0) {
                  that.setData({
                    productList: res.data.data
                  });
                }
              }
            })
            break;
        }
      },
    })
    
    if(this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab:e.target.dataset.current
      });
    }
  }
})