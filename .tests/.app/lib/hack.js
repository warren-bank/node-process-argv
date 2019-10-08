Object.defineProperty(RegExp.prototype, "toJSON", {
  value: RegExp.prototype.toString
})
