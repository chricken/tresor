'use strict';

class Tresor {
    constructor({
                    role = 'client',  // Alternativ: "server
                    path = null, // Pfad zum Worker vom HTML aus gesehen
                    reducers = {},
                    schema = {},
                    // state = null,   // Der State, der im Tresor verwaltet werden soll
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
                console.log('Class', msg);
                return new Promise((resolve, reject) => {
                    let token = (Math.random()*1e17).toString(36) + '_' + (Date.now()).toString(36);
                    worker.postMessage({msg, token});
                    worker.addEventListener('message', ({data}) => {
                        if(data.token === token) {
                            resolve(data);
                        }
                    })
                })
            }
        })

    }

    createServer({
                     schema = {},
                     reducers = {}
                 }) {

        let state = schema;

        return {
            role: 'server',
            reduce({
                       type = null,
                       payload = null,
                       meta = null
                   }) {


                return reducers[type]
                    ? reducers[type]({
                        state: JSON.parse(JSON.stringify(state)),
                        payload,
                        meta
                    })
                    : {
                        status: 'error',
                        error: 'Reducer not found'
                    }
            }
        }
    }

}

export default Tresor;