"use client";

import React, { FC } from "react";
import styles from "./index.module.scss";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default AuthLayout;
