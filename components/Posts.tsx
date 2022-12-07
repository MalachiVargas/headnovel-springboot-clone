import React, { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../src/app/store'
import { addAllPost, selectPosts } from '../src/features/post/postSlice'
import { Post } from './Post'

export const Posts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const posts = useTypedSelector(selectPosts)
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://facebook-clone-service-production.up.railway.app/api/v1/post',
        {
          headers: {
            'Content-type': 'application/json'
          },
          method: 'GET'
        }
      ).then(async (response) => {
        const json = await response.json()
        dispatch(addAllPost(json))
      })
    }
    fetchData()
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}
