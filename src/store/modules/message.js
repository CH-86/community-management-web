import {findMessage, newMessage, replyMessage} from '@/api/message'

const state = {
  messageList: []
}

const mutations = {
  SET_MESSAGE_LIST: (state, messageList) => {
    state.messageList = messageList
  }
};

const actions = {
  // 查询当前用户的留言
  findMessage({ commit },messageRecv) {
    return new Promise((resolve, reject) => {
      findMessage(messageRecv).then(response => {
        commit('SET_MESSAGE_LIST',response.data);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 留言回复
  replyMessage({ commit },data) {
    return new Promise((resolve, reject) => {
      replyMessage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 新发起留言
  newMessage({ commit },data) {
    return new Promise((resolve, reject) => {
      newMessage(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

