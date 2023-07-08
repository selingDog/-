// pages/conpontens/car-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      // 建立一个数据类型
      type: Array
    },
    countarr: {
      type: Array
    },
    radio:{
      type: Boolean,
      value:'',
      //数据监视
      observer(newvalue,oldvalue,path){
        let checkkk = new Array();
        if (newvalue) {
          for (let index = 0; index < this.data.arr.length; index++) {
            let {sid} = this.data.arr[index];
            checkkk.push(sid)
          }
          this.setData({
            checked:checkkk
          })
        } else {
          this.setData({
            checked:[]
          })
        }
        // this.rrplace()
        // console.log(this);
        // this.triggerEvent('carreplace')
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr: null,
    countarr: [],
    checked: [],
    totalmoney: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      // console.log(e);
      this.setData({
        checked: e.detail,
      });
      // console.log(this.data);
      this.triggerEvent('carreplace', {})
    },
    add(e) {
      // console.log(this.data);
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data
          })
        }
      })

      wx.request({
        url: 'http://www.kangliuyong.com:10002/addShopcart',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          pid: e.currentTarget.dataset.item.pid,
          count: 1,
          rule: e.currentTarget.dataset.item.rule,
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: this.data.token
        },
        success: res => {
          // wx.showToast({
          //   title: "添加成功",
          //   icon: "success"
          // })
          this.triggerEvent('carreplace')
        }
      })
    },
    sub(e) {
      // console.log(e.currentTarget.dataset);
      wx.getStorage({
        key: "token",
        success: res => {
          this.setData({
            token: res.data,
          })
        }
      })
      wx.request({
        url: 'http://www.kangliuyong.com:10002/addShopcart',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: {
          pid: e.currentTarget.dataset.item.pid,
          count: -1,
          rule: e.currentTarget.dataset.item.rule,
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: this.data.token
        },
        success: res => {
          // wx.showToast({
          //   title: "删除成功",
          //   icon: "success"
          // })
          this.triggerEvent('carreplace', {})
        }
      })
    },
  }
})