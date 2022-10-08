import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import styles from "./Login.module.scss";

export const Login = () => {

  const isAuth = useSelector(selectIsAuth); 
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "gennadiy.konko@mail.ru",
      password: "16131488",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Failed to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };


  if (isAuth) {
    return( <Navigate to='/'></Navigate>)
  }

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", {
            required: "Enter your email",
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          fullWidth
          {...register("password", {
            required: "Enter your password",
          })}
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Entry
        </Button>
      </form>
    </Paper>
  );
};
