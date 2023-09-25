import request from '@/utils/request'

//查询当前用户的留言
export function findMessage(messageRecv) {
  return request({
    url: `/message/${messageRecv}`,
    method: 'get',
})
}


//留言回复
export function replyMessage(data) {
  return request({
    url: '/message/reply',
    method: 'post',
    data
  })
}

//新发起留言
export function newMessage(data) {
  return request({
    url: '/message',
    method: 'post',
    data
  })
}
