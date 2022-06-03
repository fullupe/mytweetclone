import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
//import Image from 'next/image'
import React from 'react'
import Feed from '../components/Feed'
import SideBar from '../components/SideBar'
import Widgets from '../components/Widgets'
import {Tweet} from "../typings"
import { fetchTweets } from '../utils/fetchTweets'
import  { Toaster } from 'react-hot-toast';

interface Props{
  tweets:Tweet[]
}

const Home = ({tweets}:Props) => {

  console.log(tweets)
  return (
    <div className=" mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
      <Head>
        <title>Twitter-clone-2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        <SideBar/>

        {/* Feed */}
        <Feed tweets={tweets} />
        {/* widgets */}
        <Widgets />

      </main>
    
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const tweets = await fetchTweets();

  return {
    props:{
      tweets,
    },
  }
}