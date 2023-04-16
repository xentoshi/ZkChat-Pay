// @ts-nocheck
import { useCallback } from "react";
import { ethers, BigNumber } from "ethers";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useRouter } from "next/router";
import cx from "clsx";
import Avatar from "public/imgs/avatar.png";
import { connectBobContract, connectDDContract } from "@utils/contracts";
import waitTransactionReceipt from "@utils/waitTransactionReceipt";
import useTransaction from "@hooks/useInTransaction";
import * as PushAPI from "@pushprotocol/restapi";

const AddressProfil: React.FC = () => {
  const router = useRouter();
  const { address } = router.query;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{ zkAddress: string; amount: string }>();
  const { address: senderAdd } = useAccount();

  const _handleTransfer = useCallback(
    handleSubmit(async (data: any) => {
      try {
        const { bobContract } = await connectBobContract();
        const { DDContract } = await connectDDContract();
        let amount = BigNumber.from(data.amount);
        let bobTx: { hash: string } = await bobContract.approve(
          "0xE4C77B7787cC116A5E1549c5BB36DE07732100Bb",
          amount
        );
        const txReceipt = await waitTransactionReceipt(bobTx.hash);
        let DDTX: { hash: string } = await DDContract.directDeposit(
          ethers.utils.getAddress(senderAdd),
          amount,
          data.zkAddress
        );

        const sendMessageNotif = async (msg) => {
          const signer = window?.ethereum;
          try {
            const apiResponse = await PushAPI.payloads.sendNotification({
              signer,
              type: 3,
              identityType: 2,
              notification: {
                title: `Your have recieved a new notification`,
                body: `Project funded`,
              },
              payload: {
                title: `title`,
                body: `Congratulations, your project has been funded`,
                cta: `d`,
                img: ``
              },
              recipients: `eip155:80001:signer`,
              channel: `eip155:80001:`,
            });
          } catch (err) {
            console.error("Error: ", err);
          }
        };
        alert(`Deposite transaction sent successfully! hash: ${DDTX.hash}`);
      } catch (err) {
        if (err.code === "ACTION_REJECTED")
          alert("User rejected the transaction");
        else if (err.message.includes("Goerli")) {
          alert("Please change network to Goerli");
        } else {
          console.log("err", err);
          alert("Somethign went wrong");
        }
      }
    }),
    [connectBobContract]
  );

  const { inTransaction, execTransaction: handleTransfer } =
    useTransaction(_handleTransfer);

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
        <div className="flex flex-col gap-y-[10px] w-[430px]">
          <div className="flex flex-row w-[430px]">
            <label htmlFor="zkAddress" className="mr-[10px] w-[165px]">
              zkAddress:
            </label>
            <input
              id="zkAddress"
              className="px-[4px] w-[265px] bg-transparent border border-white rounded-[4px]"
              {...(register("zkAddress"), { required: true })}
              onChange={(e) => setValue("zkAddress", e.target.value)}
            />
            {errors.zkAddress && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="flex flex-row">
            <label
              htmlFor="amount"
              className="mr-[10px] flex flex-col w-[165pxx]"
            >
              amount:
              <div>(greater than 0.1BOB)</div>
            </label>
            <input
              id="amount"
              type="number"
              className="pl-[4px] w-[265px] bg-transparent border border-white rounded-[4px]"
              defaultValue={0}
              {...(register("amount"),
              { required: true, min: 100000000000000000 })}
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
          className={cx(
            "mt-[14px] px-[32px] h-[32px] text-black bg-white rounded-[4px] cursor-pointer",
            inTransaction && "opacity-30 pointer-events-none"
          )}
        />
      </form>
    </div>
  );
};

export default AddressProfil;
