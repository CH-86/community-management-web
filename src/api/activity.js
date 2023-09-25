import request from '@/utils/request'

// 分页查询所有活动列表、或者查询某个社团的活动列表
export function findAllByPaging(params) {
  return request({
    url: '/activities',
    method: 'get',
    params: params
  })
}
// 查询总记录条数
export function findTotal(params) {
  return request({
    url: '/activities/total',
    method: 'get'
  })
}

// 管理员根据ID删除活动信息
export function removeById(activityId) {
  return request({
    url: `/activities/${activityId}`,
    method: 'delete'
  })
}

// 管理员根据ID删除活动信息
export function approval(data) {
  return request({
    url: `/activities/approval`,
    method: 'put',
    data
  })
}

// 发布活动、招新
export function add(data) {
  return request({
    url: '/activities',
    method: 'post',
    data
  })
}

// 根据用户查询活动信息
export function findActivitiesByUser(params) {
  return request({
    url: `/activities/${params.userId}/${params.userType}/${params.activityType}/${params.userCommunityId}`,
    method: 'get'
  })
}


// 用户报名参加活动
export function joinActivity(data) {
  return request({
    url: `/activities/join`,
    method: 'post',
    data
  })
}
