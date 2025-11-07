import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { formOrderSchema, type TFormOrderValues } from "./schemas";
import type { User } from "../../../models/user/api";
import { Button, Input } from "../../shared";

type Props = {
  data: User;
  createOrder: (data: TFormOrderValues) => void;
};

export const OrderForm: React.FC<Props> = ({ data, createOrder }) => {
  const form = useForm({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      username: data.username,
      email: data.email,
      comment: "",
    },
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(createOrder)} className="space-y-3">
        <Input
          label="Ваше имя"
          name="username"
          placeholder="Введите ваше имя"
        />
        <Input label="E-mail" name="email" placeholder="Введите вашу почту" />

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Комментарий к заказу
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Дополнительные пожелания к заказу..."
          />
        </div>

        <Button type="submit" loading={false}>
          Оформить заказ
        </Button>
      </form>
    </FormProvider>
  );
};
