'use strict';

import Tresor from './classes/Tresor.js'

const tresor = new Tresor({
    role: 'client',
    path: 'assets/js/workers/vault.js'
})

const init = async () => {
    let state = await tresor.dispatch({
        type: 'get'
    })

    console.log('currentState', state);
}

init();
