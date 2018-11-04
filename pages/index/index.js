//index.js
//获取应用实例
const app = getApp();
const segmentsList = [
  { segment_id: 0, title: "国内", en_title: "gn", active: true },
  { segment_id: 1, title: "国际", en_title: "gj", active: false },
  { segment_id: 2, title: "财经", en_title: "cj", active: false },
  { segment_id: 3, title: "娱乐", en_title: "yl", active: false },
  { segment_id: 4, title: "军事", en_title: "js", active: false },
  { segment_id: 5, title: "体育", en_title: "ty", active: false },
  { segment_id: 6, title: "其他", en_title: "other", active: false}
];
var currentSectionIndex = 0;

Page({
  data: {
    cureentTab: 0,
    segmentsList: segmentsList,
    imgUrls: [{ image: '/images/toutiao_news_first.jpg', title: '独家对话胡一天:不介意被定义为"流量"偶像' },
    { image: '/images/toutiao_news_second.jpg', title: "重庆公交坠江原因公布:乘客与司机互殴致车辆失控" },
    { image: '/images/toutiao_news_thrid.jpg', title: "重庆公交坠江原因公布:乘客与司机互殴致车辆失控" },
    { image: '/images/toutiao_news_four.jpg', title: "重庆公交坠江原因公布:乘客与司机互殴致车辆失控" },
    { image: '/images/toutiao_news_five.jpg', title: "重庆公交坠江原因公布:乘客与司机互殴致车辆失控" },
    { image: '/images/toutiao_news_six.jpg', title: "重庆公交坠江原因公布:乘客与司机互殴致车辆失控" }],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1300,
    articlesList: []
  },
  onLoad() {
    this.loadArticles(0);
  },

  onPullDownRefresh() {
    this.loadArticles(0, () => {
      wx.stopPullDownRefresh();
    });
  },

  onSectionClicked(event) {
    console.log(event);
    let sid = event.currentTarget.dataset.sid;
    
    // //刷新新闻类别选中状态
    // for (var i in segmentsList) {
    //   if (segmentsList[i]['segment_id'] == sid) {
    //     segmentsList[i]['active'] = true
    //     currentSectionIndex = i
    //   } else {
    //     segmentsList[i]['active'] = false
    //   }
    // }
    this.setData({
      cureentTab: sid,
      segmentsList: segmentsList
    });
    this.loadArticles(sid);
  },

  loadArticles(section_id, callback) {
    //获取新闻类型
    let new_type = segmentsList[section_id]["en_title"];
    console.log(new_type);
    //获取文章列表
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: new_type
      },
      success: res => {
        let result = res.data.result;
        console.log(result);
        if (result && result.length) {
          //截取日期字符串
          result.forEach(function (item) {
            item.date = item.date.substring(0, 10);
          })
          //设置新闻列表数据
          this.setData({
            articlesList: result
          })
        }
      },
      fail: () => {
        console.log("onFail");
      },
      complete: () => {
        typeof callback === 'function' && callback();
      }
    })
  },

  onArticleClicked(event) {
    var aid = event.currentTarget.dataset.aid;
    console.log(event);
    wx.navigateTo({
      url: '/pages/detail/detail?article_id=' + aid,
    })
  },


})
