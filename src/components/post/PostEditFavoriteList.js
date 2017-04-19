/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles from './postStyle';
import styles2 from './postStyles2';
const propTypes = {
  getPostListFavorite: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class PostEditFavoriteList extends Component {
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
        onPress={() => { Actions.postEditFavorite({ post }); }}
      >
        <View style={styles2.row}>
          <Item>
            <Text>{title}</Text>
          </Item>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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

PostEditFavoriteList.propTypes = propTypes;

export default PostEditFavoriteList;
