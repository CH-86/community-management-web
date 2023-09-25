import {membersStatistics, activitiesStatistics, newsStatistics, ranking} from '@/api/statistics'

const state = {

};

const mutations = {
};
const actions = {
  newsStatistics({ commit }) {
    return new Promise((resolve, reject) => {
      newsStatistics().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  activitiesStatistics() {
    return new Promise((resolve, reject) => {
      activitiesStatistics().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  membersStatistics() {
    return new Promise((resolve, reject) => {
      membersStatistics().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ranking() {
    return new Promise((resolve, reject) => {
      ranking().then(response => {
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

