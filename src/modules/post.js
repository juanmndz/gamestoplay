import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

/**
 |--------------------------------------------------
 | Types
 |--------------------------------------------------
 */
export const POST_CREATE_REQUEST = 'EMPLOYEE_CREATE_REQUEST';
export const POST_CREATE_SUCCESS = 'EMPLOYEE_CREATE_SUCCESS';
export const POST_CREATE_FAILURE = 'EMPLOYEE_CREATE_FAILURE';
export const POST_UPDATE_REQUEST = 'POST_UPDATE_REQUEST';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_UPDATE_FAILURE = 'POST_UPDATE_FAILURE';
export const POST_DELETE_REQUEST = 'POST_DELETE_REQUEST';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_DELETE_FAILURE = 'POST_DELETE_FAILURE';
export const POST_LIST_GET_REQUEST = 'POST_LIST_GET_REQUEST';
export const POST_LIST_GET_SUCCESS = 'POST_LIST_GET_SUCCESS';
export const POST_LIST_GET_FAILURE = 'POST_LIST_GET_FAILURE';
export const POST_LIST_GET_REQUEST_PRIVATE = 'POST_LIST_GET_REQUEST_PRIVATE';
export const POST_LIST_GET_SUCCESS_PRIVATE = 'POST_LIST_GET_SUCCESS_PRIVATE';
export const POST_LIST_GET_FAILURE_PRIVATE = 'POST_LIST_GET_FAILURE_PRIVATE';
export const POST_LIST_GET_REQUEST_PRIVATE_POST = 'POST_LIST_GET_REQUEST_PRIVATE_POST';
export const POST_LIST_GET_SUCCESS_PRIVATE_POST = 'POST_LIST_GET_SUCCESS_PRIVATE_POST';
export const POST_LIST_GET_FAILURE_PRIVATE_POST = 'POST_LIST_GET_FAILURE_PRIVATE_POST';
export const POST_LIST_GET_CATEGORY_REQUEST = 'POST_LIST_GET_CATEGORY_REQUEST';
export const POST_LIST_GET_CATEGORY_SUCCESS = 'POST_LIST_GET_CATEGORY_SUCCESS';
export const POST_LIST_GET_CATEGORY_FAILURE = 'POST_LIST_GET_CATEGORY_FAILURE';

/**
 |--------------------------------------------------
 | Actions
 |--------------------------------------------------
 */
export const createPost = ({ title, description, category, privateCheck, uid, imageUrl, gameUrl }) => {
  const categoryList = {}
  imageUrl ? null : imageUrl = 'None'
  category ? null : category = 'all'
  privateCheck ? null : privateCheck = 'No'
  gameUrl ? null : gameUrl = 'None'
  const categorySplit = category.toLowerCase().split(",").map((item)=>item.trim());
  categorySplit.map((item) => categoryList[item] = true);
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch({ type: POST_CREATE_REQUEST });
    const newGamesKey = firebase.database().ref().child('games').push().key;

    const updates = {};
    if (privateCheck.charAt(0).toLowerCase() === 'y') {
    updates['/games/' + newGamesKey] = {
      title, description, category, categoryList, privateCheck, imageUrl, gameUrl,
    };
  }
    updates['/users/' + currentUser.uid + '/post/' + newGamesKey] = {
      title, description, category, categoryList, privateCheck, imageUrl, gameUrl,
    };
    firebase.database().ref().update(updates)
      .then(() => {
        dispatch({ type: POST_CREATE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_CREATE_FAILURE, payload: 'Post creation failed' });
      });
  };
};

export const createPostFavorite = ({ title }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/category`)
      .push({ title })
      .then(() => {
        dispatch({ type: POST_CREATE_SUCCESS });

        Actions.PostListFavorite({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_CREATE_FAILURE, payload: 'Post creation failed' });
      });
  };
};
export const addFavoritePost = ({ title, description, category, privateCheck, imageUrl, gameUrl }) => {
  const { currentUser } = firebase.auth();
  imageUrl ? null : imageUrl = 'None'
  category ? null : category = 'all'
  gameUrl ? null : gameUrl = 'None'
  privateCheck = 'No';

  const categoryList = {}
  const categorySplit = category.toLowerCase().split(",").map((item)=>item.trim());
  categorySplit.map((item) => categoryList[item] = true);

  return (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post`)
      .push({ title, description, category, categoryList, privateCheck, imageUrl, gameUrl })
      .then(() => {
        dispatch({ type: POST_CREATE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_CREATE_FAILURE, payload: 'Post creation failed' });
      });
  };
};

