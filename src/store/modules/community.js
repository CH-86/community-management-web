import {
  findAll,
  findAllByPaging,
  findTotal,
  add,
  modify,
  removeById,
  approvalCommunity,
  joinCommunity
} from '@/api/community'

const state = {
  communities: [],
  communitiesInfos: []
}

const mutations = {
  SET_COMMUNITIES: (state, communities) => {
    state.communities = communities
  },
  SET_COMMUNITIES_INFOS: (state, communitiesInfos) => {
    state.communitiesInfos = communitiesInfos
  }
}
const actions = {
  findAll({commit}) {
    return new Promise((resolve, reject) => {
      findAll().then(response => {
        commit('SET_COMMUNITIES', response.data)
        resolve(response)

      }).catch(error => {
        reject(error)
      })
    })
  },

  /*
  * 分页查询所有社团信息
  * */
  findAllByPaging({commit}, params) {
    return new Promise((resolve, reject) => {
      findAllByPaging(params).then(response => {
        commit('SET_COMMUNITIES_INFOS', response.data);
        resolve(response)

      }).catch(error => {
        reject(error)
      })
    })
  },

  /*
  * 获取社团总记录条数
  * */
  findTotal({commit}) {
    return new Promise((resolve, reject) => {
      findTotal().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /*
  * 创建社团
  * */
  add({commit}, data) {
    return new Promise((resolve, reject) => {
      add(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /*
* 修改社团信息
* */
  modify({commit}, data) {
    return new Promise((resolve, reject) => {
      modify(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /*
* 删除
* */
  removeById({commit}, communityId) {
    return new Promise((resolve, reject) => {
      removeById(communityId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /*
* 管理审批
* */
  approvalCommunity({commit}, data) {
    return new Promise((resolve, reject) => {
      approvalCommunity(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
    /*
  * 报名参加社团
  * */
  joinCommunity({commit}, data) {
    return new Promise((resolve, reject) => {
      joinCommunity(data).then(response => {
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

