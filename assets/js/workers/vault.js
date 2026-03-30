'use strict';

import Tresor from '../classes/Tresor.js'


const tresor = new Tresor({
    role: 'server',

    schema: {
        counter: 0,
        users:[{
            id:(Math.random()*1e17).toString(36),
            username: 'maxmuster',
            email: 'max@muster.com'
        },{
            id:(Math.random()*1e17).toString(36),
            username: 'erika',
            email: 'erika@example.com'
        }]
    },

    reducers: {
        get({state}) {
            return state;
        },
        set({state, payload}) {
            return payload;
        },
        increment({state}) {
            return {...state, counter: state.counter + 1}
        },
        decrement({state}) {
            return {...state, counter: state.counter - 1}
        },
        addUser({state, payload}){
            if(!payload.id)payload.id = tresor.createID();
            return {...state, users: [...state.users, payload]}
        }
    }
});


self.addEventListener('message', (evt) => {
    console.log(tresor.getLog());

    self.postMessage(tresor.messageHandler(evt));

})

/*
self.addEventListener('message', ({data}) => {

    const {msg = null, token = null} = data;
    const {type = null, payload = null, meta = null} = msg;

    let result = tresor.reduce({type, payload, meta});
    // console.log(result);
    self.postMessage({result, token});

})
*/

self.postMessage('ready');
