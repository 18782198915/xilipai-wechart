// pages/BottomView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showBottom: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    // 添加微信
    addWechart() {
      this.setData({
        showBottom: true
      })
    },
    // 取消
    closePopup() {
      this.setData({
        showBottom: false
      })
    }
  }
})
