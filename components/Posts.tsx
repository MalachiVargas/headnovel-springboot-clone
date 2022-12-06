import React, { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../src/app/store'
import { addAllPost, selectPosts } from '../src/features/post/postSlice'
import { Post } from './Post'

export const Posts = () => {
  const dispatch = useDispatch<AppDispatch>()
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const posts = useTypedSelector(selectPosts)
  const FB_SERVICES =
    'http://springbootfacebookclone-env.eba-kp8uedjt.us-east-1.elasticbeanstalk.com'
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'http://springbootfacebookclone-env.eba-kp8uedjt.us-east-1.elasticbeanstalk.com/api/v1/post',
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
