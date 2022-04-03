const write_debug_info = true

const stream = require('stream')

const {is_stdin_drained} = require('../../lib/grep_argv')
require('./lib/hack')

let total_listeners, ready_listeners

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
        ready_listeners++

        if (write_debug_info)
          console.log('[stream event] readable:', ready_listeners, ' /', (total_listeners * 2))

        if (ready_listeners === (total_listeners * 2)) {
          callback()
        }
      })
    })
  }
}

try {
  const argv_vals = require('./lib/process_argv')

  if (write_debug_info && is_stdin_drained())
    console.log('[stdin stream] drained')

  total_listeners = 0
  ready_listeners = is_stdin_drained() ? 2 : 0

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

  if (!total_listeners)
    callback()
}
catch(e) {
  console.error(e.message)
}
