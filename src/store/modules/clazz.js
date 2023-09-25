import { findAll, add, update } from '@/api/clazz'

const state = {
  clazzs: []
}

const mutations = {
  SET_CLAZZS: (state, clazzs) => {
    state.clazzs = clazzs
  }
}
const actions = {
  findAll({ commit }) {
    return new Promise((resolve, reject) => {
      findAll().then(response => {
        commit('SET_CLAZZS',response.data)
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
  update({commit},data) {
    return new Promise((resolve, reject) => {
      update(data).then(response => {
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

