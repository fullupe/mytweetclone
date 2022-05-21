import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import TweetComponet from './Tweet'
import TweetBox from './TweetBox'

interface Props { 
  tweets:Tweet[]
}

function Feed({tweets:tweetProp}:Props) {
  const [tweets, setTweets] = useState(tweetProp)

  const handleReflesh = async()=>{

    const refreshtoast = toast.loading('Refreshing...')

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('feed Updated!',{
      id:refreshtoast,
    })
    
  }

  console.log(tweets)
  return (
    <div className="col-span-7 lg:col-span-5 border-2 max-h-screen overflow-y-scroll scrollbar-hide">
        <div className="flex  items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon onClick={handleReflesh} className="w-8 h-8 mt-5 mr-5 cursor-pointer text-twittercolor transition-all duration-500 ease-out hover:rotate-180 active:scale-125"/>
        </div>

        <div>
        <TweetBox setTweets={setTweets}/>
        </div>

          {/* Feed */}
        <div>
      {tweets.map((tweet)=>(
        <TweetComponet key={tweet._id} tweet={tweet}/>
      ))}
        </div>
    </div>
  )
}

export default Feed