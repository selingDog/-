// pages/conpontens/home-list/home-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    godetail(e){
      wx.navigateTo({
        url:`../../pages/detail/detail?pid=${e.currentTarget.dataset.pid}`,
      })
    }
  }
})