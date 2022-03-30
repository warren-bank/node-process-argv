const stream = require('stream')

Object.defineProperty(stream.Readable.prototype, "toJSON", {
  value: function() { return {type: 'stream.Readable', bytes: this.readableLength} }
})

Object.defineProperty(RegExp.prototype, "toJSON", {
  value: RegExp.prototype.toString
})
