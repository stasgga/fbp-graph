const toposort = require('toposort')

const add = (inputs) => inputs.reduce((x, y) => x + y, 0)
const double = (x) => x * 2

class Node {
  constructor (inputs) {
    this.inputs = inputs
  }
}

class Add extends Node {
  work () {
    return this.inputs.reduce((x, y) => x + y, 0)
  }
}

class Double extends Node {
  work () {
    return this.inputs * 2
  }
}

console.log(new Add([10, 20, 40]).work())

// console.log(double(add([10, 1])))
// const double = ...inputs => inputs.x*2
// const triple = ...inputs => inputs.x*3

// class Node {
//   constructor(x,y) {
//     this.x = x
//     this.y = y
//   }
//   work() {

//   }
// }

// const add1 = add(2, 2)
// const sub1 = subtract(2, 2)
// const mul1 = multiply(2, 2)

// const nodes = [
//   {id: 1, name: 'homer'},
//   {id: 2, name: 'marge'},
//   {id: 3, name: 'grandpa'},
//   {id: 4, name: 'bart'},
//   {id: 5, name: 'maggie'}
// ]

// const edges = [[1, 4], [1, 5], [3, 1], [2, 4], [2, 5]]

// // edges.forEach(edge => {
// //   const from = nodes.find(n => n.id===edge[0])
// //   const to = nodes.find(n => n.id===edge[1])

// //   console.log(from.name + "->" + to.name)
// // })

// const graph = [
//   ['homer', 'maggie'],
//   ['bart', 'stampy'],
//   ['abe', 'herb'],
//   ['jacqueline', 'selma'],
//   ['selma', 'ling'],
//   ['mona', 'homer'],
//   ['clancy', 'selma'],
//   ['jacqueline', 'marge'],
//   ['jacqueline', 'patty'],
//   ['homer', 'bart'],
//   ['homer', 'lisa'],
//   ['clancy', 'marge'],
//   ['marge', 'bart'],
//   ['marge', 'lisa'],
//   ['abe', 'homer'],
//   ['mona', 'herb'],
//   ['clancy', 'patty'],
//   ['marge', 'maggie']
// ]

// console.log(toposort.array(
//   ['krusty', 'lisa', 'patty', 'maggie', 'stampy', 'sideshow bob', 'bart', 'marge', 'ling', 'selma', 'clancy', 'herb', 'homer', 'mona', 'jacqueline', 'abe'],
//   graph
// ))

// // console.log(toposort(edges).map(id => nodes.find(n => n.id === id)))
// // console.log(toposort(graph).reverse())
