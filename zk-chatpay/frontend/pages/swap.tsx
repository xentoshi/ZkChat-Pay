
// @ts-nocheck
import { useState } from "react";
import { Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";

import { FusionSDK, NetworkEnum, PrivateKeyProviderConnector } from '@1inch/fusion-sdk';
import fetch from 'node-fetch';
import yesno from 'yesno';


const makerPrivateKey = ''; //this is the secret key to a wallet
const nodeUrl = ''; //this is a URL for a web3 RPC, I used Infura URL here

const walletAddress = ''; //address to your metamask wall
const fromAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; //contract address to WETH
const toAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; //contract address to USDC
const amount = '13100000000000000'; // .131 WETH is close to the minimum transaction size 

const network = new String(NetworkEnum.ETHEREUM); //also compatible on ...
const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
const broadcastApiUrl = 'https://tx-gateway.1inch.io/v1.1/' + network + '/broadcast';
const baseURL = 'https://api.1inch.io/v5.0/';

const swapParams = {
  fromTokenAddress: fromAddress,
  toTokenAddress: toAddress,
  amount: amount,
  walletAddress: walletAddress,
};

const blockchainProvider = new PrivateKeyProviderConnector(
    makerPrivateKey,
    provider

    
  );

const sdk = new FusionSDK({
  url: 'https://fusion.1inch.io',
  network: NetworkEnum.ETHEREUM,
  blockchainProvider
});

async function broadCastRawTransaction(rawTransaction) {
  return fetch(broadcastApiUrl, {
    method: 'post',
    body: JSON.stringify({ rawTransaction }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.transactionHash;
    });
}

async function signAndSendTransaction(transaction) {
  const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
  const signer = new ethers.Wallet(makerPrivateKey, provider);
  const tx = await signer.sendTransaction(transaction);
  return tx.hash;
}

async function buildTxForApproveTradeWithRouter(tokenAddress, amount) {
  const url = amount
    ? baseURL +
      network +
      `/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`
    : baseURL + network + `/approve/transaction?tokenAddress=${tokenAddress}`;

  const transaction = await fetch(url).then((res) => res.json());

  const gasLimit = await sdk.getEstimatedGas(transaction, walletAddress);

  return {
    ...transaction,
    gasLimit: gasLimit,
  };
}

async function checkAllowance(tokenAddress, walletAddress) {
  const url =
    baseURL + network + `/tokens/${tokenAddress}/allowance?owner=${walletAddress}&spender=${sdk.getRouterAddress()}`;
  const response = await fetch(url);
  const data = await response.json();
  return parseInt(data?.allowance);
}

async function approveTransaction() {
    const transactionForSign = await buildTxForApproveTradeWithRouter(
      swapParams.fromTokenAddress,
      swapParams.amount
    );
    const allowance = await checkAllowance(
      swapParams.fromTokenAddress,
      swapParams.walletAddress
    );
        
}


      