import styles from "../styles/Home.module.css";
import { getPermit } from "fhenixjs";
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider("https://api.helium.fhenix.zone");

export default function Home() {
  const getPermitHandle = async () => {
    const contractAddress = "0xF36B59Ce442871dCAe1DD191916622aaCf69A3cE";
    const permit = await getPermit(contractAddress, provider);

    console.log(permit);
  };

  return (
    <div className={styles.container}>
      <button onClick={getPermitHandle}>Get Permit</button>
      {permit && <div>{permit}</div>}
    </div>
  );
}
