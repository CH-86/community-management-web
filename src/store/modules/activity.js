import {approval, findAllByPaging, findTotal, removeById, add, findActivitiesByUser, joinActivity} from '@/api/activity'

const state = {
  activities: []
};

const mutations = {
  SET_ACTIVITIES: (state, activities) => {
    state.activities = activities
  }
};
const actions = {
  findAllByPaging({commit}, params) {
    return new Promise((resolve, reject) => {
      findAllByPaging(params).then(response => {
        commit('SET_ACTIVITIES', response.data);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //查询总记录条数
  findTotal({commit}) {
    return new Promise((resolve, reject) => {
      findTotal().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //管理员根据ID删除活动信息
  removeById({commit}, activityId) {
    return new Promise((resolve, reject) => {
      removeById(activityId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 管理员根据ID删除活动信息
  approval({commit}, data) {
    return new Promise((resolve, reject) => {
      approval(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
// 发布活动、招新
  add({commit}, data) {
    return new Promise((resolve, reject) => {
      add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据用户查询活动信息
  findActivitiesByUser({commit}, params) {
    return new Promise((resolve, reject) => {
      findActivitiesByUser(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户报名参加活动
  joinActivity({commit}, data) {
    return new Promise((resolve, reject) => {
      joinActivity(data).then(response => {
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

