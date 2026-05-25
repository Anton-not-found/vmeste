"use client";

import { Button, Input } from "@/shared/components";
import { Flex } from "@/shared/components/common";
import { Link } from "@/shared/components/common/Link/ui/Link";
import { useRootStore } from "@/stores/useRootStore";
import { useRouter } from "next/navigation";

import { FC, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormField {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const router = useRouter();
  const { auth } = useRootStore();
  const { login, isLoading, error, clearError } = auth;


  const { handleSubmit, control, reset } = useForm<IFormField>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormField> = async (formData) => {
    clearError();

    const success = await login(formData.email, formData.password);

    if (success) {
      reset();
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={24}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { name, value, onChange } }) => (
            <Input
              name={name}
              value={value}
              label="Email"
              type="email"
              placeholder="hello@vmeste.ru"
              required
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { name, value, onChange } }) => (
            <Input
              name={name}
              value={value}
              label="Пароль"
              type="password"
              placeholder="*****"
              required
              onChange={onChange}
            />
          )}
        />
        {error && <div style={{ width: 200 }}>{error}</div>}
        <Button isLoading={isLoading} type="submit" variant="primary" fullWidth>
          Присоединиться
        </Button>
        <Link variant="primary" size="large" href="/register">Зарегистрироваться</Link>
      </Flex>
    </form>
  );
};
