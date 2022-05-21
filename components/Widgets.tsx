import { SearchIcon } from '@heroicons/react/outline'
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Widgets() {

  let screenName = ["williamfullupe","sonnysangha"]
  let randomScreennName= Math.floor(Math.random()*screenName.length)

  return (
      <div className="px-2 mt-2 col-span-2 hidden lg:inline">
    <div className="flex space-x-2 bg-gray-100 rounded-full p-3 mt-2">
        <SearchIcon className="h-5 w-5 text-gray-300"/>
        <input type="text" placeholder="Search" className="bg-transparent flex-1 outline-none "/>
    </div>

    <TwitterTimelineEmbed
  sourceType="profile"
  // screenName="sonnysangha"
  screenName={screenName[randomScreennName]}
  options={{height: 400}}
/>
      </div>
  )
}

export default Widgets