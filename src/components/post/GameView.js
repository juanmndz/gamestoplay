/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { ListView, View, WebView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Item, Container } from '../common';
import styles from './postStyle';

class GameView extends Component {
  constructor(props) {
    super(props);
}

componentWillMount() {
  Actions.refresh({title: this.props.post.title})
}


  render() {
    const { gameUrl } = this.props.post;
    return (
      <WebView
        source={{uri: gameUrl}}
        style={{flex: 1}} // OR style={{height: 100, width: 100}}
      />
    );
  }
}

export default GameView;
