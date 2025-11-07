import { useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUserStore } from "../../../stores";
import { ACCESS_TOKEN_NAME } from "../../../constants/variables";
import { register } from "../../../api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema } from "./schemas";
import { Button, Input } from "../../shared";

type Form = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    mode: "onBlur",
  });

  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const [authError, setAuthError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      setAuthError(null);
      setLoading(true);
      const { data: authData } = await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (authData.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_NAME, authData.accessToken);
        setUser(authData.user);

        await navigate("/");
      }
    } catch (error: any) {
      console.log(error.response.data.error.message || error);
      setAuthError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Input
          name="username"
          label="Имя"
          type="text"
          placeholder="Введите ваше имя"
        />
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder="Введите вашу почту"
        />
        <Input
          name="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
        />
        <Input
          name="passwordRepeat"
          label="Подтверждение пароля"
          type="password"
          placeholder="Повторите введенный пароль"
        />
        <div>
          <Button loading={loading} type="submit">
            Зарегистрироваться
          </Button>
          {authError && (
            <p className="mt-1 text-sm text-red-600">{authError}</p>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
