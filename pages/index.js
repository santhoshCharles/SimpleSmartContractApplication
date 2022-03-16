import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { initWeb3, mintToken, getBalance } from "../Web3/init";

export default function Home() {
  const [minted, setMinted] = useState(false);
  useEffect(() => {
    initWeb3();
  }, []);

const setMintApp = () => {
  mintToken().then(res => {
    console.log(res);
  }).catch(err => console.log(err))
}

const fetchbalance = () => {
  getBalance().then(res => {
    console.log(res);
  }).catch(err => console.log(err))
}

  return <div className={styles.container}>

  {/* <button onClick={setMintApp} >Mint address</button> */}
  <button onClick={fetchbalance} >get balance</button>
  </div>;
}
