import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import Button from "../components/common/Button";
import TextInput from "../components/common/TextInput";
import { useAuth } from "../contexts/authContext";
import { signInFeedbackUserWithEmail } from "../firebase/auth";

interface ILogin {}

const EmailValidator = z
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email.");
const PasswordValidator = z.string().min(6);

const Login: React.FC<ILogin> = ({}) => {
  const { isUserLoggedIn, isAuthLoading } = useAuth();
  const [email, setEmail] = useState<Input<string>>({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState<Input<string>>({
    value: "",
    error: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setError("");
  }, [email, password]);
  const [error, setError] = useState("");

  const onLogin = () => {
    if (!email.value || !password.value) {
      return setError("Fill all inputs");
    }
    signInFeedbackUserWithEmail(email.value, password.value)
      .then(() => navigate("/dashboard"))
      .catch((err) => setError(err?.message));
  };

  useEffect(() => {
    if (!isAuthLoading && isUserLoggedIn) {
      navigate("/dashboard");
    }
  }, [isUserLoggedIn, isAuthLoading]);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[30%] flex flex-col gap-y-4 mt-16">
        <div className="text-center">
        <h1 className="font-bold text-3xl my-6">Feedback Widget Login</h1>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <TextInput
              value={email.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                const resp = EmailValidator.safeParse(val);
                setEmail({
                  value: val,
                  error: !resp.success ? "Please enter a valid email" : "",
                });
              }}
            />
            {email.error && (
              <div className="text-red-500 mt-1">{email.error}</div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <TextInput
              value={password.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                const resp = PasswordValidator.safeParse(val);
                setPassword({
                  value: val,
                  error: !resp.success
                    ? "Please enter at least 6 charachters"
                    : "",
                });
              }}
            />
            {password.error && (
              <div className="text-red-500 mt-1">{password.error}</div>
            )}
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
