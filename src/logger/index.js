import bunyan from 'bunyan'

exports.$log = bunyan.createLogger({
    name: 'monti',
    src: true,
    streams:[
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: './logs/monti-error.log'
        }
    ]
})
