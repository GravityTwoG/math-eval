import { ReactNode } from 'react';
import classes from './text.module.css';

export type TextProps = {
  children: ReactNode;
};

export const Text = (props: TextProps) => {
  return <p className={classes.text}>{props.children}</p>;
};
