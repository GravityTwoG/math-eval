import { ReactTagProps } from '../../types';
import classes from './input.module.css';

export type InputProps = {
  onChange: (value: string) => void;
} & Omit<ReactTagProps<'input'>, 'onChange'>;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      onChange={(e) => {
        if (e.target.validity.valid) {
          props.onChange(e.target.value);
        }
      }}
      className={classes.input}
    />
  );
};
