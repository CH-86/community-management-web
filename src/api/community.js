import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/communities',
    method: 'get',
})
}

/*
分页查询所有社团信息
*/
export function findAllByPaging(params) {
  return request({
    url: '/communities/paging',
    method: 'get',
    params: params
  })
}


/*
  获取社团列表总记录条数
*/
export function findTotal() {
  return request({
    url: '/communities/total',
    method: 'get'
  })
}

/*
  创建社团
*/
export function add(data) {
  return request({
    url: '/communities',
    method: 'post',
    data
  })
}

/*
  修改社团信息
*/
export function modify(data) {
  return request({
    url: '/communities',
    method: 'put',
    data
  })
}

/*
  删除社团信息
*/
export function removeById(communityId) {
  return request({
    url: `/communities/${communityId}`,
    method: 'delete',
  })
}

/*
  管理员审核社团
*/
export function approvalCommunity(data) {
  return request({
    url: `/communities/approvalCommunity`,
    method: 'put',
    data
  })
}

/*
  报名参加社团
*/
export function joinCommunity(data) {
  return request({
    url: `/communities/join`,
    method: 'post',
    data
  })
}

