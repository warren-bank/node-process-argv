const Buffer = require('buffer').Buffer
const fs     = require('fs')

const BUFSIZE     = 256
const buf         = Buffer.alloc(BUFSIZE)
const buffers     = []
let   totalLength = 0
let   bytesRead

const stdinToBuffer = function() {
  do {
    // Loop as long as stdin input is available.
    bytesRead = 0
    try {
      bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE, null)
    }
    catch (e) {
      if (e.code === 'EAGAIN') {
        // 'resource temporarily unavailable'
        // Happens on OS X 10.8.3, but not Windows 7.
        // Happens when there is no stdin input.
        // Happens when invoking a script without any input (for interactive stdin input).
        // If you were to just continue, you'd create an infinite loop.
        throw 'ERROR: interactive stdin input is not supported'
      }
      else if (e.code === 'EOF') {
        // Happens on Windows 7, but not OS X 10.8.3.
        // Signals the end of *piped* stdin input.
        break
      }
      throw e // unexpected exception
    }
    if (bytesRead === 0) {
      // Happens on OS X 10.8.3: Signals the end of stdin input for all methods of input.
      // Happens on Windows 7:   Signals the end of *interactive* stdin input.
      // No more stdin input available.
      break
    }
    // Process the chunk read.
    buffers.push(
      Buffer.from(
        Uint8Array.prototype.slice.call(buf, 0, bytesRead)
      )
    )
    totalLength += bytesRead
  } while (bytesRead > 0)

  return Buffer.concat(buffers, totalLength)
}

module.exports = {stdinToBuffer}
