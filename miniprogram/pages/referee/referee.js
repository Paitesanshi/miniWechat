// pages/Referee/referee.js
//var timer=15a
const db=wx.cloud.database();
const collection=db.collection('status');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    timer:5,
    name:''
  },
  countDown: function () {
    var that = this;
    var timer = that.data.timer;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到timer的数值动态变化，所以要把定时器存进data里面
    that.setData({
      name: setInterval(function () {//这里把setInterval赋值给变量名为name的变量
        //每隔一秒timer就减一，实现同步
        timer--;
        //然后把timer存进data，好让用户知道时间在倒计着
        that.setData({
          timer: timer
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (timer == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.name);
          const doc = {
            started: true,
          }
          collection.add({
            data: doc,
          })
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  },
  bindStart: function(){
    this.setData({
      status:true
    }),
    //setTimeout(this.countDown(), 1000)
    this.countDown();
  },
  bindNext: function(){
    if(this.data.name!=''){
      clearInterval(this.data.name);
    }
    this.setData({
      status: false,
      timer:5
    })
    const doc = {
      started: false,
    }
    collection.add({
      data: doc,
    })
   
  }
})