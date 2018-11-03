// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    article_id: 1523074607642
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.article_id);
    this.setData({
      article_id: options.article_id
    })
    this.getNewsDetail();
  },

  getNewsDetail(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.article_id
      },
      success: res=>{
        let result = res.data.result;
        console.log(result);
        if(result){
          result.date = result.date.substring(0, 10);
          this.setData({
            article: result
          })
        }
      },
      fail: res=>{
        console.log(res);
      }
    })
  }
  
})