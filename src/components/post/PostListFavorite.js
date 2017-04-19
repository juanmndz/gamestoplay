/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text, Button, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles2 from './postStyles2';
const propTypes = {
  getPostListFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class PostListFavorite extends Component {
  componentWillMount() {
    this.props.getPostListFavorite();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ fav }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(fav);
  }

  renderRow(post) {
    const { title } = post;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.postList2({ post }); }}
      >
        <View style={styles2.row}>
            <Text style={styles.titleText}>{title}</Text>

        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={() => { Actions.postEditFavoriteList() }}
          title="Edit Favorite Categories"
          color="#841584"
          accessibilityLabel="Click To Edit your Fav Categories"
        />

        {this.props.loading
          ?
            <Spinner />
          :
            <ListView
              enableEmptySections
              contentContainerStyle={styles2.listContent}
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#1e90ff',

  },
});

PostListFavorite.propTypes = propTypes;

export default PostListFavorite;
