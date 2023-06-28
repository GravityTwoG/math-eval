import { ReactNode } from 'react';
import classes from './error-text.module.css';

export type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText = (props: ErrorTextProps) => {
  return <p className={classes['error-text']}>{props.children}</p>;
};
