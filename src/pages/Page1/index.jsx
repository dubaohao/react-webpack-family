import React, {Component} from 'react';
import * as styles from './index.scss'

export default class Index extends React.Component {
  render() {
    return (
        <div>
          <div  className={ styles.title }>this is Page1~~</div>
          <div className='title'>this is Page2~~</div>
        </div>
    )
  }
}
