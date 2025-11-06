import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useCartStore, useUserStore } from "../../../stores";
import { useState } from "react";
import { login } from "../../../api/auth";
import { ACCESS_TOKEN_NAME } from "../../../constants/variables";

type Form = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: "onBlur",
  });
  const setUser = useUserStore((state) => state.setUser);

  const [authError, setAuthError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Form> = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </label>
        <div className="mt-1">
          <input
            {...register("email", {
              required: "E-mail обязателен для заполнения",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Введите корректный e-mail адрес",
              },
            })}
            id="email"
            type="email"
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Введите ваш e-mail"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Пароль
        </label>
        <div className="mt-1">
          <input
            {...register("password", {
              required: "Пароль обязателен для заполнения",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            id="password"
            type="password"
            autoComplete="new-password"
            className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Введите пароль"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:pointer-events-none"
          disabled={Object.keys(errors).length > 0}
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
        {authError && <p className="mt-1 text-sm text-red-600">{authError}</p>}
      </div>
    </form>
  );
};
