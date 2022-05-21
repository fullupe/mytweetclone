import React,{ useEffect, useState } from 'react';
import {Comment, CommentBody, Tweet, TweetBody} from '../typings';
import TimeAgo from "react-timeago"
import {ChatAlt2Icon,HeartIcon,SwitchHorizontalIcon,UploadIcon} from "@heroicons/react/outline"
import { fetchComments } from '../utils/fetchComments';
import {  useSession } from 'next-auth/react'
import toast from 'react-hot-toast';


interface Props {
    tweet:Tweet
 }

function Tweet({tweet}:Props) {
  const {data:session}=useSession()
    const [comments, setComments] = useState<Comment[]>([])

    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')


    const refreshComments = async ()=>{
        const comments:Comment[]=await fetchComments(tweet._id)
        setComments(comments)

    }

    useEffect(() => {
    refreshComments()
    }, [])

    const postCommentTweet = async ()=>{
      

      const commentinfo: CommentBody={

        comment:input,
        tweetId:tweet._id,
        username:session?.user?.name || "unknown user",
        profileImg:session?.user?.image || 'https://links.papareact.com/gll',
  
      }
  
      const result = await fetch(`/api/addComment`,{
        body:JSON.stringify(commentinfo),
        method:'POST'
      })

      console.log("woooo", result)
  
      const json = await result.json();
  
       //const newTweets = await fetchComments();
       //setComments(newTweets)
  
      toast('Tweet Post',{
        icon:'🚀'
      })
  
      return json
  
      
    }

    const handlesubmit = (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      postCommentTweet()
      setInput("")
      setCommentBoxVisible(!commentBoxVisible)
      refreshComments()


    }

    // const handlesubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    //   e.preventDefault();
    //   //console.log("ok")
    //   postCommentTweet()
    //   setInput("")
    //   setCommentBoxVisible(!commentBoxVisible)
    //   refreshComments()

    // }

    


 //console.log(comments)
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5"> 
        <div className="flex space-x-3">
      <img className="h-10 rounded-full w-10 object-cover" src={tweet.profileImg}/>
        <div>
          <div className="flex items-center space-x-1">
              <p className="pr-1 font-bold">{tweet.username}</p>
             <p className="hidden texxt-sm text-gray-500 sm:inline"> @{tweet.username.replace(/\s+/g,'').toLowerCase()}.</p>

             <TimeAgo
             className="text-sm text-gray-500"
             date={tweet._createdAt}/>
          </div>
          <p className="">{tweet.test}</p>
          {tweet.image && <img src={tweet.image} alt="" className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-xl" />}

        </div>
      </div>


        <div className="flex justify-between mt-5">
          <div onClick={()=> session && setCommentBoxVisible(!commentBoxVisible)} className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon  className="h-5 w-5"/>
          <p>{comments.length}</p>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
              <SwitchHorizontalIcon className="h-5 w-5"/>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
              <HeartIcon className="h-5 w-5"/>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
              <UploadIcon className="h-5 w-5"/>
          </div>
       </div>

       {/* comment Box logic */}
       {commentBoxVisible && (
         <form  onSubmit={handlesubmit}   className="mt-3 flex space-x-3">
           <input value={input}  onChange={(e)=>setInput(e.target.value)} className="flex-1 rounded-lg bg-gray-100 p-2 outline-none" type="text" placeholder="write a comment...."/>
           <button type="submit" disabled={!input} className="text-twittercolor disabled:text-gray-200">Post</button>
         </form>
       )}

       {comments?.length > 0 && (

            <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                {comments.map((comment)=>(
                    <div key={comment._id} className=" relative flex space-x-2">
                        <hr className="absolute left-5 top-10 h-8 border-x border-twittercolor" />
                    <img src={comment.profileImg} className=" mt-2 h-7 w-7 rounded-full object-cover" alt=""/>
                    <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{comment.username}</p>
                        <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g,'').toLowerCase()}</p>
                        <TimeAgo
                        className="text-sm text-gray-500"
                        date={comment._createdAt}/>
                    </div>
                    <p>{comment.comment}</p>
                    </div>
                    
                    </div>
                ))}
            </div>
       )}

    </div>

  )
}

export default Tweet
