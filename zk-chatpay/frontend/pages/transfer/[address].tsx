import { useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import Avatar from "public/imgs/avatar.png";
import { connectBobContract, connectDDContract } from "@utils/contracts";

const AddressProfil: React.FC = () => {
  const router = useRouter();
  const { address } = router.query;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ zkAddress: string; amount: string }>();
  const { address: senderAdd } = useAccount();

  const handleTransfer = useCallback(
    handleSubmit(async (data: any) => {
      try {
        const { bobContract } = await connectBobContract();
        const { DDContract } = await connectDDContract();
        let amount = BigNumber.from(data.amount);
        let bobTx = await bobContract.approve(
          "0xE4C77B7787cC116A5E1549c5BB36DE07732100Bb",
          amount
        );
        debugger;
        let DDTX = await DDContract.directDeposit(
          ethers.utils.getAddress(senderAdd),
          amount,
          data.zkAddress
        );
        debugger;
      } catch (err) {
        console.log(err);
      }
    }),
    [connectBobContract]
  );

  return (
    <div className="flex flex-col items-center gap-y-[24px] grow font-normal">
      <Image
        alt="avatar"
        src={Avatar}
        className="w-[100px] h-[100px] rounded-[50px]"
      />
      <div>EVM address: {address}</div>
      <form
        className="flex flex-col justify-between items-center gap-y-[10px]"
        onSubmit={handleTransfer}
      >
        <div className="text-[24px] flex justify-center w-full">
          Please fill the follow information for transaction
        </div>
        <div className="flex flex-col gap-y-[10px] w-[300px]">
          <div className="flex flex-row w-[300px]">
            <label htmlFor="zkAddress" className="mr-[10px] w-[90px]">
              zkAddress:
            </label>
            <input
              id="zkAddress"
              className="pl-[4px] bg-transparent border border-white rounded-[4px]"
              {...(register("zkAddress"), { required: true })}
              onChange={(e) => setValue("zkAddress", e.target.value)}
            />
            {errors.zkAddress && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="flex flex-row">
            <label htmlFor="amount" className="mr-[10px] w-[90px]">
              amount:
            </label>
            <input
              id="amount"
              type="number"
              className="pl-[4px] bg-transparent border border-white rounded-[4px]"
              {...(register("amount"), { required: true })}
              onChange={(e) => setValue("amount", e.target.value)}
            />
            {errors.amount && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
        </div>
        <input
          type="submit"
          value="Pay"
          className="mt-[14px] px-[32px] h-[32px] text-black bg-white rounded-[4px] cursor-pointer"
        />
      </form>
    </div>
  );
};

export default AddressProfil;
