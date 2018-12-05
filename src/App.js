import React, { Component } from 'react';
import './App.scss';
import Tabs from './demo/tabs/index'
import Upload from './demo/qiniuUpload/index'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Upload/>
      </div>
    );
  }
}

export default App;
