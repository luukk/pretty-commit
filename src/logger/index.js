const bunyan = require('bunyan')

module.exports.$log = bunyan.createLogger({
    name: 'monti',
    src: true,
    streams:[
        {
            level: 'info',
            stream: process.stdout
        }
    ]
})
