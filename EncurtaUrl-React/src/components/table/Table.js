import React, { Component } from 'react'
import axios from 'axios';

export default class componentName extends Component {


 
  render() {
    return (
      <>
        <table>
            <thead>
              <tr>
                <th>URL Orginal</th>
                <th>URL Encurtada</th>
                <th>Clicks na URL</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><a target="_blank" rel="noopener" href='#'></a></td>
                <td><a target="_blank" rel="noopener" href='#'></a></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </>
    )
  }
}
