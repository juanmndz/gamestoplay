/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles2 from './postStyles2';

const propTypes = {
  getPostListAllPrivate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class PostList2 extends Component {
  componentWillMount() {
    this.props.getPostListAllPrivate(this.props.post.title);
      Actions.refresh({title: this.props.post.title + ' Games'})

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ favPost }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(favPost);
  }

  renderRow(post) {
    const { title } = post;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.postView({ post }); }}
        >
          <View style={styles2.row}>
            <Image
  style={{flex: 1, width: 100, height: 100}}
  source={{uri: post.imageUrl}}>
              <Text style={styles.titleText}>{title}</Text>
          </Image>
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


PostList2.propTypes = propTypes;

export default PostList2;
