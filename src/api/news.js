import request from '@/utils/request'
// 获取新闻、公告信息列表
export function findAll(params) {
  return request({
    url: '/news',
    method: 'get',
    params: params
})
}
// 发布新闻、公告
export function add(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}

// 修改新闻、公告信息
export function modify(data) {
  return request({
    url: '/news',
    method: 'put',
    data
  })
}

// 根据ID删除新闻、公告
export function removeNewsById(newsId) {
  return request({
    url: `/news/${newsId}`,
    method: 'delete'
  })
}

// 根据ID查询新闻、公告
export function findNewsInfoById(newsId) {
  return request({
    url: `/news/${newsId}`,
    method: 'get'
  })
}

//  管理员审核新闻、公告
export function approvalNews(params) {
  return request({
    url: `/news/approval`,
    method: 'put',
    params: params
  })
}

// 查询新闻、公告总记录条数
export function findTotal(newsType) {
  return request({
    url: `/news/total/${newsType}`,
    method: 'get'
  })
}
