import styles from "../styles/Home.module.css";
import { getPermit, FhenixClient } from "fhenixjs";
// use BrowserProvider if you need a signer
import { JsonRpcProvider, BrowserProvider } from "ethers";

import { useEffect, useState } from "react";

export default function Home() {

  const [permit, setPermit] = useState(null);
  const [provider, setProvider] = useState(null);
  const [encrypted, setEncrypted] = useState(null);

  useEffect(() => {
    setProvider(new BrowserProvider(window.ethereum))
  }, []);

  const getPermitHandle = async () => {
    const contractAddress = "0xF36B59Ce442871dCAe1DD191916622aaCf69A3cE";

    if (!provider) {
      return;
    }

    const permit = await getPermit(contractAddress, provider);

    setPermit(permit);
  };

  const encryptTest = async () => {
    const resp = new FhenixClient({provider});

    let x = await resp.encrypt_uint8(3);

    setEncrypted(`0x${buf2hex(x.data).slice(0, 32)}...`);
  }


  function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
  }

  function shortAddress(address) {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  }

  console.log(permit);

  return (
    <div className={styles.container}>
      <button className={"getencrypt"} onClick={encryptTest} id="getencrypt">Encrypt</button>
      {encrypted && <div className={"encrypted"}>{encrypted}</div>}
      <button onClick={getPermitHandle} id={"getpermit"}>Get Permit </button>
      {permit && <div id={"permit"}> Contract Address {shortAddress(permit.contractAddress)}</div>}
      {permit && <div id={"permit"}> Public Key {shortAddress(permit.publicKey)}</div>}
      {permit && <div id={"permit"}> Signature {shortAddress(permit.signature)}</div>}

    </div>
  );
}
