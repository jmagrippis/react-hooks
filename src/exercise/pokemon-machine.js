import {Machine, assign} from 'xstate'

import {fetchPokemon} from '../pokemon'

export const FETCH = 'FETCH'

export const pokemonMachine = Machine({
  id: 'pokemon',
  initial: 'idle',
  context: {
    pokemon: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        [FETCH]: 'pending',
      },
    },
    pending: {
      onEntry: assign({
        pokemon: null,
        error: null,
      }),
      on: {
        [FETCH]: 'pending',
      },
      invoke: {
        id: 'fetch-pokemon',
        src: (_context, {data}) => fetchPokemon(data),
        onDone: {
          target: 'resolved',
          actions: assign({pokemon: (_context, event) => event.data}),
        },
        onError: {
          target: 'rejected',
          actions: assign({error: (_context, event) => event.data}),
        },
      },
    },
    resolved: {
      on: {
        [FETCH]: 'pending',
      },
    },
    rejected: {
      on: {
        [FETCH]: 'pending',
      },
    },
  },
})
