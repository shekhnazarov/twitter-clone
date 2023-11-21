import useRegisterModal from "@/hooks/useRegisterModal";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterStep1Schema, RegisterStep2Schema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: "", email: "" });
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  const bodyContent =
    step === 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 data={data} />
    );
  const footer = (
    <div className="text-neutral-400 text-center ">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  );
};

const RegisterStep1 = ({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof RegisterStep1Schema>>({
    resolver: zodResolver(RegisterStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterStep1Schema>) {
    try {
      const { data } = await axios.post("/api/auth/register?step=1", values);
      if (data.success) {
        setData(values);
        setStep(2);
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <h3 className="text-3xl text-white font-semibold">Create an account</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          label={<div>Next</div>}
          type="submit"
          fullWidh
          secondary
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

const RegisterStep2 = ({ data }: { data: { name: string; email: string } }) => {
  const [error, setError] = useState("");
  const registerModal = useRegisterModal();
  const form = useForm<z.infer<typeof RegisterStep2Schema>>({
    resolver: zodResolver(RegisterStep2Schema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterStep2Schema>) {
    console.log(values, "values");
    try {
      const { data: response } = await axios.post("/api/auth/register?step=2", {
        ...data,
        ...values,
      });
      console.log(data);

      if (response.success) {
        signIn("credentials", {
          email: data.email,
          password: values.password,
        });
        registerModal.onClose();
      }
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          label={<div>Register</div>}
          type="submit"
          fullWidh
          secondary
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
};

export default RegisterModal;
