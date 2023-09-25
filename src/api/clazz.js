import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/clazzs',
    method: 'get',
})
}
// 添加班级
export function add(data) {
  return request({
    url: '/clazzs',
    method: 'post',
    data
  })
}

// 修改班级信息
export function update(data) {
  return request({
    url: '/clazzs',
    method: 'put',
    data
  })
}

