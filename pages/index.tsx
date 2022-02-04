import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { json } from 'stream/consumers'
import { resourceLimits } from 'worker_threads'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [about, setAbout] = useState("");
  const [resultPic, setResultPic] = useState("")
  const input = useRef<HTMLInputElement>(null);
  const [spin, setSpin] = useState(false)
  const getapod = async (randpic:boolean) =>{
    setSpin(true)
    const response = await fetch(`/api/hello?date=${randpic ? "rand": input.current?.value}`);    
    const data = await response.json();    
    const {result,error} = data;
    if(error!==undefined)
    {alert(`ERROR:${error}`);}
    setAbout(result.constructor === Array ? result[0].explanation : result.explanation);    
    setResultPic(result.constructor === Array ? result[0].url : result.url);
    setSpin(false);
  }
  return (
    <div>
      <p className='text-center font-bold text-3xl m-2 text-zinc-200'>NASA Astronomy Picture of the Day API</p>
      <div className='flex text-center justify-center'>
        <button onClick={()=>{getapod(true)}} className='button'>Get random picture</button>
        <input type="text" placeholder='YYYY-MM-DD' ref={input} className='input'/>
        <button onClick={()=>{getapod(false)}} className='button'>Get picture</button>
      </div>      
      <div className={spin ? 'flex justify-center items-center' : 'hidden'}>
        <div className='animate-spin w-8 h-8 border-4 rounded-xl text-black m-2'></div>
        <span className='text-zinc-200'>Loading...</span>
      </div>
      <div className='flex justify-center text-center m-2'><img src={resultPic} className='border-2 border-zinc-200' /></div>
      <div className='flex justify-center text-center m-2'><p className='w-2/3 text-lg text-zinc-200'>{about}</p></div>      
    </div>
  )
}

export default Home
