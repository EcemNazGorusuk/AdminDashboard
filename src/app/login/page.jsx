"use client";
import React, { useState } from "react";
import styles from "../../app/ui/dashboard/login/login.module.css";
import { authenticate } from "../lib/actions";
import { useFormState } from "react-dom";
export default function LoginPage() {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <div className={styles.container}>
      {/* <form action={formAction} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
        {state && state}
      </form> */}
    </div>
  );
}
