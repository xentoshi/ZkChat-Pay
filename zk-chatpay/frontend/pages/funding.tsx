// @ts-nocheck
import { Input, Button, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";

export default function FormForProjects() {
  const [formSuccess, setFormSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // retrieve any existing projects data from localStorage or create an empty array if there is no data
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(data);
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(data);
    setFormSuccess(true);
  };

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <>
      <div className="max-w-md mx-auto px-4 py-8">
        {formSuccess ? (
          <p style={{ color: "green" }}>Form submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Name of the project</FormLabel>
                <Input {...register("projectName")}  className="text-black"/>
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input {...register("location")} className="text-black"/>
              </FormControl>
              <FormControl>
                <FormLabel>Funding needs in ETH</FormLabel>
                <Input {...register("funding", { type: "number" })} className="text-black"/>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  {...register("email", { required: "Email Address is required" })} className="text-black"
                />
                {errors.email && (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.email?.message}
                  </p>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input {...register("imageUrl")} type="url" className="text-black"/>
                </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        )}
      </div>
    </>
  );
}
