"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  children: any;
};

export default function ConnectForm({ children }: Props) {
  const methods = useFormContext();
  return children({ ...methods });
}
