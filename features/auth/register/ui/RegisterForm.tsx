"use client";

import { useRootStore } from "@/stores/useRootStore";
import { Input, Button } from "@/shared/components";
import { Controller, SubmitHandler, useForm, Validate } from "react-hook-form";
import { Flex } from "@/shared/components/common";
import { Text } from "@/shared/components/common/Text/ui/Text";
import { useRouter } from "next/navigation";
import { Link } from "@/shared/components/common/Link/ui/Link";
import { isEmail } from "@/shared";

interface IFormField {
  email: string;
  password: string;
  firstName: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { auth } = useRootStore();
  const { register, isLoading, error, clearError } = auth;

  const { handleSubmit, control, reset, watch } = useForm<IFormField>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
    },
    mode: "onChange",
  });

  const passwordLength = 6;
  const nameLength = 0;

  const emailWatch = watch("email");
  const passwordWatch = watch("password");
  const firstNameWatch = watch("firstName");

  const onSubmit: SubmitHandler<IFormField> = async (formData) => {
    clearError();
    const success = await register(formData);
    if (success) {
      reset();
      router.push("/");
    }
  };

  const validateEmail: Validate<string, IFormField> = (value) =>
    isEmail(value) || "Некорректный формат email";
  const validatePassword: Validate<string, IFormField> = (value) =>
    (value && value.length >= passwordLength) || "Минимум 6 символов";
  const validateName: Validate<string, IFormField> = (value) => {
    if (!value || value.trim().length === 0) {
      return "Имя обязательно";
    }
    return true;
  };

 const isFormValid = () => {
  return (
    emailWatch &&
    isEmail(emailWatch) &&
    passwordWatch &&
    passwordWatch.length >= 6 &&
    firstNameWatch
  );
};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <Flex gap={24} vertical>
          <Flex vertical gap={16}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email обязателен",
                validate: validateEmail,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  value={value}
                  label="Email"
                  data-testid="email"
                  type="text"
                  placeholder="hello@vmeste.ru"
                  required
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Пароль обязателен",
                validate: validatePassword,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  autoComplete="off"
                  name={name}
                  value={value}
                  label="Пароль"
                  data-testid="password"
                  type="password"
                  placeholder="*****"
                  required
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "Имя обязательно",
                validate: validateName,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  name={name}
                  value={value}
                  label="Имя"
                  data-testid="name"
                  type="text"
                  placeholder="Как тебя зовут?"
                  required
                  onChange={onChange}
                  error={error?.message}
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
            disabled={!isFormValid() || isLoading}
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
