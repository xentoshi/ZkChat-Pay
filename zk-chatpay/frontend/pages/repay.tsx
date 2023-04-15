import { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { Pool, InterestRate } from '@aave/contract-helpers';
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import {ethers } from 'ethers';
import { useEffect } from 'react';

const RepayForm = () => {
//   const [provider, setProvider] = useState<any>([]);
  const [user, setUser] = useState('');
  const [reserve, setReserve] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRateMode, setInterestRateMode] = useState<InterestRate>(InterestRate.None);
  const [debtTokenAddress, setDebtTokenAddress] = useState('');
  const [onBehalfOf, setOnBehalfOf] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [txs, setTxs] = useState<EthereumTransactionTypeExtended[]>([]);

//   useEffect(() => {
//     if (window) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       setProvider(provider);
//     }
//   }, []);
  const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/95f3b4611a8b480cb893abd71579bf09');

  const pool = new Pool(provider, {
    POOL: '0x3De59b6901e7Ad0A19621D49C5b52cC9a4977e52', // Goerli GHO market
    WETH_GATEWAY: '0x9c402E3b0D123323F0FCed781b8184Ec7E02Dd31', // Goerli GHO market
  });

  const submitTransaction = async (provider: any, tx: EthereumTransactionTypeExtended) => {
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const txs = await pool.repay({
      user,
      reserve,
      amount,
      interestRateMode,
      onBehalfOf
    });

    // If the user has not approved the pool contract to spend their tokens, txs will also contain two transactions: approve and repay.
    if (txs.length > 1) {
      const approvalTx = txs[0];
      const repayTx = txs[1];

      // Use `submitTransaction` to submit the approval transaction first
      await submitTransaction(provider, approvalTx);

      // Use `submitTransaction` to submit the repay transaction
      await submitTransaction(provider, repayTx);

      setTxs(txs);
    } else {
      // If there is no approval transaction, then `repay()` can be called without the need for an approval or signature
      const tx = txs[0];
      await submitTransaction(provider, tx);
      setTxs(txs);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <VStack spacing={4}>
            <Input placeholder="User Address" value={user} onChange={(e) => setUser(e.target.value)} />
            <Input placeholder="Reserve Address" value={reserve} onChange={(e) => setReserve(e.target.value)} />
            <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Input
            placeholder="Interest Rate Mode"
            value={interestRateMode}
            onChange={(e) => setInterestRateMode(e.target.value as InterestRate)}
            />
            <Input placeholder="On Behalf Of" value={onBehalfOf} onChange={(e) => setOnBehalfOf(e.target.value)} />
            <Button type="submit" colorScheme="blue">
            Repay
            </Button>
            </VStack>
            </form>
            </div>
        );
        };

export default RepayForm;





