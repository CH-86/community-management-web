import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}


export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 注册
export function register(data) {
  return request(
    {
      url: '/register',
      method: 'post',
      data
    }
  )
}

// 获取用户列表
export function users(data) {
  const {pageSize, pageNum, order} = data
  return request({
    url: `/users?pageNum=${pageNum}&pageSize=${pageSize}&order=${order}`,
    method: 'get',
  })

}

// 修改用户信息
export function updateUserInfo(data) {
  return request(
    {
      url: '/updateUserInfo',
      method: 'post',
      data
    }
  )
}

// 根据ID查询单个用户信息
export function findById(userId) {
  return request(
    {
      url: `/users/${userId}`,
      method: 'get',
    }
  )
}

 // 根据ID删除单个用户
export function deleteById(userId) {
  return request(
    {
      url:  `/users/${userId}`,
      method: 'delete'
    }
  )
}

// 批量删除用户
export function batchDeleteById(data) {
  return request(
    {
      url: '/batchDeleteUser',
      method: 'post',
      data
    }
  )
}

// 查询用户表总记录条数
export function getTotal() {
  return request(
    {
      url: '/users/total',
      method: 'get'
    }
  )
}


// 根据姓名模糊查询用户
export function findAllByLikeUserName(userName) {
  return request(
    {
      url: `/users/likeName/${userName}`,
      method: 'get'
    }
  )
}

// 根据当前登录社团管理员用户查询社团的成员信息和招新信息
export function findByCommunityId(params) {
    return request(
    {
      url: `/users/findByCommunityId`,
      method: 'get',
      params: params
    }
  )
}

// 移除社员
export function memberRemoveById(params) {
  return request(
    {
      url: `/users/memberRemoveById`,
      method: 'delete',
      params: params
    }
  )
}


// 同意招新进入的社员加入
export function memberApprovalById(params) {
  return request(
    {
      url: `/users/memberApprovalById`,
      method: 'put',
      params: params
    }
  )
}


//获取所有用户列表 用于下拉框选择
export function findAllUserForOption(params) {
  return request(
    {
      url: `/users/options`,
      method: 'get'
    }
  )
}
