Page({
  data: {
    identity:'referee'
  },
  //事件处理函数
  bindReferee: function(){
    this.setData({
      identity:'referfee'
    }),
    wx.navigateTo({
      url: '../referee/referee'
    })
  },
  bindPlayer: function(){
    this.setData({
      identity:'player'
    }),
    wx.navigateTo({
      url: '../player/player'
    })
  }
})
