import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorText = errors[name]?.message as string;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          id={name}
          className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errorText ? "border-red-500" : "border-gray-300"
          }`}
          {...register(name)}
          {...props}
        />
      </div>
      {errorText && <p className="mt-1 text-sm text-red-600">{errorText}</p>}
    </div>
  );
};
