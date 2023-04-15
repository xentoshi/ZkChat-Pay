import { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { Pool, InterestRate } from '@aave/contract-helpers';
import { EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import ethers from 'ethers';
import { useEffect } from 'react';

const BorrowForm = () => {

  const [provider, setProvider] = useState<any | null>(null);
  const [user, setUser] = useState('');
  const [reserve, setReserve] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRateMode, setInterestRateMode] = useState<InterestRate>(InterestRate.None);
  const [debtTokenAddress, setDebtTokenAddress] = useState('');
  const [onBehalfOf, setOnBehalfOf] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      console.log(ethers);
      // const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/95f3b4611a8b480cb893abd71579bf09');
      setProvider(provider);
    }
  }, []);
  


  const submitTransaction = async (provider: any, tx: any) => {
    const extendedTxData = await tx.tx();
    const { from, ...txData } = extendedTxData;
    const signer = provider.getSigner(from);
    const txResponse = await signer.sendTransaction({
      ...txData,
      value: txData.value ? BigNumber.from(txData.value) : undefined,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pool = new Pool(provider, {
      POOL: '0x3De59b6901e7Ad0A19621D49C5b52cC9a4977e52',
      WETH_GATEWAY: '0x9c402E3b0D123323F0FCed781b8184Ec7E02Dd31',
    });
  
    const tx = await pool.borrow({
      user,
      reserve: '0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211', // Goerli GHO market
      amount,
      interestRateMode,
      debtTokenAddress: '0x80aa933EfF12213022Fd3d17c2c59C066cBb91c7',
      onBehalfOf,
      referralCode,
    });

    await submitTransaction(provider, tx);
    setTxs([tx]);
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <VStack spacing="6">
          <Input placeholder="User address" value={user} onChange={(event) => setUser(event.target.value)} />
          <Input placeholder="Reserve address" value={reserve} onChange={(event) => setReserve(event.target.value)} />
          <Input placeholder="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
          <select value={interestRateMode} onChange={(event) => setInterestRateMode(event.target.value as InterestRate)}>
            <option value={InterestRate.None}>None</option>
            <option value={InterestRate.Stable}>Stable</option>
            <option value={InterestRate.Variable}>Variable</option>
          </select>
          <Input placeholder="Debt token address" value={debtTokenAddress} onChange={(event) => setDebtTokenAddress(event.target.value)} />
          <Input placeholder="On behalf of" value={onBehalfOf} onChange={(event) => setOnBehalfOf(event.target.value)} />
          <Input placeholder="Referral code" value={referralCode} onChange={(event) => setReferralCode(event.target.value)} />
          <Button className='rounded-full text-black bg-indigo-400 p-4' type="submit">Borrow GHO</Button>
        </VStack>
      </form>
    </div>
  );
};

export default BorrowForm;
