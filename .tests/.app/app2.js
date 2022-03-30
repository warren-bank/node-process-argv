const stream = require('stream')

require('./lib/hack')

let total_listeners = 0
let ready_listeners = 0

const add_stream_listener = ($stream, callback) => {
  if (!$stream) return

  if (Array.isArray($stream)) {
    for (let i=0; i < $stream.length; i++) {
      add_stream_listener($stream[i], callback)
    }
  }

  if ($stream instanceof stream.Readable) {
    total_listeners++

    process.nextTick(() => {
      $stream.on('readable', () => {
        if ($stream.readableLength) {
          ready_listeners++

          if (ready_listeners === total_listeners) {
            callback()
          }
        }
      })
    })
  }
}

try {
  const argv_vals = require('./lib/process_argv')

  const callback = () => {
    console.log(JSON.stringify(argv_vals, null, 2))
  }

  add_stream_listener(
    [
      argv_vals['--file-stream'],
      argv_vals['--file-stream-many']
    ],
    callback
  )
}
catch(e) {
  console.error(e.message)
}
