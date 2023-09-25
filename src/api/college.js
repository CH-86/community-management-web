import request from '@/utils/request'

export function findAll() {
  return request({
    url: '/colleges',
    method: 'get',
})
}

// 添加学院
export function add(data) {
  return request({
    url: '/colleges',
    method: 'post',
    data
  })
}

  // 修改学院信息
  export function update(data) {
    return request({
      url: '/colleges',
      method: 'put',
      data
    })
}
