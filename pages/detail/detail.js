// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 微标数量
    count: null,
    // 商品是否收藏的变量
    isshow: false,
    //商品详情的集合
    dataobj: null,
    //商品pid
    pid: null,
    //糖分的题目
    sugar_desc: null,
    //糖分的选择
    sugar: null,
    //温度的题目
    tem_desc: null,
    //温度的选择
    tem: null,
    //切换选中糖分的规格
    sugarindex: 0,
    // 选中的糖分的文字
    oksugar: "全糖",
    // 选择温度的样式index
    temindex: 0,
    // 选择好的温度
    oktem: "冷",
    //选择的数量
    count: 1,
    arrs: null,
    list: ['1、', '2、', '3、', '4、', '5、'],
    // 用户的登录密钥
    token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //options:可以拿到在其它页面通过页面跳转的方式传递过来的参数
    console.log(options);
    //获取pid
    //let pid =options.pid;
    //let pid =options.pid;
    this.setData({
      pid: options.pid
    })

    //获取token
    wx.getStorage({
        key: "token",
        success: res => {
          console.log(res.data);
          this.setData({
            token: res.data
          })
          //获取所有收藏品，对比当前的商品从而实现该商品有没有被收藏
          wx.request({
            url: 'http://www.kangliuyong.com:10002/findAllLike',
            method: "GET",
            data: {
              appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
              tokenString: this.data.token
            },
            success: res => {
              console.log(res.data);
              // console.log(this.data.token);
              // 取出所有收藏的商品
              let arr = res.data.result;
              console.log(arr);
              for (let i = 0; i < arr.length; i++) {
                //判断数组里面的pid是否相等
                if (this.data.pid == arr[i].pid) {
                  this.setData({
                    isshow: true
                  })
                }
              }
            }
          })
        }
      }),

      //获取商品详情数据
      wx.request({
        url: 'http://www.kangliuyong.com:10002/productDetail',
        method: "GET",
        data: {
          pid: options.pid,
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        },
        success: res => {
          console.log(res);
          let sugar = res.data.result[0].sugar.split("/");
          let tem = res.data.result[0].tem.split("/");
          this.setData({
            dataobj: res.data.result[0],
            sugar: sugar,
            sugar_desc: res.data.result[0].sugar_desc,
            tem: tem,
            tem_desc: res.data.result[0].tem_desc
          })
          let str = this.data.dataobj.desc;
          let arr = str.split("。");
          arr.splice(-1, 1)
          this.setData({
            arrs: arr
          })
        }
      })
  },

  //糖分的选择
  sugar(e) {
    // console.log(e.currentTarget.dataset.index);
    //选中的糖分的下标
    let index = e.currentTarget.dataset.index;
    //选中的糖分的文字
    let oksugar = e.currentTarget.dataset.text;
    this.setData({
      sugarindex: index,
      oksugar: oksugar
    })
  },

  //温度的选择
  tem(e) {
    console.log(e.currentTarget.dataset.index);
    //选中的温度的下标
    let index = e.currentTarget.dataset.index;
    //选中的温度的文字
    let oktem = e.currentTarget.dataset.text;
    this.setData({
      temindex: index,
      oktem: oktem
    })
  },
  //增加商品数量
  add() {
    let num = this.data.count;
    num++;
    this.setData({
      count: num
    })
  },
  //减少商品数量
  sub() {
    let num = this.data.count;
    if (num == 1) {
      wx.showToast({
        title: '买一份嘛哥哥~',
        icon: "error",
        mask: true
      })
    } else {
      num--;
      this.setData({
        count: num
      })
    }
  },

  // 添加/取消收藏事件
  addcollect() {
    let that = this;
    // 判断商品是否已经收藏
    if (that.data.isshow == false) {
      // 商品未收藏，调用收藏的接口
      // 判断用户是否已经登陆
      if (that.data.token != null) {
        wx.request({
          url: 'http://www.kangliuyong.com:10002/like',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            pid: that.data.dataobj.pid,
            tokenString: that.data.token
          },
          success: res => {
            that.setData({
              isshow: true
            })
            wx.showToast({
              title: '已成功收藏',
              icon: "success"
            })
          },
          //打印失败的原因
          fail: err => {
            console.log(err);
          }
        })
      } else {
        //如果用户没有登录，就跳到登录页面
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }
    //如果用户已经收藏商品
    if (that.data.isshow == true) {
      if (that.data.token != null) {
        wx.request({
          url: 'http://www.kangliuyong.com:10002/notlike',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            pid: that.data.dataobj.pid,
            tokenString: that.data.token
          },
          success: res => {
            that.setData({
              isshow: false
            });
            wx.showToast({
              title: '已取消收藏',
              icon: "error"
            })
          }
        })
      }
    }
  },

  //加入购物车
  addcart(e) {
    // console.log(e);
    let that = this;
    wx.getStorage({
      key: "token",
      success: res => {
        let token = res.data;

        //访问加入购物车的接口
        wx.request({
          url: 'http://www.kangliuyong.com:10002/addShopcart',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          data: {
            pid: that.data.pid,
            count: that.data.count,
            rule: `${that.data.oktem}/${that.data.oksugar}`,
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            tokenString: token
          },
          success: res => {
            wx.showToast({
              title: '加入成功',
              icon: "success"
            })
          }
        })
      },
      //加入失败
      fail: res => {
        wx.showToast({
          title: "加入失败",
          icon: "error"
        })
        wx.navigateTo({
          url: '../login/login',
        })
      }
    })
  },

  // 跳转购物车
  gocart() {
    wx.switchTab({
      url: '../car/car',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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