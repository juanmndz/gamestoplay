import _ from 'lodash';
import { connect } from 'react-redux';
import HomePage from '../../components/post/HomePage';
import { getCategory } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const category = _.map(post.category, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, category };
};

export default connect(mapStateToProps, { getCategory })(HomePage);
