import React, {Component} from 'react'

import {ErrorFallback} from './error-fallback'

export class ErrorBoundary extends Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    const {error} = this.state
    if (error) {
      return <ErrorFallback error={error} />
    }

    return this.props.children
  }
}
