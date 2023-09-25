import { findAll, add, modify,removeNewsById,findNewsInfoById,approvalNews,findTotal } from '@/api/news'

const state = {
  news: [],
  total:0,
}

const mutations = {
  SET_NEWS: (state, news) => {
    state.news = news
  },
  SET_TOTAL: (state, total) => {
    state.total = total
  }
}
const actions = {
  findAll({ commit },params) {
    return new Promise((resolve, reject) => {
      findAll(params).then(response => {
        commit('SET_NEWS',response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findTotal({ commit },newsType) {
    return new Promise((resolve, reject) => {
      findTotal(newsType).then(response => {
        commit('SET_TOTAL',response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  add({commit},data) {
    return new Promise((resolve, reject) => {
      add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  removeById({commit},newsId) {
    return new Promise((resolve, reject) => {
      removeNewsById(newsId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  findById({commit},newsId) {
    return new Promise((resolve, reject) => {
      findNewsInfoById(newsId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  approvalNews({commit},params) {
    return new Promise((resolve, reject) => {
      approvalNews(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  modify({commit},data) {
    return new Promise((resolve, reject) => {
      modify(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

