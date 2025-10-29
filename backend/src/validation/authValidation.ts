import Joi from "joi";

export const registerValidationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      "string.min": "Имя пользователя должно содержать минимум 3 символа",
      "string.max": "Имя пользователя не должно превышать 30 символов",
      "string.pattern.base": "Имя пользователя может содержать только буквы, цифры и символ подчеркивания",
      "any.required": "Имя пользователя обязательно",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Некорректный формат email",
      "any.required": "Email обязателен",
    }),

  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Пароль должен содержать минимум 6 символов",
    "string.max": "Пароль не должен превышать 100 символов",
    "any.required": "Пароль обязателен",
  }),
});
