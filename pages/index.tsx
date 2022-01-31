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
  const getapod = async () =>{
    const response = await fetch(`/api/hello?date=${input.current?.value}`);    
    const data = await response.json();
    console.log(data);
    const {result,error} = data;
    if(error!==undefined)
    {alert(`ERROR:${error}`);}
    setAsd(JSON.stringify(result));
    //setResultPic(result[0].url)    
    alert(resultPic);
  }
  return (
    <div>
      <p>{asd}</p>
      <button onClick={getapod}>Get random picture</button>
      <input type="text" placeholder='YYYY-MM-DD' ref={input}/>
      <button onClick={getapod}>Get picture</button>
      <img src={resultPic} alt="" />
    </div>
  )
}

export default Home
