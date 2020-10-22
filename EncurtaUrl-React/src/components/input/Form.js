import React, { Component } from 'react'

export default class Form extends Component {
  render() {
    return (
      <>
        <div className="row">
            <div className="col s12 m10 l10"><span className="flow-text"><input onChange={this.props.onChange} id='addr' name="addr" type='text' /> </span></div>
            <div className="col s12 m2 l2"><span className="flow-text"><button className='waves-effect waves-light btn' type='submit'>ENCURTAR</button></span></div>
        </div>
      </>
    )
  }
}
