import _ from 'lodash';
import { connect } from 'react-redux';
import PostList2 from '../../components/post/PostList2';
import { getPostListAllPrivate } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const favPost = _.map(post.favPost, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, favPost };
};

export default connect(mapStateToProps, { getPostListAllPrivate })(PostList2);
