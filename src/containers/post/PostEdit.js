import { connect } from 'react-redux';
import PostEdit from '../../components/post/PostEdit';
import { updatePost, deletePost } from '../../modules/post';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.post;
  const { title, description, uid, category, privateCheck, imageUrl, gameUrl } = props.post;

  return { loading, postError: error, initialValues: { title, description, category, privateCheck, uid, imageUrl, gameUrl } };
};

export default connect(mapStateToProps, { updatePost, deletePost })(PostEdit);
