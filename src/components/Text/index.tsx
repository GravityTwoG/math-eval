import classes from './text.module.css';
import { ReactTagProps } from '../../types';

export type TextProps = Omit<ReactTagProps<'p'>, 'className'>;

export const Text = (props: TextProps) => {
  return <p {...props} className={classes.text} />;
};
