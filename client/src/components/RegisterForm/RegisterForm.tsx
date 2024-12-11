import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import {FC, FormEventHandler, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {registerUser} from "../../api/user.ts";
import {queryClient} from "../../api/queryClient.ts";

export const RegisterForm: FC = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerMutation = useMutation({
        mutationFn: () => registerUser(username, email, password)
    }, queryClient)

    const handleSubmit:FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        registerMutation.mutate()
    }

    return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input
            type='text'
            name='email'
            onChange={(event) => setUsername(event.target.value)}
            value={username}
        />
      </FormField>
      <FormField label="Email">
        <input
            type='email'
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

        {registerMutation.error && <span>{registerMutation.error.message}</span>}

      <Button type='submit' title='Зарегистрироваться' isLoading={registerMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
