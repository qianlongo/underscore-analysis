let _ = require('./_')

let testArr = ['a', 'b']
let testObj = {
  name: 'qianlongo',
  sex: 'boy'
}
// _.each(testArr, (v, i, obj) => {
//   console.log(v, i, obj)
// })

let newArr = _.map(testArr, (v, i, obj) => {
  return `${v}-hello`
})

console.log(newArr)