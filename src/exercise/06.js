// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect} from 'react'
import {useMachine} from '@xstate/react'
import {ErrorBoundary} from 'react-error-boundary'

import {PokemonForm, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {FETCH, pokemonMachine} from './pokemon-machine'
import {ErrorFallback} from './error-fallback'

function PokemonInfo({pokemonName}) {
  const [state, send] = useMachine(pokemonMachine)
  const {pokemon, error} = state.context

  useEffect(() => {
    if (!pokemonName) return
    send(FETCH, {data: pokemonName})
  }, [send, pokemonName])

  if (state.matches('rejected')) throw error
  if (state.matches('idle')) return 'Submit a pokemon'
  if (state.matches('pending'))
    return <PokemonInfoFallback name={pokemonName} />
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
