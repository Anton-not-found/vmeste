"use client";

import { prepareActivityCategoryToString } from "@/entities/activity/models/helpers/functions";
import { EActivityCategory } from "@/shared";
import { DatePicker, Flex, Form, Input, Modal, Select } from "antd";
import { Dayjs } from "dayjs";
import { FC, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  createActivity,
  ICreateActivityRequest,
} from "../../api/commands/createActivity";
import { useRouter } from "next/navigation";


type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

type IFormField = {
  title: string;
  description: string;
  category?: EActivityCategory;
  //   activateOnUtc: string;
  activateOnUtc: Dayjs;
  location: string;
  price: number;
  maxParticipants: number;
};

const { TextArea } = Input;

export const CreateActivityForm: FC<TProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, control, reset, watch, formState } =
    useForm<IFormField>({
      defaultValues: {
        title: "",
        description: "",
        category: undefined,
        activateOnUtc: "",
        price: 0,
        maxParticipants: 0,
        location: "",
      },
      mode: "onChange",
    });

  const categories: Array<{ value: number; label: string }> = Object.values(
    EActivityCategory,
  )
    .filter((v) => typeof v === "number")
    ?.map((i) => ({ value: i, label: prepareActivityCategoryToString(i) }));

  const handleOk: SubmitHandler<IFormField> = async (formData) => {
    const prepareDate = formData.activateOnUtc
      ? formData.activateOnUtc.toISOString()
      : "";

    const request: ICreateActivityRequest = {
      ...formData,
      activateOnUtc: prepareDate,
      category: formData.category  !== undefined ? formData.category : null,
    };
    

    setIsLoading(true);
    try {
      const result = await createActivity(request);

      if (result.success) {
        router.push("/"); // редирект на главную
        onClose()
      } else {
        console.error("Creation failed:", result.error);
        // показать сообщение об ошибке
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      styles={{ container: { width: 800 } }}
      title="Добавление новой активности"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      okButtonProps={{
        htmlType: "submit",
        onClick: () => formRef.current?.requestSubmit(),
        loading: isLoading,
        disabled: isLoading,
      }}
      onCancel={onClose}
      cancelText="Отмена"
      okText="Добавить"
    >
      <form ref={formRef} onSubmit={handleSubmit(handleOk)}>
        <Flex style={{ width: "100%" }} vertical gap={16}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Заголовок обязателен",
              //   validate: validateEmail,
            }}
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <Form.Item
                layout="vertical"
                style={{ margin: 0 }}
                label="Заголовок"
                validateStatus={error ? "error" : ""}
                help={error?.message}
                required={true}
              >
                <Input
                  name={name}
                  value={value}
                  //   data-testid="email"
                  type="text"
                  placeholder="Введите текст заголовка"
                  required
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Описание обязателено",
              //   validate: validateEmail,
            }}
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <Form.Item
                layout="vertical"
                style={{ margin: 0 }}
                label="Описание"
                validateStatus={error ? "error" : ""}
                help={error?.message}
                required={true}
              >
                <TextArea
                  name={name}
                  value={value}
                  required
                  //   data-testid="email"
                  rows={4}
                  placeholder="Введите текст описания"
                  onChange={onChange}
                />
              </Form.Item>
            )}
          />

          <Flex align="center" gap={16}>
            <Controller
              name="category"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Form.Item
                  layout="vertical"
                  style={{ margin: 0, width: "100%" }}
                  label="Категория"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Select
                    defaultValue={"Без категории"}
                    value={value}
                    onChange={onChange}
                    options={categories}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="location"
              control={control}
              rules={{
                required: "Локация обязательна",
                //   validate: validateEmail,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Form.Item
                  layout="vertical"
                  style={{ margin: 0, width: "100%" }}
                  label="Локация"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  required={true}
                >
                  <Input
                    name={name}
                    value={value}
                    //   data-testid="email"
                    type="text"
                    placeholder="Введите название локации"
                    required
                    onChange={onChange}
                  />
                </Form.Item>
              )}
            />
          </Flex>

          <Flex align="center" gap={16}>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Стоимость обязательна",
                //   validate: validateEmail,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Form.Item
                  layout="vertical"
                  style={{ margin: 0 }}
                  label="Стоимость"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  required={true}
                >
                  <Input
                    name={name}
                    value={value}
                    //   data-testid="email"
                    type="number"
                    placeholder="Укажите стоимость"
                    required
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      const numberValue =
                        rawValue === "" ? "" : Number(rawValue);
                      onChange(numberValue);
                    }}
                  />
                </Form.Item>
              )}
            />
        
            <Controller
              name="maxParticipants"
              control={control}
              rules={{
                required: "Кол-во участников обязательно",
                //   validate: validateEmail,
              }}
              render={({
                field: { name, value, onChange },
                fieldState: { error },
              }) => (
                <Form.Item
                  layout="vertical"
                  style={{ margin: 0 }}
                  label="Максимальное кол-во участников"
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                  required={true}
                >
                  <Input
                    name={name}
                    value={value}
                    //   data-testid="email"
                    type="number"
                    placeholder="Укажите максимальное кол-во участников"
                    required
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, "");
                      const numberValue =
                        rawValue === "" ? "" : Number(rawValue);
                      onChange(numberValue);
                    }}
                  />
                </Form.Item>
              )}
            />
          </Flex>
          <Controller
            name="activateOnUtc"
            control={control}
            rules={{
              required: "Кол-во участников обязательно",
              //   validate: validateEmail,
            }}
            render={({
              field: { name, value, onChange },
              fieldState: { error },
            }) => (
              <Form.Item
                layout="vertical"
                style={{ margin: 0 }}
                label="Дата начала"
                validateStatus={error ? "error" : ""}
                help={error?.message}
                required={true}
              >
                <DatePicker
                  name={name}
                  value={value}
                  showTime
                  onChange={(date: Dayjs | null) => {
                    onChange(date); // Сохраняем dayjs объект
                  }}
                  //   onChange={(dayjsValue) => {
                  //     onChange(dayjsValue ? dayjsValue.toISOString() : undefined);
                  //   }}
                  //   onChange={onChange}
                />
              </Form.Item>
            )}
          />
        </Flex>
      </form>
    </Modal>
  );
};
