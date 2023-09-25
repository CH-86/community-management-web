/**
 * localStorage工具类
 * dingwen
 * 2020/12/16
 */
export default {
  read(key) {
    return JSON.parse(localStorage.getItem(key)) || ''
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
