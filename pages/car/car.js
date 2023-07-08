// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num1: 0,
    num2: 0,
    result: "",
    totalmoney: 0,
    token: null,
    hotlist: null,
    allchecked: [],
    radio: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log("onload");
    // this.data.totalmoney = 0,
    // // console.log("onshow");
    // wx.getStorage({
    //   key: "token",
    //   success: res => {
    //     // console.log(res.data);
    //     this.setData({
    //         token: res.data
    //       }),
    //       wx.request({
    //         url: 'http://www.kangliuyong.com:10002/findAllShopcart',
    //         method: "GET",
    //         data: {
    //           appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
    //           tokenString: this.data.token
    //         },
    //         success: res => {
    //           // console.log(res);
    //           this.setData({
    //             hotlist: res.data.result,
    //           })
    //           // console.log(this.data.hotlist);
    //           for (let index = 0; index < this.data.hotlist.length; index++) {
    //             let item = this.data.hotlist[index];
    //             this.data.totalmoney += parseFloat(item.price) * parseInt(item.count);
    //           }
    //           console.log(this.data.totalmoney);
    //         }
    //       })
    //   }
    // })
    // console.log();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // console.log("onReady");
  },

  replace(e) {
    // console.log(this.data);
    const child = this.selectComponent('.carlist');
    // console.log(child.data.checked)
    this.setData({
      allchecked: child.data.checked
    })
    // console.log(this.data.allchecked);
    this.onShow()
  },
  //全选
  changeallcheck(e) {
    // console.log("countmoney");
    // console.log(e);
    this.setData({
      radio: e.detail
    });
    if (e.detail) {
      // console.log(this.data.hotlist);
      let alll = this.data.hotlist;
      let allmoney = 0
      for (let i = 0; i < alll.length; i++) {
        allmoney += parseFloat(alll[i].price) * parseInt(alll[i].count);
      }
      this.setData({
        totalmoney: allmoney,
      })
    } else {
      this.setData({
        totalmoney: 0,
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.data.totalmoney = 0,
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
              token: res.data
            }),
            wx.request({
              url: 'http://www.kangliuyong.com:10002/findAllShopcart',
              method: "GET",
              data: {
                appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
                tokenString: this.data.token
              },
              success: res => {
                let allmoney = 0;
                this.data.allchecked.forEach(checkk => {
                  res.data.result.forEach(alll => {
                    if (checkk == alll.sid) {
                      allmoney += parseFloat(alll.price) * parseInt(alll.count);
                    }
                  });
                });
                this.setData({
                  totalmoney: allmoney,
                  hotlist: res.data.result,
                })
              }
            })
        }
      })
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

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