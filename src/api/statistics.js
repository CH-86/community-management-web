import request from '@/utils/request'

export function newsStatistics() {
  return request({
    url: '/statistics/news',
    method: 'get',
})
}
export function activitiesStatistics() {
  return request({
    url: '/statistics/activities',
    method: 'get',
  })
}

export function membersStatistics() {
  return request({
    url: '/statistics/members',
    method: 'get',
  })
}

//优秀社团评选 社团排名
export function ranking() {
  return request({
    url: 'statistics/rank',
    method: 'get',
  })
}
