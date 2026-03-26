'use strict';

import Tresor from './classes/Tresor.js'

const tresor = new Tresor({
    role: 'client',
    path: 'assets/js/workers/vault.js'
})

const init = async () => {
    await tresor.dispatch({
        type: 'set',
        payload: {counter: 42}
    })

    await tresor.dispatch({
        type: 'increment'
    })
    await tresor.dispatch({
        type: 'increment'
    })
    await tresor.dispatch({
        type: 'increment'
    })
    await tresor.dispatch({
        type: 'decrement'
    })

    let state = await tresor.dispatch({
        type: 'get'
    })


    console.log('currentState', state);
}

init();
