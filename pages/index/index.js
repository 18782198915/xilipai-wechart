
Page({
  data: {
    swiperCurrent: 0, //当前banner所在位置
    bannerList: [
      { picUrl: '../../images/product/box/box.jpg',
        id: 1 }
    ],
    goodsRecommend: [
      { pic: '../../images/product/box/box.jpg',
        title: '内搭|香氛类',
        subtitle: '礼盒合集',
        id: 'aromatherapy'},
      { pic: '../../images/product/box/box.jpg',
        title: '内搭|个人洗护类',
        subtitle: '礼盒合集',
        id: 'washProtect'},
      { pic: '../../images/product/box/box.jpg',
        title: '盒子',
        subtitle: '礼盒合集',
        id: 2},
      { pic: '../../images/product/box/box.jpg',
        title: '盒子',
        subtitle: '礼盒合集',
        id: 2},
      { pic: '../../images/product/box/box.jpg',
        title: '盒子',
        subtitle: '礼盒合集',
        id: 2},
      { pic: '../../images/product/box/box.jpg',
        title: '盒子',
        subtitle: '礼盒合集',
        id: 2},
    ], // 推荐商品
  },
  onLoad(){
    const that = this
    wx.request({
      url: 'http://127.0.0.1:3000/api/getBannerList',
      method: 'get',
      success(res) {
        if(res.statusCode == 200){
          console.log(res)
          that.setData({
            bannerList: res.data.bannerList,
            goodsRecommend: res.data.hotProduct,
          });
        }
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
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
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
  }
})