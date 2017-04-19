/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableOpacity, Text, Button, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Item, Container } from '../common';
import styles from './postStyle';

class PostView extends Component {
  constructor(props) {
    super(props);
}
componentWillMount() {
  Actions.refresh({title: this.props.post.title + ' Game Details'})
}

  render() {
    const { title, description, gameUrl, imageUrl } = this.props.post;
    const post = this.props.post;
    return (
      <ScrollView>
      <Container>
        { this.props.user &&
         (
           <Button
             onPress={() => { Actions.postAddFavoriteGame({ post }); }}
             title="Add Game To Favorite"
             color="#000080"
             accessibilityLabel="Add Game To Favorite"
           />
       )}

        <Item style={styles.listContainerStyle}>
          <Text style={styles.listTitleStyle}>Title: {title}</Text>
        </Item>
        <Item style={styles.listContainerStyle}>
          <Image
style={{flex: 1, width: 150, height: 150}}
source={{uri: imageUrl}}
resizeMode="contain"
 />
        </Item>

        <Item style={styles.listContainerStyle}>
          <Text style={styles.listTitleStyle}>Description: {description}</Text>

        </Item>
        <Button
          onPress={() => { Actions.gameView({ post }); }}
          title="Play The Game"
          color="#1e90ff"
          accessibilityLabel="Add Game To Favorite"
        />
      </Container>
    </ScrollView>
    );
  }
}

export default PostView;
