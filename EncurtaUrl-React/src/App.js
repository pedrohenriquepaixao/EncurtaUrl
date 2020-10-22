import React, { Component } from 'react';
import Form from './components/input/Form';
import Table from './components/table/Table'

export default class App extends Component {
  handleChangeValue = (event) =>{
    console.log(event.target.value)
  }

  render() {
    return (
      <>
        <div className="container">
          <h2 style={{ textAlign:'center' }}>Encurtador de links</h2>
          <Form onChange={this.handleChangeValue}/>
          <Table/>
        </div>

      </>
    );

  }
}

