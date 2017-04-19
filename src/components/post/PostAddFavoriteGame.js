import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  addFavoritePost: PropTypes.func.isRequired,
};
class PostAddFavoriteGame extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { title, description, category, privateCheck, imageUrl, gameUrl } = props;

    this.props.addFavoritePost({ title, description, category, privateCheck, imageUrl, gameUrl });
  }


  render() {
    const { handleSubmit } = this.props;

    return (
      <ScrollView>
      <Container>
        <Item>
          <Text>Images and Game Url: Must Start with http://{"\n"}Public Option: Yes for all to view. No just for you to view
          {"\n"}Category: Add categories by sepearate each by comma e.g. (bob, bill)
        </Text>
        </Item>
        <Item>
          <Text>Title:</Text>
          <Field
            name="title"
            placeholder="Title"
            component={Input}
          />
        </Item>

        <Item>
          <Text>Description:</Text>
          <Field
            name="description"
            placeholder="Description"
            component={Input}
            multiline
            containerStyle={{ height: 70 }}
          />
        </Item>

        <Item>
          <Text>Category:</Text>
          <Field
            name="category"
            placeholder="Category? Add by a comma e.g. bill, bob"
            component={Input}
          />
        </Item>

        <Item>
          <Text>Public:</Text>
          <Field
            name="privateCheck"
            placeholder="Public Available? Yes or No"
            component={Input}
          />
        </Item>
        <Item>
          <Text>Image Url:</Text>
          <Field
            name="imageUrl"
            placeholder="Must Start with http:// to an image"
            component={Input}
          />
        </Item>
        <Item>
          <Text>Game Url:</Text>
          <Field
            name="gameUrl"
            placeholder="Must Start with http:// to a website"
            component={Input}
          />
        </Item>

        {this.props.postError
          ?
            <Text style={styles.error}>
              {this.props.postError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Create</Button>
            </Item>}
      </Container>
    </ScrollView>
  );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['title', 'description'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.title && props.title.length < 4) {
    errors.title = 'Minimum of 4 characters';
  } else if (props.title && props.title.length > 20) {
    errors.title = 'Maximum of 20 characters';
  }

  if (props.description && props.description.length < 4) {
    errors.description = 'Minimum of 4 characters';
  } else if (props.description && props.description.length > 100) {
    errors.description = 'Maximum of 100 characters';
  }

  return errors;
};

PostAddFavoriteGame.propTypes = propTypes;
PostAddFavoriteGame = reduxForm({ form: 'postcreate', validate })(PostAddFavoriteGame);

export default PostAddFavoriteGame;
