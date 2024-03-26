import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Connector from "@/utils/signalHub";
import Input from "@/components/Form/FormInput";
import { Button } from "@/components/Button";

export default function ChatForm() {
  const methods = useForm();
  const { newMessage } = Connector();
  const {
    handleSubmit,
    resetField,
    formState: { errors },
  } = methods;

  const onSend = useCallback(async (data: any) => {
    await newMessage(data.message);
    resetField("message");
  }, []);

  return (
    <div className='min-w-screen w-full mt-3 '>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSend)} className='flex min-w-full'>
          <div className='w-11/12 flex space-x-3'>
            <Input
              name='message'
              placeholder='Enter message'
              autoFocus={true}
            />
            <Button type='submit'>Send</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
