import React, { Component } from 'react'
import loading from './Spin@1x-1.0s-200px-200px.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}
