'use strict';

class Tresor {
    constructor({
                    role = 'client',  // Alternativ: "server
                    path = null, // Pfad zum Worker vom HTML aus gesehen
                    reducers = {},
                    schema = {},    // Der initiale State
                }) {

        if (role.toLowerCase() === 'client') return this.createClient({path});
        else if (role.toLowerCase() === 'server') return this.createServer({reducers, schema});
        else return null;

    }

    createClient({
                     path = ''
                 }) {

        const worker = new Worker(
            path, {
                type: 'module'
            });

        return ({
            role: 'client',
            dispatch(msg) {
                return new Promise((resolve, reject) => {
                    let token = (Math.random() * 1e17).toString(36) + '_' + (Date.now()).toString(36);
                    worker.postMessage({msg, token});
                    worker.addEventListener('message', ({data}) => {
                        if (data.token === token) {
                            resolve(data);
                        }
                    })
                })
            }
        })

    }

    createServer({
                     schema = {},
                     reducers = {},
                     lengthLog = 10,
                 }) {

        let state = schema;
        let log = [];

        return {
            role: 'server',
            messageHandler({data}) {
                const {msg = null, token = null} = data;
                const {type = null, payload = null, meta = null} = msg;
                return {result: this.reduce({type, payload, meta}), token};
            },
            getLog(){
                return log
            },
            reduce({
                       type = null,
                       payload = null,
                       meta = null
                   }) {

                // const localState = JSON.parse(JSON.stringify(state));
                let result = reducers[type]
                    ? reducers[type]({
                        state,
                        payload,
                        meta
                    })
                    : {
                        status: 'error',
                        error: 'Reducer not found'
                    }

                if (result.status !== 'error') {
                    log.push({type, payload, result});
                    while (log.length > lengthLog) log.shift();
                    state = result;
                    return state
                } else {
                    return result
                }
            }
        }
    }

}

export default Tresor;