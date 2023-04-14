import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./styles.css";

export default function FormForProjects() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    // ADD FUNCTIONALITY HERE
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="Name of the project" {...register("Ethereum Foundation")} />
      <input defaultValue="Location" {...register("Delhi, India")} />

      <input defaultValue="Funding needs in ETH" {...register("example", {type: "number"})} />
      
      <input 
        {...register("email", { required: "Email Address is required" })} 
        aria-invalid={errors.mail ? "true" : "false"} 
      />
      {errors.mail && <p role="alert">{errors.mail?.message}</p>}

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <p>This field is required</p>}

      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
