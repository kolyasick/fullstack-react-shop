import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useUserStore } from "../../../stores";
import { useState } from "react";
import { login } from "../../../api/auth";
import { ACCESS_TOKEN_NAME } from "../../../constants/variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema, type TFormLoginValues } from "./schemas";
import { Button, Input } from "../../shared";

export const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
    mode: "onBlur",
  });

  const setUser = useUserStore((state) => state.setUser);

  const [authError, setAuthError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      setAuthError(null);
      setLoading(true);
      const { data: authData } = await login({
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
          label="E-mail"
          name="email"
          type="email"
          placeholder="Введите вашу почту"
        />
        <Input
          label="Пароль"
          name="password"
          type="password"
          placeholder="Введите пароль"
        />

        <div>
          <Button loading={loading} type="submit">
            Войти
          </Button>
          {authError && (
            <p className="mt-1 text-sm text-red-600">{authError}</p>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
