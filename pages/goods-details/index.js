const jsonList = require('../../utils/json.js')

Page({
  data: {
    goodsDetail: {},
    b: 23
  },
  onLoad(e) {
    this.setData({
      goodsDetail: jsonList[e.id]
    })
    console.log(this.data.goodsDetail)
  },
  onShow (e){
  },
  previewImg:function(e){
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.goodsDetail.detailImg;
    console.log()
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有要预览的图片的地址集合数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})