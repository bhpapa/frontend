import Mock from 'mockjs'
const data = Mock.mock({
  title: '@ctitle(5)',
  sentence: '@csentence(50)'
})
console.log(data)
