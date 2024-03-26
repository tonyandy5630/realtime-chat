"use client";
import { Button } from "@/components/Button";
import Input from "@/components/Form/FormInput";
import React, { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Connector from "@/utils/signalHub";
import { useRouter } from "next/navigation";
import User from "@/types/user.type";
import { useAuth } from "@/context";

export default function JoinChat() {
  const methods = useForm();
  const { joinRoom } = Connector();
  const { setUser } = useAuth();
  const router = useRouter();

  const onSubmit = useCallback(async (data: any) => {
    try {
      const { user, room } = data;
      if (!user || !room) {
        router.push("/chat");
      }
      const newUser: User = {
        username: user,
        room,
      };

      const isSuccess = await joinRoom(newUser);
      setUser(newUser);

      if (isSuccess === 1) router.push("/chat");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='min-w-full min-h-full flex justify-center items-start'>
      <FormProvider {...methods}>
        <form
          className='w-3/12 space-y-3'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input name='user' placeholder='Enter username' autoFocus={true} />
          <Input name='room' placeholder='Enter room' />
          <Button type='submit' className='min-w-full'>
            Join
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
