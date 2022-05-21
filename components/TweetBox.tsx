import React, { useRef, useState } from 'react'
import {  useSession } from 'next-auth/react'
import axios from 'axios';

import {
  CollectionIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  SearchCircleIcon,
  PhotographIcon,
  CloudUploadIcon,
} from '@heroicons/react/outline'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props{
  setTweets:React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}:Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const [loading, setLoading] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  //const [imageAsset, setImageAsset] = useState(null);

  const imageInputRef = useRef<HTMLInputElement>(null)
  
  const {data:session}=useSession()
  const [imageurlboxopen, setimageurlboxopen] = useState<boolean>(false)

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{

    e.preventDefault();
    if(!imageInputRef.current?.value) return
    setImage(imageInputRef.current.value)
    imageInputRef.current.value ="";
    setimageurlboxopen(false)
  }

  const postTweet = async ()=>{

    const tweetinfo: TweetBody={
      test: input,
      username:session?.user?.name || "unknown user",
      profileImg:session?.user?.image || 'https://links.papareact.com/gll',
      image:image,
    }

    const result = await fetch(`/api/addTweet`,{
      body:JSON.stringify(tweetinfo),
      method:'POST'
    })

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets)

    toast('Tweet Post',{
      icon:'🚀'
    })

    return json

    
  }

  const handleSubmit =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault();

    postTweet();
    setInput('')
    setImage('')
    setimageurlboxopen(false)
  }

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const target = e.target as HTMLInputElement;

    const {type, name}: File =(target.files as FileList)[0];
    const myfilesSign: File =  (target.files as FileList)[0];
   

    if(type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type==='image/gif' || type === 'image/tiff'){
      setWrongImageType(false);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", myfilesSign);
      formData.append("upload_preset", "vy3cy6gu");

      axios.post("https://api.cloudinary.com/v1_1/fullupe/image/upload",formData).then((response)=>{
        setImage(response.data.url)
        console.log(response.data)
        setLoading(false)
      }).catch((error)=>{
        console.log(error)
      })

     

  }else{
      setWrongImageType(true);
  }

  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={session?.user?.image|| "https://links.papareact.com/gll"}
        alt=""
      />

      <div className="flex flex-1 items-center pt-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="what's Happening"
            className=" h-24 w-full text-xl outline-none placeholder:text-xl"
          />
              {wrongImageType && <p className="py-2 italic">Wrong Image Type</p>}
            {loading ? ( <p className="flex text-center animate-pulse my-2 text-green-900">Loading...</p>):(
                                      
            //  <div className="flex border-2 border-dotte flex-col items-center py-2 my-4 cursor-pointer">
                null
            //   <CloudUploadIcon className="w-5 h-5" />
            //   <p className="text-sm">Click to Upload</p>
            //   </div>

            )}

          {/* {imageurlboxopen && (
            <form className="mt-5 flex rounded-lg bg-twittercolor/80 py-2 px-4">
              <input ref={imageInputRef} className="flex-1 bg-transparent p-2 outline-none placeholder:text-white  " type="text" placeholder="Enter Image Url..."/>
              <button onClick={addImageToTweet} type="submit" className="font-bold text-white">Add Image</button>
            </form>
          )} */}



          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twittercolor">
              
              <label>
              <PhotographIcon onClick={()=>setimageurlboxopen(!imageurlboxopen)} className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <input onChange={uploadImage} className="w-0"  type="file"/>
              </label>
       
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon  className="h-5 w-5" />
              <CollectionIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button onClick={handleSubmit} disabled={!input || !session || loading} className="bg-twittercolor px-5 py-2 text-white font-bold rounded-full disabled:opacity-40">
              Tweet
            </button>
          </div> 


          {/* {imageurlboxopen && (
            <form className="mt-5 flex rounded-lg bg-twittercolor/80 py-2 px-4">
              <input ref={imageInputRef} className="flex-1 bg-transparent p-2 outline-none placeholder:text-white  " type="text" placeholder="Enter Image Url..."/>
              <button onClick={addImageToTweet} type="submit" className="font-bold text-white">Add Image</button>
            </form>
          )} */}



          {image && (
            <img className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg" alt="" src={image}/>
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
