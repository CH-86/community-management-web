import {findAll, add, update} from '@/api/college'

const getDefaultState = () => {
  return {
    colleges: []
  }
}
const state = getDefaultState()

const mutations = {
  SET_COLLEGES: (state, colleges) => {
    state.colleges = colleges
  }
}
const actions = {
  findAll({commit}) {
    return new Promise((resolve, reject) => {
      findAll().then(response => {
        commit('SET_COLLEGES', response.data)
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

