const lineBreaks = /\n/g
const lineFeeds = /\r/g

export class PcodeTokenizer {
    #pcode = []
    #done = false
    #line
    #col
    #peekToken = ''

    constructor(pcodeLines) {
        this.#pcode = []
        this.#done = false
        this.eof = false
        this.eol = false
        this.#line
        this.#col
        this.#peekToken = ''

        for (let line of pcodeLines) {
            let ins
            if (line[0] == 'i') {
                ins = line.split(/\s(.*)/)
                if (ins.length > 1) {
                    ins.pop()
                }
                ins[ins.length - 1] = ins[ins.length - 1].trim()
            } else if (line[0] == ':') {
                ins = line.split(/(:)/)
                ins.shift()
            } else {
                ins = line.replace('=',' =').split(/\s+/g)

                if (ins[0] == '') {
                    ins[0] = ' '
                }
            }
            this.#pcode.push(ins)
        }

        //Pop the last empty line

        this.#pcode.pop()
                  
        this.l = this.#lines(this.#pcode)
    }

    *#tokens(line) {
        for (this.#col = 0; this.#col < line.length; this.#col++) {
            this.eol = false
            let token = line[this.#col]
            if (this.#col == line.length - 1) {
                this.eol = true
                this.#peekToken = ''
            } else {
                this.#peekToken = line[this.#col + 1]
            }
            yield token
        }
    }

    *#lines(pcode) {
        for (this.#line = 0; this.#line < pcode.length; this.#line++) {
            for (let token of this.#tokens(pcode[this.#line])) {
                if (this.#line == pcode.length - 1 && this.eol) {
                    this.eof = true
                }
                yield token
            }
        }
    }

    readln() {
        let tokens = []
        let token
        do {
            token = this.l.next()
            tokens.push(token.value)
        } while (!this.eol && !token.done)
        if (token.done) {
            this.eof = true
        }
        return tokens
    }

    getNext() {
        let token = this.l.next()
        if (token.done) {
            this.eof = true
            return undefined
        } else {
            return token.value
        }
    }

    get peek() {
        return this.#peekToken
    }
}
