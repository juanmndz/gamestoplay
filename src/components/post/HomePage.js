/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner } from '../common';
import styles2 from './postStyles2';

const propTypes = {
  getCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class HomePage extends Component {
  componentWillMount() {
    this.props.getCategory();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ category }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(category);
  }

  renderRow(post) {
    const { title } = post;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.postListPublic({ post }); }}
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
    textAlign: 'right',
    backgroundColor: '#1e90ff',

  },
});


HomePage.propTypes = propTypes;

export default HomePage;
