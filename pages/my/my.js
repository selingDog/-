// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mineobj:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
   

  },
  gomyin() {
    wx.navigateTo({
      url: '../myin/myin',
    })
  },
  gomyaddress() {
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // console.log(this.data.token);
    wx.getStorage({
      key: "token",
      success: res => {
        // console.log(res.data);
        this.setData({
          token: res.data
        })
        wx.request({
          url: 'http://www.kangliuyong.com:10002/findMy',
          method: "GET",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: this.data.token
          },
          success: res => {

            //  console.log(res.data.result[0]);
            this.setData({
              mineobj: res.data.result[0]
            })
            // console.log(res.data);
            console.log(this.data.mineobj);
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})