import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../typings/FormInput";

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const { connectedWalletAddress, sendTransaction } =
    useContext(TransactionContext);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    sendTransaction(data);
  };
  return (
    <form
      className="flex flex-col gap-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="input input-bordered w-full"
        placeholder="Address To"
        {...register("receiver", { required: true })}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Amount (ETH)"
        {...register("amount", { required: true })}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Keyword"
        {...register("keyword")}
      />
      <input
        className="input input-bordered w-full"
        placeholder="Enter Message"
        {...register("message")}
      />
      <div className="pt-4 w-full">
        <button
          type="submit"
          disabled={!connectedWalletAddress}
          className="w-full btn btn-outline btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send now
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
