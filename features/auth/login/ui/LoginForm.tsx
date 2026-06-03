"use client";

import { useRootStore } from "@/stores/useRootStore";
import { Button, Flex, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
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
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Form.Item
              label="Email"
              validateStatus={error ? "error" : ""}
              help={error?.message}
              required={true}
            >
              <Input
                name={name}
                value={value}
                type="email"
                placeholder="hello@vmeste.ru"
                required
                onChange={onChange}
              />
            </Form.Item>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({
            field: { name, value, onChange },
            fieldState: { error },
          }) => (
            <Form.Item
              label="Email"
              validateStatus={error ? "error" : ""}
              help={error?.message}
              required={true}
            >
              <Input.Password
                name={name}
                value={value}
                type="password"
                placeholder="*****"
                required
                onChange={onChange}
              />
            </Form.Item>
          )}
        />
        {error && <div style={{ width: 200 }}>{error}</div>}
        <Button loading={isLoading} type="primary" htmlType="submit">
          Присоединиться
        </Button>
        <Link href="/register">Зарегистрироваться</Link>
      </Flex>
    </form>
  );
};
