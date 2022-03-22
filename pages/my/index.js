const app = getApp()
const CONFIG = require('../../config.js')
Page({
  data: {
    balance: 0.00,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0
  },
  onLoad() {

  },
  onShow() {
    const token = wx.getStorageSync('token');
    if (!token) {
      app.goLoginPageTimeOut()
      return
    }
    wx.checkSession({
      fail() {
        app.goLoginPageTimeOut()
      }
    })
    this.getUserAmount()
    this.orderList()
  },  
})