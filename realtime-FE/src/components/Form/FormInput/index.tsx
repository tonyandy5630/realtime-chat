import * as React from "react";

import { cn } from "@/lib/utils";
import ConnectForm from "../ConnectForm";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, placeholder, ...props }, ref) => {
    return (
      <ConnectForm>
        {({
          register,
          control,
        }: UseFormReturn<FieldValues, any, undefined>) => (
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem className='min-w-full'>
                <FormControl>
                  <input
                    type='text'
                    placeholder={placeholder}
                    autoFocus={props.autoFocus}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    )}
                    {...register(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </ConnectForm>
    );
  }
);
Input.displayName = "Input";

export default Input;
