import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { json } from 'stream/consumers'
import { resourceLimits } from 'worker_threads'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [asd, setAsd] = useState("");
  const [resultPic, setResultPic] = useState("")
  const input = useRef<HTMLInputElement>(null);
  const getapod = async (randpic:boolean) =>{
    const response = await fetch(`/api/hello?date=${randpic ? "rand": input.current?.value}`);    
    const data = await response.json();
    const {result,error} = data;
    if(error!==undefined)
    {alert(`ERROR:${error}`);}
    setAsd(result.constructor === Array ? result[0].explanation : result.explanation);    
    setResultPic(result.constructor === Array ? result[0].url : result.url);
    console.log(result.constructor === Array ? result[0].url : result.url);
  }
  return (
    <div>
      <p>{asd}</p>
      <button onClick={()=>{getapod(true)}}>Get random picture</button>
      <input type="text" placeholder='YYYY-MM-DD' ref={input}/>
      <button onClick={()=>{getapod(false)}}>Get picture</button>
      <img src={resultPic} alt="" />
    </div>
  )
}

export default Home
