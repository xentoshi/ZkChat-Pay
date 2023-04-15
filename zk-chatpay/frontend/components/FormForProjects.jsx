import { Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";
import FundCard from "./FundCard";

export default function FormForProjects() {
  const [formSuccess, setFormSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setFormSuccess(true);
  };


  return (
    <>
      {formSuccess ? (
        <FundCard
          title={watch("title")}
          description={watch("description")}
          image={watch("image")}
          nameOfProject={watch("nameOfProject")}
          location={watch("location")}
          fundingNeeds={watch("fundingNeeds")}
          room={watch("room")}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <Input
            defaultValue="Title"
            {...register("title", { required: true })}
          />
          <Input
            defaultValue="Description"
            {...register("description", { required: true })}
          />
          <Input
            defaultValue="Image URL"
            {...register("image", { required: true })}
          />
          <Input
            defaultValue="Name of the project"
            {...register("nameOfProject", { required: true })}
          />
          <Input defaultValue="Location" {...register("location", { required: true })} />
          <Input
            defaultValue="Funding needs in ETH"
            {...register("fundingNeeds", { required: true, type: "number" })}
          />
          <Input defaultValue="Room" {...register("room", { required: true })} />

          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  );
}





// const onSubmit = (data) => {
//   // retrieve any existing projects data from localStorage or create an empty array if there is no data
//   const projects = JSON.parse(localStorage.getItem("projects")) || [];
//   projects.push(data);
//   localStorage.setItem("projects", JSON.stringify(projects));
//   console.log(data);
//   setFormSuccess(true);
// };