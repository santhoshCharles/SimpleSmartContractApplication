import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import {
  mintToken,
  getBalance,
  getName,
  sendUnits,
  sendFromUnits,
  setUnits,
  getUnits,
} from "../Web3/ConnectWithSmartContract";
import { loadWeb3 } from "../Web3/web3Function";

export default function Home() {
  const [minted, setMinted] = useState(false);
  useEffect(() => {
    loadWeb3();
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [unit, setUnit] = useState("");

  const setMintApp = () => {
    mintToken()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchbalance = () => {
    getBalance()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchName = () => {
    getName()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const sendUnit = () => {
    sendFromUnits(to, unit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const sendUnits = () => {
    setUnits(parseInt(unit))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchUnits = () => {
    getUnits()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <button onClick={fetchbalance}>get balance</button>
      <button onClick={fetchName}>get Name</button>
      <div>
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From account"
        ></input>
      </div>
      <div>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To account"
        ></input>
      </div>
      <div>
        <input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit"
        ></input>
      </div>
      <button onClick={sendUnit}>Send Unit</button>
      <div>
        <button onClick={sendUnits}>Set units</button>
        <button onClick={fetchUnits}>Get units</button>
      </div>
    </div>
  );
}
