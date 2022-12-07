import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { HiOutlineVideoCamera } from 'react-icons/hi'
import { IoMdPhotos } from 'react-icons/io'
import { BsEmojiSmile } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AppDispatch } from '../src/app/store'
import { useDispatch } from 'react-redux'
import { addPost, IPost } from '../src/features/post/postSlice'
import { PostBody } from '../tpyings'

export const CreatePost = () => {
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [imageToPost, setImageToPost] = useState<
    string | ArrayBuffer | null | undefined
  >(null)
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = () => {
    hiddenFileInput.current?.click()
  }

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (e) => {
        setImageToPost(e?.target?.result)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputRef.current?.value) return

    const postInfo: PostBody = {
      file: imageToPost as string,
      post: inputRef.current.value as string,
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      profilePic: session?.user?.image as string
    }

    const result = await fetch(
      'https://facebook-clone-service-production.up.railway.app/api/v1/post',
      {
        body: JSON.stringify(postInfo),
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST'
      }
    ).then(async (response) => {
      const json = await response.json()
      inputRef.current!.value = ''
      dispatch(addPost(json))
      removeImage()
    })
  }

  const removeImage = () => {
    setImageToPost(null)
  }
  return (
    <div className="bg-white rounded-md shadow-md text-gray-500 p-2">
      <div className="flex p-4 space-x-2 items-center">
        <img
          src={session?.user?.image as string}
          height={40}
          width={40}
          className="rounded-full cursor-pointer"
        />
        <form onSubmit={handleSubmit} className="flex flex-1">
          <input
            className="rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4"
            type="text"
            ref={inputRef}
            placeholder={`What's on your mind, ${session?.user?.name}?`}
          />
          <button type="submit" hidden></button>
        </form>
      </div>
      {imageToPost && (
        <div
          onClick={removeImage}
          className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer"
        >
          <img src={imageToPost as string} className="h-10 object-contain" />
          <RiDeleteBin6Line className="h-8 hover:text-red-500" />
        </div>
      )}
      <div className="flex justify-evenly py-2">
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <HiOutlineVideoCamera size={20} className="text-red-500" />
          <p className="font-semibold text-gray-600">Live Video</p>
        </div>
        <div
          onClick={handleClick}
          className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer"
        >
          <IoMdPhotos size={20} className="text-green-500" />
          <p className="font-semibold text-gray-600">Photo/Video</p>
          <input
            onChange={addImageToPost}
            type="file"
            ref={hiddenFileInput}
            hidden
            accept="image/*"
          />
        </div>
        <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
          <BsEmojiSmile size={20} className="text-yellow-500" />
          <p className="font-semibold text-gray-600">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}
