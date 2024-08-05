/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/func-call-spacing */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
import pino from 'pino'
import pretty from 'pino-pretty'
import moment from 'moment'

const stream = pretty({
    colorize: true,
})

export const logger = pino (
    {
        base: {
            pid: false
        },
        timestamp: () => `, "time": "${moment().format()}"`,
    },
    stream
)