export const updatePost = ({ title, description, category, uid, privateCheck, imageUrl, gameUrl }) => {
  const categoryList = {}
  imageUrl ? null : imageUrl = 'None'
  category ? null : category = 'all'
  gameUrl ? null : gameUrl = 'None'
  privateCheck ? null : privateCheck = 'No'

  const categorySplit = category.toLowerCase().split(",").map((item)=>item.trim());
  categorySplit.map((item) => categoryList[item] = true);
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: POST_UPDATE_REQUEST });

    const updates = {};
    if (privateCheck.charAt(0).toLowerCase() === 'y') {
    updates['/games/' + uid] = {
      title, description, category, categoryList, privateCheck, imageUrl, gameUrl,
    };
  } else if (firebase.database().ref("games").once("value")
  .then(function(snapshot) { return snapshot.child(uid).exists() }))
  {
    firebase.database().ref(`/games/${uid}`).remove()

  }
    updates['/users/' + currentUser.uid + '/post/' + uid] = {
      title, description, category, categoryList, privateCheck, imageUrl, gameUrl,
    };
    firebase.database().ref().update(updates)
      .then(() => {
        dispatch({ type: POST_UPDATE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_UPDATE_FAILURE, payload: 'Post edition failed' });
      });
  };
};

export const deletePost = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_DELETE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post/${uid}`)
      .remove()
      firebase.database().ref(`/games/${uid}`).remove()
      .then(() => {
        dispatch({ type: POST_DELETE_SUCCESS });

        Actions.postList({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_DELETE_FAILURE, payload: 'Post deletion failed' });
      });
  };
};

export const updatePostFavorite = ({ title, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_UPDATE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/category/${uid}`)
      .set({ title, description })
      .then(() => {
        dispatch({ type: POST_UPDATE_SUCCESS });

        Actions.postListFavorite({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_UPDATE_FAILURE, payload: 'Post edition failed' });
      });
  };
};

export const deletePostFavorite = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_DELETE_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/category/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: POST_DELETE_SUCCESS });

        Actions.postListFavorite({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: POST_DELETE_FAILURE, payload: 'Post deletion failed' });
      });
  };
};

export const getPostList = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST });

    firebase.database().ref(`/users/${currentUser.uid}/post`)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};
export const getPostListPublic = () => {

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST });

    firebase.database().ref(`games`).orderByChild("categoryList/" + "featured").equalTo(true)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const getPostListAll = (search) => {

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST });

    firebase.database().ref(`games`).orderByChild("categoryList/" + search).equalTo(true)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS, payload: snapshot.val() });
      });
  };
};
export const getPostListAllPrivate = (search) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST_PRIVATE_POST });

    firebase.database().ref(`users/${currentUser.uid}/post`).orderByChild("categoryList/" + search).equalTo(true)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS_PRIVATE_POST, payload: snapshot.val() });
      });
  };
};

export const getPostListFavorite = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_REQUEST_PRIVATE });

    firebase.database().ref(`/users/${currentUser.uid}/category`)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_SUCCESS_PRIVATE, payload: snapshot.val() });
      });
  };
};
export const getCategory = () => {

  return (dispatch) => {
    dispatch({ type: POST_LIST_GET_CATEGORY_REQUEST });

    firebase.database().ref(`/category/`)
      .on('value', (snapshot) => {
        dispatch({ type: POST_LIST_GET_CATEGORY_SUCCESS, payload: snapshot.val() });
      });
  };
};

/**
 |--------------------------------------------------
 | Reducer
 |--------------------------------------------------
 */
const INITIAL_STATE = {
  list: [],
  error: '',
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { ...state, loading: true };
    case POST_CREATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case POST_UPDATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_DELETE_REQUEST:
      return { ...state, loading: true };
    case POST_DELETE_SUCCESS:
      return { ...state, error: '', loading: false };
    case POST_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_GET_REQUEST:
      return { ...state, loading: true };
    case POST_LIST_GET_SUCCESS:
      return { ...state, ...INITIAL_STATE, list: action.payload };
    case POST_LIST_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_GET_REQUEST_PRIVATE:
      return { ...state, loading: true };
    case POST_LIST_GET_SUCCESS_PRIVATE:
      return { ...state, ...INITIAL_STATE, fav: action.payload };
    case POST_LIST_GET_FAILURE_PRIVATE:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_GET_REQUEST_PRIVATE_POST:
      return { ...state, loading: true };
    case POST_LIST_GET_SUCCESS_PRIVATE_POST:
      return { ...state, ...INITIAL_STATE, favPost: action.payload };
    case POST_LIST_GET_FAILURE_PRIVATE_POST:
      return { ...state, loading: false, error: action.payload };
    case POST_LIST_GET_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case POST_LIST_GET_CATEGORY_SUCCESS:
      return { ...state, ...INITIAL_STATE, category: action.payload };
    case POST_LIST_GET_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
