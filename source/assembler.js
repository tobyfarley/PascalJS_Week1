import { readFileSync } from 'node:fs'
import { PcodeTokenizer } from './pcodetokenizer.js'

export function assembler(pcodePath, sizeInBytes) {
    const lineBreaks = /\n/g
    const lineFeeds = /\r/g

    const pcodeLines = readFileSync(pcodePath, 'utf8')
        .replace(lineFeeds, '')
        .split(lineBreaks)

    let tokens = new PcodeTokenizer(pcodeLines)

    while (!tokens.eof) {
        console.log(tokens.getNext())
    }
}