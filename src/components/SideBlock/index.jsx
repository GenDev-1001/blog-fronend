import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./SideBlock.module.scss";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
