import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import {FC, FormEventHandler, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {login} from "../../api/user.ts";
import {queryClient} from "../../api/queryClient.ts";

export const LoginForm: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginMutation = useMutation({
        mutationFn: () => login(email, password)
    },
        queryClient)

    const handleSubmit:FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
    }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input
            type='text'
            name='email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
        />
      </FormField>
      <FormField label="Пароль">
        <input
            type='password'
            name='password'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
        />
      </FormField>

        {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type='submit' title='Войти' isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
