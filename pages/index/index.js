
Page({
  data: {
    swiperCurrent: 0, //当前banner所在位置
    bannerList: [
    ],
    goodsRecommend: [
    ], // 推荐商品
  },
  onLoad(){
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    const that = this
    console.log(123)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      // url: 'http://127.0.0.1:3000/api/getBannerList',
      url: 'https://www.xilipai.cn/api/getBannerList',
      method: 'get',
      success(res) {
        wx.hideLoading()
        if(res.statusCode == 200){
          console.log(res)
          that.setData({
            bannerList: res.data.bannerList,
            goodsRecommend: res.data.hotProduct,
          });
        }
      },
      fail() {
        console.log('失败')
        wx.hideLoading()
      }
    })
  },
  swiperchange: function(e) { // banner滚动事件
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function(e) {
    console.log(this.data.goodsRecommend[e.currentTarget.dataset.index])
    wx.navigateTo({
      url: "/pages/goods-details/index?info=" + encodeURIComponent(JSON.stringify(this.data.goodsRecommend[e.currentTarget.dataset.index]))
    })
  },
  tapBanner: function(e) {
    console.log(e)
    // if (e.currentTarget.dataset.id != 0) {
    //   wx.navigateTo({
    //     url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    //   })
    // }
  },
  goMap(e){ // 打开地图
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
  }
})