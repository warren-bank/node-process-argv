require('./lib/hack')

try {
  const argv_vals = require('./lib/process_argv')

  console.log(JSON.stringify(argv_vals, null, 2))
}
catch(e) {
  console.error(e.message)
}

process.exit(0)
