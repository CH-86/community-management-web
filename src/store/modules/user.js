import {
  batchDeleteById,
  deleteById, findAllByLikeUserName, findAllUserForOption, findByCommunityId,
  findById,
  getTotal,
  login,
  logout, memberApprovalById, memberRemoveById,
  register,
  updateUserInfo,
  users
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import localStorageUtil from "@/utils/localStorageUtil";

const getDefaultState = () => {
  return {
    token: getToken(),
    avatar: localStorageUtil.read('SET_AVATAR'),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, user) {
    const { userId, userPassword } = user
    return new Promise((resolve, reject) => {
      login({ userId: userId.trim(), userPassword: userPassword }).then(response => {
        const { userId} = response.data
        commit('SET_TOKEN', userId)
        localStorageUtil.save('SET_USER', response.data)
        localStorageUtil.save('SET_TOKEN', userId)
        setToken(userId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 注册
  register({ commit }, user){
    return new Promise((resolve, reject) => {
      register(user).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(reject)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 获取用户列表
  users({commit, state}, data){
    return new Promise(((resolve, reject) => {
      users(data).then((res) => {
        resolve(res)
      }).catch((error => {
        reject(error)
      }))
    }))
  },
  // 修改用户信息
  updateUserInfo({commit,state},data){
    return new Promise(((resolve, reject) =>{
      updateUserInfo(data).then((res) => {
        resolve(res)
      }).catch((error)=> {
        reject(error)
      })
    }))
  },

  // 根据ID查询单个用户信息
  findById({commit, state},userId){
    return new Promise((resolve, reject) => {
      findById(userId).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 根据ID删除单个用户信息
  deleteById({commit, state},userId){
    return new Promise(((resolve, reject) => {
      deleteById(userId).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },

  // 批量删除用户
  batchDeleteById({commit, state},ids){
    return new Promise(((resolve, reject) => {
      batchDeleteById(ids).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },

  // 查询用户表总记录条数
  getTotal({commit, state}){
    return new Promise(((resolve, reject) => {
      getTotal().then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },

  // 根据姓名模糊查询用户
  findAllByLikeUserName({commit, state},userName){
    return new Promise(((resolve, reject) => {
      findAllByLikeUserName(userName).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },

  // 根据当前登录社团管理员用户查询社团的成员信息和招新信息
  findByCommunityId({commit, state},params){
    return new Promise(((resolve, reject) => {
      findByCommunityId(params).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },

  // 移除社员
  memberRemoveById({commit, state},params){
    return new Promise(((resolve, reject) => {
      memberRemoveById(params).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },
  // 同意社团加入
  memberApprovalById({commit, state},params){
    return new Promise(((resolve, reject) => {
      memberApprovalById(params).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  },
  // 获取所有用户列表 用于下拉框选择
  findAllUserForOption({commit, state},params){
    return new Promise(((resolve, reject) => {
      findAllUserForOption(params).then((res)=> {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    }))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

