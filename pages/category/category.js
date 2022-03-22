const jsonList = require('../../utils/json.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      { id: 1,
        name: "全品类喜糖礼盒",
        scrollId: "s1" },
      { id: 2,
        name: "礼盒内搭合集",
        scrollId: "s2" },
      { id: 3,
        name: "伴郎伴郎礼",
        scrollId: "s3" },
      { id: 4,
        name: "白金色系伴手礼",
        scrollId: "s4" },
      { id: 5,
        name: "宝宝",
        scrollId: "s5" },
      { id: 6,
        name: "商务",
        scrollId: "s6" },
    ],
    goodsWrap: [],
    categorySelected: "1",
    goodsToView: "",
    categoryToView: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.setData({
      goodsWrap: jsonList.goodsList
    })
    // this.initData();
  },
  initData() {

    let that = this;
    wx.showNavigationBarLoading();
    WXAPI.goodsCategory().then(function(res) {
      console.log(res)
      var categories = [];
      if (res.code == 0) {
        for (var i = 0; i < res.data.length; i++) {

          let item = res.data[i];

          item.scrollId = "s" + item.id;
          categories.push(item);

          if (i == 0) {

            that.setData({
              categorySelected: item.scrollId,
            })

          }
        }
      }
      that.setData({
        categories: categories,

      });
      console.log(categories);
      that.getGoodsList(0);
    }).catch((e) => {

      wx.hideNavigationBarLoading();
    });

  },
  getGoodsList: function(categoryId, append) {

    let that = this;

    WXAPI.goods({
      categoryId: "",
      page: 1,
      pageSize: 100000
    }).then(function(res) {
      if (res.code == 404 || res.code == 700) {

        return
      }
      let goodsWrap = [];

      console.log(res)
      that.data.categories.forEach((o, index) => {

        let wrap = {};
        wrap.id = o.id;
        wrap.scrollId = "s" + o.id;
        wrap.name = o.name;
        let goods = [];

        wrap.goods = goods;
        res.data.forEach((item, i) => {
          goods.push(item)
        })

        goodsWrap.push(wrap);
      })



      that.setData({
        goodsWrap: goodsWrap,
      });

      console.log(goodsWrap);

      wx.hideNavigationBarLoading();
    }).catch((e) => {

      wx.hideNavigationBarLoading();
    });
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onCategoryClick: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    this.categoryClick = true;
    this.setData({
      goodsToView: id,
      categorySelected: id,
    })

  },
  scroll: function(e) {

    if (this.categoryClick){
      this.categoryClick = false;
      return;
    }

    let scrollTop = e.detail.scrollTop;

    let that = this;

    let offset = 0;
    let isBreak = false;

    for (let g = 0; g < this.data.goodsWrap.length; g++) {

      let goodWrap = this.data.goodsWrap[g];

      offset += 30;

      if (scrollTop <= offset) {

        if (this.data.categoryToView != goodWrap.scrollId) {
          this.setData({
            categorySelected: goodWrap.scrollId,
            categoryToView: goodWrap.scrollId,
          })
        }

        break;
      }


      for (let i = 0; i < goodWrap.goods.length; i++) {

        offset += 91;

        if (scrollTop <= offset) {

          if (this.data.categoryToView != goodWrap.scrollId) {
            this.setData({
              categorySelected: goodWrap.scrollId,
              categoryToView: goodWrap.scrollId,
            })
          }

          isBreak = true;
          break;
        }
      }

      if (isBreak){
        break;
      }


    }

  
  }
})