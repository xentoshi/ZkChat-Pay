# ZK-Chat&Pay

![image](https://user-images.githubusercontent.com/95926324/232004303-2d900083-17c2-404f-af3c-fb81b9275374.png)

Decentralised ZK messaging with Defi Features to Fund the best Public Good Projects with Zk.

Project where the users would be easily able to fund the public goods proposals while inquire about the project through zk chat & fund them money through zk.

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

## Technologies used in ZkChat&Pay

| Protocol | Description | Code Link |
| --- | --- | --- |
| Ethereum Foundation | Powered by ZK and RLN for spam prevention, requiring users to generate proofs for sending messages | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/components/chatroom.tsx#L39) |
| QuickNode NFT-API | Used to get the user's NFT for avatar display in Zk-Chat | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/api/nft.js) |
| Aave Grants DAO | GHO stablecoin integration for funding proposals and repayment | [Borrow Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/borrow.tsx), [Repay Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/repay.tsx) |
| 1inch Fusion Swap | Enables token swapping with 0 gas fees, facilitating funding in different token types | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/swap.tsx) |
| Sismo Integration | On-chain verification to authenticate users and generate zkProofs for early supporter claims | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/chat.tsx) |
| Worldcoin | Used as a pivot point to prevent bots and ensure genuine funding proposals | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/fund.tsx) |
| ZkBob | Utilized the `directDeposit` operation for zkPayments and funding proposals | [Code Link](https://github.com/xentoshi/ZkChat-Pay/blob/main/zk-chatpay/frontend/pages/transfer/%5Baddress%5D.tsx) |
| Push Protocol | Notifies proposal owners when their proposals receive funding | N/A |

# Navigation to different pages

/ - landing pg

/chat - chat page

/transfer - zkbob integration

/fund - Projects listed who need funding with funding button

/fusion - to swap tokens

/borrow - to borrow for the project needs and later repay when support increases with time.

/repay - Repay the gho tokens.

