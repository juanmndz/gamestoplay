import { connect } from 'react-redux';
import PostView from '../../components/post/PostView';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;

  return { loading, postError: error };
};

export default connect(mapStateToProps)(PostView);
