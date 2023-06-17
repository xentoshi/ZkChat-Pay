# ZK-Chat&Pay

![image](https://user-images.githubusercontent.com/95926324/232004303-2d900083-17c2-404f-af3c-fb81b9275374.png)

Decentralised ZK messaging with Defi Features X Fund the best Public Good Projects with Zk.

Project where the users would be easily able to Fund the Public goods proposals while inquire about the project through zk chat & fund them money through zk .

Features:- 

Multi-Blockchain support: Adding support for multiple cryptocurrencies can make your platform more accessible to a wider range of users who may prefer to transact in different digital assets. 

Group chat functionality: Providing the ability for users to create and join group chats can enhance the social aspect of your platform and enable more efficient communication among groups of people. 

Public Goods Projects that need to be funded are listed on /fund pg. Users can fund the projects using crosschain tokens.

Chatting users can go to the /transfer/USER_EVMADDRESS page where user can send BOB directly to another users' zkAddress.
live video for introduction:

https://user-images.githubusercontent.com/97211928/232255956-e9c22992-53fd-4d7d-913e-568b1f5d83bc.mp4

### Description

Our project, Zk-Chat&Pay, is a decentralized messaging platform with integrated DeFi features. It aims to address the problem of secure and private communication while providing a seamless way to fund public good projects. 

🔒 The problem we identified is the lack of privacy and security in traditional messaging platforms, where user data can be vulnerable to surveillance and hacking. Additionally, there is a need for a convenient and transparent way to fund public good projects. 

🔐 Zk-Chat&Pay solves these problems by leveraging zero-knowledge proofs (ZKPs) for secure messaging and integrating decentralized finance (DeFi) functionalities for funding public good projects. By utilizing ZKPs, our platform ensures that user communications remain private and anonymous, protecting sensitive information from unauthorized access. Users can engage in encrypted conversations with confidence, knowing that their messages are secure. 

💸 In terms of funding public good projects, Zk-Chat&Pay provides a seamless process for users to inquire about projects through the messaging feature and directly fund them using cross-chain tokens. This eliminates the need for intermediaries and ensures that funds reach the intended projects quickly and transparently. 

🚀 Our differentiator lies in the combination of secure messaging and DeFi capabilities within a single platform. By integrating these two aspects, we provide a comprehensive solution that caters to both communication privacy and efficient project funding. 

💡 The idea for Zk-Chat&Pay emerged from our exploration of ZK and DeFi technologies during the EthTokyo hackathon. We wanted to create something that would have practical utility in the real world and address existing gaps. The concept of a secure messaging platform with integrated DeFi features resonated with us as it offers the potential to enhance privacy, security, and transparency in both personal and public interactions. 

🌟 Through our project, we aim to empower users with secure zk communication while enabling them to contribute to public good projects effortlessly.

## Bounties 

## Ethereum Foundation

<img src="https://avatars.githubusercontent.com/u/108887131?s=200&v=4" alt="rln" />

Our Dapp is Powered by ZK and RLN for spam prevention , 
users are required to generate proofs each time they need to send the message. 

RLN helps to keep the conversations spam free and maintains a registery with proofs of the published msges.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/components/chatroom.tsx#L39

## QuickNode NFT-APi

Quicknode's NFT-api is used to get the NFT of the user which is utilised to give the avatar in the zk-chat.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/api/nft.js

## Aave Grants DAO

<img src="https://docs.gho.xyz/assets/images/Aave_ghost-e19c8d68e0e0f7bf40fa61968b8bbf64.png" alt="aave" width="80" />

GHO is a decentralized multi-collateral stablecoin that is fully backed, transparent and native to the Aave Protocol.

GHO tokens are used by the owner of proposals to buy the GHO stablecoin from the market and initiate their flow . Later they return and repay the GHO tokens.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/borrow.tsx  , 
https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/repay.tsx


## 1inch Fusion Swap provides swapping with 0 Gas Fee

![image](https://user-images.githubusercontent.com/37624021/232261846-9776c2a4-9f7d-419c-9bfa-44b716621b99.png)

1inch is very useful in the context of funding a proposal, as it enables individuals or organizations to easily convert one type of token into another in order to provide funding.

For Example- A proposal is seeking funding in ETH, but a potential funder only has DAI. 
Using 1inch swap , the funder could swap their DAI for ETH, without having to go through the process of transferring their DAI to an exchange that supports DAI/ETH trading pairs. 

This can save time and reduce the fees associated with multiple transactions.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/swap.tsx

## Sismo Integration

<img src="https://user-images.githubusercontent.com/37624021/232261862-7b1ac54d-6946-41d9-ac11-3761a283a071.png" alt="sismo" width="120" />

Sismo's on-chain Verification is used to autheticate the users and with the help of zkProof generated we verify if the user was an early supporter of the specific fund raiser campaign or not. 

If he/she was a part of early supporters of the campaign then they are given the ability to accept the zk-airdrops by generating claims.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/chat.tsx

Sismo will be used to zk airdrop tokens to the early supporters.
so essentially using that zkproof to generate a claim that they were early supporters something like that 🚀🤞🏻


https://github.com/xentoshi/ZkChat-Pay/commit/2977618360a33d938ee92a451ea8e2bd6a54a9f2

## Worldcoin

![image](https://user-images.githubusercontent.com/37624021/232261806-c247c0ff-0b4a-4378-b447-a03787f446c2.png)

We utilised worldcoin as a pivot point for our app to prevent bots from creating fund proposals on our platforms and hence now the platform is idea for real person in needs to get funding from other users.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/fund.tsx

## ZkBob `directDeposit` is utilised for doing zkPayments


-> The project integrated the `directDeposit` operation in `/transfer` page, which allows users to send BOB directly to someone's zkAddress from our project.

-> Through `ZkBob` supporters can easily fund the proposals too.

https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/transfer/%5Baddress%5D.tsx

## Push Protocol

-> Inorder to Notify the proposal Owner Whenever someone Funds their proposal. 


# Navigation to different pages

/ - landing pg

/chat - chat page

/transfer - zkbob integration

/fund - Projects listed who need funding with funding button

/fusion - to swap tokens

/borrow - to borrow for the project needs and later repay when support increases with time.

/repay - Repay the gho tokens.

