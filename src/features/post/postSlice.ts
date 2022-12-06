import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export type IPost = {
  id: string
  post: string
  name: string
  email: string
  image: string
  profilePic: string
  timeStamp: string
  file: string
}
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialState = {
  value: IPost[]
}

const initialState: InitialState = {
  value: [] as IPost[]
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      state.value.unshift(action.payload)
    },
    addAllPost: (state, action) => {
      state.value.push(...action.payload)
    }
  }
})

export const { addPost, addAllPost } = postSlice.actions
export const selectPosts = (state: RootState) => state.posts.value
export default postSlice.reducer
