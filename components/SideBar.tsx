import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SideBarRow from './SideBarRow'
import { signIn, signOut, useSession } from 'next-auth/react'

function SideBar() {
  const {data:session}=useSession()
  return <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img className="w-10 h-10 m-3" src="https://links.papareact.com/drq" alt=""/>
      <SideBarRow Icon={HomeIcon}title="Home"/>
      <SideBarRow Icon={HashtagIcon}title="Explore"/>
      <SideBarRow Icon={BellIcon}title="Notifications"/>
      <SideBarRow Icon={MailIcon}title="Messages"/>
      <SideBarRow Icon={BookmarkIcon}title="Bookmarks"/>
      <SideBarRow Icon={CollectionIcon}title="Lists"/>
      <SideBarRow onClick={session ? signOut : signIn} Icon={UserIcon}title={session ? "Sign out" : 'Sign In'}/>
      <SideBarRow  Icon={DotsCircleHorizontalIcon}title="More"/>
  </div>
}

export default SideBar
