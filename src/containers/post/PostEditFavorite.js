import { connect } from 'react-redux';
import PostEditFavorite from '../../components/post/PostEditFavorite';
import { updatePostFavorite, deletePostFavorite } from '../../modules/post';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.post;
  const { title, description, uid } = props.post;

  return { loading, postError: error, initialValues: { title, uid } };
};

export default connect(mapStateToProps, { updatePostFavorite, deletePostFavorite })(PostEditFavorite);
