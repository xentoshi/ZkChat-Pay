import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import Avatar from "public/imgs/avatar.png";

const AddressProfil: React.FC = () => {
  const router = useRouter();
  const { address } = router.query;
  const {
    register,
    handleSubmit: withForm,
    formState: { errors },
  } = useForm();

  const handleTransfer = useCallback(
    withForm((data) => {
      console.log("data", data);
    }),
    []
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
              {...(register("addAddress"), { required: true })}
            />
            {errors.addAddress && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="flex flex-row">
            <label htmlFor="zkAddress" className="mr-[10px] w-[90px]">
              amount:
            </label>
            <input
              id="amount"
              className="pl-[4px] bg-transparent border border-white rounded-[4px]"
              {...(register("amount"), { required: true })}
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
