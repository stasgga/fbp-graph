const toposort = require('toposort'),
  fs = require('fs'),
  uuidV4 = require('uuid/v4'),
  shortid = require('shortid'),
  colors = require('colors'),
  json = require('./calc.json')

const DEBUG = true

let vals = {}

// ----------

class Sink {
  constructor (name, inputs = {}) {
    if (DEBUG) { console.log(this.constructor.name + ': ' + name) }
    this.uuid = shortid.generate()
    this.inputs = inputs
  }
}

class Node extends Sink {
  constructor (name, inputs = {}) {
    super(name, inputs)
    this.outputs = {}
  }
}

// ----------

class Multiply extends Node {
  work () {
    if (this.inputs.MULTIPLICAND && this.inputs.MULTIPLIER) {
      vals[this.outputs.PRODUCT.val] = this.inputs.MULTIPLICAND.val * this.inputs.MULTIPLIER.val
    }
  }
}

class ReadFile extends Node {
  work () {
    if (this.inputs.IN) {
      vals[this.outputs.OUT.val] = fs.readFileSync(this.inputs.IN.val, 'utf8')
      // this.outputs.OUT = {
      //   uuid: shortid.generate(),
      //   val: fs.readFileSync(this.inputs.IN.val, 'utf8')
      // }
    }
  }
}

class Output extends Sink {
  work () {
    if (this.inputs.IN) {
      console.log(vals[this.inputs.IN.uuid])
      // console.log(this.inputs.IN.val)
    }
  }
}

// ----------

var components = { ReadFile, Output, Multiply }
class DynamicClass {
  constructor (className, instanceName, opts) {
    return new components[className](instanceName, opts)
  }
}

// ----------

if (DEBUG) { console.log('INSTANTIATING PROCESSES'.green) }
let processes = {}
Object.keys(json.processes).forEach(key => {
  processes[key] = new DynamicClass(
    json.processes[key].component,
    key
  )
})

if (DEBUG) { console.log('FORMING CONNECTIONS'.green) }
let graph = []
json.connections.forEach(connection => {
  let edge, targetUuid = shortid.generate(), uuid = shortid.generate()

  edge = connection.tgt
  processes[edge.process].inputs[edge.port] = { uuid: targetUuid, val: uuid }

  if (connection.data) {
    processes[edge.process].inputs[edge.port] = { uuid: shortid.generate(), val: connection.data }
  } else if (connection.src) {
    edge = connection.src
    processes[edge.process].outputs[edge.port] = { uuid: uuid, val: targetUuid }

    // connection between node and output
    graph.push([processes[edge.process].uuid, uuid])
  }

  graph.push([uuid, targetUuid])
})

console.log(JSON.stringify(processes, null, 2))

Object.keys(json.processes).forEach(key => {
  // run through graph of processes
  processes[key].work()
})

// console.log(toposort(graph))
