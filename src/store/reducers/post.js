import { ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_FAVS } from '../types'

const initState = {
  posts: [],
  favs: [],
  loading: true
}

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
        favs: action.payload.filter((post) => post.fav),
        loading: false
      }
    case TOGGLE_FAVS:
      const posts = state.posts.map((post) => {
        if (post.id === action.payload) {
          post.fav = !post.fav
        }

        return post
      })
      return { ...state, posts, favs: posts.filter((post) => post.fav) }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        favs: state.favs.filter((post) => post.id !== action.payload)
      }
    case ADD_POST:
      return {
        ...state,
        posts: [{ ...action.payload }, ...state.posts]
      }
    default:
      return state
  }
}
