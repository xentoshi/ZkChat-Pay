import { ethers } from "ethers";
import BobABI from "./abi/Bob.json";
import DDABI from "./abi/DirectDeposit.json";

//TODO: provider type (web3provider is the old version)
export const connectBobContract = async () => {
  const contractABI = BobABI;
  let bobContract: ethers.Contract;
  try {
    const { ethereum } = window;
    if (!ethereum || ethereum.chainId !== "0x5") {
      throw new Error("Please connect to the Goerli network.");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    bobContract = new ethers.Contract(
      "0x97a4ab97028466FE67F18A6cd67559BAABE391b8",
      contractABI,
      signer
    ); // instantiating new connection to the contract
    return { bobContract, signer };
  } catch (error) {
    if(error.message.includes('Goerli')) throw error
    console.log("ERROR:", error);
    throw new Error("sorry something went wrong");
  }
};

export const connectDDContract = async () => {
  const contractABI = DDABI;
  let DDContract: ethers.Contract;
  try {
    const { ethereum } = window;
    if (!ethereum || ethereum.chainId !== "0x5") {
      throw new Error("Please connect to the Goerli network.");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    DDContract = new ethers.Contract(
      "0xE4C77B7787cC116A5E1549c5BB36DE07732100Bb",
      contractABI,
      signer
    ); // instantiating new connection to the contract
    return { DDContract, signer };
  } catch (error) {
    console.log("ERROR:", error);
    throw new Error("sorry something went wrong");
  }
};

export const HttpProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);
