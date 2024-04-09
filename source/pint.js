import { assembler } from './assembler.js'
import { parseArgs } from 'node:util'

const args = parseArgs({
    options: {
        asmPath: {
            type: 'string',
            short: 'a',
        },
    },
})

let store = assembler(args.values.asmPath, 2000000)

