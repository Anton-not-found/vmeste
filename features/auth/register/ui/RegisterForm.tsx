"use client";

import { useRootStore } from "@/stores/useRootStore";
import { Input, Button } from "@/shared/components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Flex } from "@/shared/components/common";
import { Text } from "@/shared/components/common/Text/ui/Text";
import { useRouter } from "next/navigation";
import { Link } from "@/shared/components/common/Link/ui/Link";

interface IFormField {
  email: string;
  password: string;
  firstName: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { auth } = useRootStore();
  const { register, isLoading, error, clearError } = auth;

  const { handleSubmit, control, reset } = useForm<IFormField>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
    },
  });

  const onSubmit: SubmitHandler<IFormField> = async (formData) => {
    clearError();
    const success = await register(formData);
    if (success) {
      reset();
      router.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <Flex gap={24} vertical>
          <Flex vertical gap={16}>
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
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { name, value, onChange } }) => (
                <Input
                  name={name}
                  value={value}
                  label="Имя"
                  type="text"
                  placeholder="Как тебя зовут?"
                  required
                  onChange={onChange}
                />
              )}
            />
          </Flex>

          {/* <div>{error &&  error }</div> */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            СТАТЬ УЧАСТНИКОМ
          </Button>
          <Text>
            Уже с нами?{" "}
            <Link variant="primary" size="large" href="/login">
              Войти
            </Link>
          </Text>
        </Flex>
      </form>
    </div>
  );
};
