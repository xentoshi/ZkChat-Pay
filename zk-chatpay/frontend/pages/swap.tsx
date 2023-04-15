import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import {FusionSDK, NetworkEnum, getOrderHash} from '@1inch/fusion-sdk';
import Web3 from 'web3';

const makerPrivateKey = '0x123....'
const makerAddress = '0x123....'

const nodeUrl = '....'

// const blockchainProvider = new PrivateKeyProviderConnector(
//     makerPrivateKey,
//     new Web3(nodeUrl)
// )

const sdk = new FusionSDK({
    url: 'https://fusion.1inch.io',
    network: NetworkEnum.ETHEREUM
})

async function getOrder(){
    const orders = await sdk.getActiveOrders({page: 1, limit: 2})
    console.log(orders,'r');
}
getOrder();

export default function Home() {
  const [fromTokenAddress, setFromTokenAddress] = useState('')
  const [toTokenAddress, setToTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    if (fromTokenAddress && toTokenAddress && amount && walletAddress) {
      sdk.placeOrder({
        fromTokenAddress,
        toTokenAddress,
        amount,
        walletAddress
      }).then(res => setResult(JSON.stringify(res)))
    }
  }, [fromTokenAddress, toTokenAddress, amount, walletAddress])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="flex flex-col items-center gap-y-[24px] grow font-normal">
        <form onSubmit={handleSubmit}>
        <FormControl id="fromTokenAddress" isRequired>
            <FormLabel>From Token Address</FormLabel>
            <Input type="text" value={fromTokenAddress} onChange={event => setFromTokenAddress(event.target.value)} className='text-black' />
        </FormControl>

        <FormControl id="toTokenAddress" isRequired>
            <FormLabel>To Token Address</FormLabel>
            <Input type="text" value={toTokenAddress} onChange={event => setToTokenAddress(event.target.value)}  className='text-black'/>
        </FormControl>

        <FormControl id="amount" isRequired>
            <FormLabel>Amount</FormLabel>
            <Input type="text" value={amount} onChange={event => setAmount(event.target.value)} className='text-black' />
        </FormControl>

        <FormControl id="walletAddress" isRequired>
            <FormLabel>Wallet Address</FormLabel>
            <Input type="text" value={walletAddress} onChange={event => setWalletAddress(event.target.value)} className='text-black' />
        </FormControl>

        <Button onClick={getOrder} >GetActiveOrders</Button>

        <Button type="submit" colorScheme="blue">Submit</Button>

        {result && (
            <Text mt={4}>Result: {result}</Text>
        )}
        </form>
    </div>
  )
}
