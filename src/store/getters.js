const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  clazzs: state => state.clazz.clazzs,
  communities: state => state.community.communities,
  colleges: state => state.college.colleges,
  token: state => state.user.token,
  news: state => state.news.news,
  newsTotal: state => state.news.total,
  activities: state => state.activity.activities,
  messageList: state => state.message.messageList
}
export default getters
