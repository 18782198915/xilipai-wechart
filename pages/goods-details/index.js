const jsonList = require('../../utils/json.js')

Page({
  data: {
    goodsDetail: {},
    arrangeStyle: 'width: 374rpx;margin-bottom: 2rpx;height: 496rpx;',
    showIcon: true,
  },
  onLoad(e) {
    this.setData({
      goodsDetail: JSON.parse(decodeURIComponent(e.info))
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
  },
  goMap(e){ // 打开地图
    // address: "浙江杭州西湖区南山路2-1904"
    // latitude: 30.13694
    // longitude: 120.219925
    // name: "南山路店"
    wx.openLocation({
      latitude: 30.707683,
      longitude: 104.065929,
      name: '喜礼派店',
      address: '四川成都金牛区中央天地三楼307'
    })
  },
  callPhone(e){
    const tel = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber: tel
    })
  },
  clickArrange:function(val){
    const style1='width: 374rpx;margin-bottom: 2rpx;height: 496rpx;'
    const style2='width: 750rpx;margin-bottom: 2rpx;height: 902rpx;'
    this.setData({
      arrangeStyle: !this.data.showIcon ? style1 : style2,
      showIcon: !this.data.showIcon
    })
  }
})