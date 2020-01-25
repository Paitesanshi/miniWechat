// pages/Player/player.js
const db = wx.cloud.database();
const collection1 = db.collection('status');
const collection2 = db.collection('rank');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      team:'',
      status:true
  },
  answerQuickly: function(){
    var app = getApp();
    const doc = {
      teamname: app.globalData.name,
    }
    collection2.add({
      data: doc,
    })
  },
  onReady() {
    collection1.watch({
      onChange: this.onChange1.bind(this),
      onError(err) {
        console.error(err);
      }
    })
    collection2.watch({
      onChange: this.onChange2.bind(this),
      onError(err) {
        console.error(err);
      }
    })
  },
  onChange1(snapshot) {
    if (snapshot.type != 'init') {
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case 'enqueue':
            if(docChange.doc.started==true)
            {
              this.setData({
                status: false,
              })
            }
            else{
              this.setData({
                status: true,
                team: ''
              })

            }
            break;
        }
      }
    }
  },
  onChange2(snapshot) {
    console.log(snapshot);
    if (snapshot.type != 'init') {
      console.log(111);
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case 'enqueue':
            if(this.data.team==''){
              this.setData({
                team: docChange.doc.teamname,
              })
            }
            break;
        }
      }
    }
  }
})
/*
   
 */