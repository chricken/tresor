'use strict';

import Tresor from './classes/Tresor.js'
import dom from './dom.js';

const tresor = new Tresor({
    role: 'client',
    path: 'assets/js/workers/vault.js'
})

const elements = {
    showCount: document.querySelector('#showCount'),
    btnIncrement: document.querySelector('#btnIncrement'),
    btnDecrement: document.querySelector('#btnDecrement'),
    users: document.querySelector('#users'),
    inpUsername: document.querySelector('#inpUsername'),
    inpEmail: document.querySelector('#inpEmail'),
    btnAddUser: document.querySelector('#btnAddUser'),
}

elements.btnIncrement.addEventListener('click', async () => {
    await tresor.dispatch({
        type: 'increment'
    })
    render()
})
elements.btnDecrement.addEventListener('click', async () => {
    await tresor.dispatch({
        type: 'decrement'
    })
    render()
})
elements.btnAddUser.addEventListener('click', async () => {
    await tresor.dispatch({
        type:'addUser',
        payload:{
            id: (Math.random()*1e17).toString(36),
            username: elements.inpUsername.value,
            email: elements.inpEmail.value,
        }
    })
    render();
})

const render = async () => {
    let {state} = await tresor.dispatch({
        type: 'get'
    })
    console.log(state);

    elements.showCount.innerHTML = state.counter;

    elements.users.innerHTML = '';
    console.log(state);

    state.users.forEach(user => {
        const elUser = dom.create({
            cssClassName: 'user',
            parent: elements.users,
            content: user.username
        })

        dom.create({
            parent: elUser,
            content: user.email,
            cssClassName: 'email'
        })
    })

}


const init = async () => {


    render();
}

init();
