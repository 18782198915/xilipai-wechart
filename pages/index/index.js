const WXAPI = require('../../wxapi/main')
const CONFIG = require('../../config.js')
const app = getApp()

Page({
  data: {
    swiperCurrent: 0, //当前banner所在位置
    bannerList: [],
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
    ], // 推荐商品
  },
  onShow(){
    const _this = this
    WXAPI.banners().then(function (res) {
      if (res.code === 0) {
        _this.setData({
          bannerList: res.data
        })
      }
    })
    // WXAPI.goods({
    //   recommendStatus: 1
    // }).then(res => {
    //   if (res.code === 0) {
    //     _this.setData({
    //       goodsRecommend: res.data
    //     })
    //   }
    // })
  },
  swiperchange: function(e) { // banner滚动事件
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function(e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  bindTypeTap: function(e) {
    this.setData({
      selectCurrent: e.index
    })
  },
  onLoad: function(e) {
    wx.setNavigationBarTitle({
      title: '喜礼派伴手礼'
    })
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  getGoodsList: function(categoryId, append) {
    if (categoryId == 0) {
      categoryId = "";
    }
    var that = this;
    wx.showLoading({
      "mask": true
    })
    WXAPI.goods({
      categoryId: categoryId,
      nameLike: that.data.inputVal,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    }).then(function(res) {
      wx.hideLoading()
      if (res.code == 404 || res.code == 700) {
        let newData = {
          loadingMoreHidden: false
        }
        if (!append) {
          newData.goods = []
        }
        that.setData(newData);
        return
      }
      let goods = [];
      if (append) {
        goods = that.data.goods
      }
      for (var i = 0; i < res.data.length; i++) {
        goods.push(res.data[i]);
      }
      that.setData({
        loadingMoreHidden: true,
        goods: goods,
      });
    })
  },
  getCoupons: function() {
    var that = this;
    WXAPI.coupons().then(function (res) {
      if (res.code == 0) {
        that.setData({
          coupons: res.data
        });
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: wx.getStorageSync('mallName'),
      path: '/pages/index/index?inviter_id=' + wx.getStorageSync('uid'),
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  getNotice: function() {
    var that = this;
    WXAPI.noticeList({pageSize: 5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        });
      }
    })
  },
  toSearch: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  // 以下为搜索框事件
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  // 以下为砍价业务
  kanjiaGoods(){
    const _this = this
    WXAPI.kanjiaList().then(function (res) {
      if (res.code == 0) {
        _this.setData({
          kanjiaList: res.data.result,
          kanjiaGoodsMap: res.data.goodsMap
        })
      }
    })
  },
  goCoupons: function (e) {
    wx.navigateTo({
      url: "/pages/coupons/index"
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
  }
})