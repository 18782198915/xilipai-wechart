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
    categorySelected: "s0",
    goodsToView: "",
    categoryToView: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.request({
      url: 'http://www.xilipai.cn:3000/api/getAllProduct',
      method: 'get',
      success(res) {
        if(res.statusCode == 200){
          console.log(res)
          res.typeList
          const goodsWrap = []
          const categories = res.data.typeList.map((el, index) => {
            let wrap = {};
            wrap.id = index + 1;
            wrap.scrollId = "s" + (index+1);
            wrap.name = el.type;
            let goods = [];
    
            res.data.allProduct.forEach((item, i) => {
              goods.push({...item, productType: el.type})
            })
            wrap.goods = goods;
            goodsWrap.push(wrap);
            return { id: index + 1, scrollId: 's' + (index + 1), name: el.type, imgUrl: el.imgUrl}
          })
          console.log(goodsWrap)
          const arr = [...categories]
          goodsWrap.unshift({ id: 0, scrollId: 's0', name: '全部', goods: arr })
          categories.unshift({ id: 0, scrollId: 's0', name: '全部' })
          that.setData({
            categories: categories,
            goodsWrap: goodsWrap
          })
          console.log(res)
        }
      }
    })
  },
  toDetailsTap: function(e) {
    console.log(e)
    const index = e.currentTarget.dataset.index
    const goodsindex = e.currentTarget.dataset.goodsindex
    const scrollId = e.currentTarget.dataset.scrollid
    if (index === 0) {
      this.setData({
        categorySelected: scrollId,
        goodsToView: scrollId,
        categoryToView: scrollId,
      })
    } else {
      wx.navigateTo({
        url: "/pages/goods-details/index?info=" + encodeURIComponent(JSON.stringify(this.data.goodsWrap[index].goods[goodsindex]))
      })
    }
  },
  onCategoryClick: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id;
    console.log(id)
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