import { ReactTagProps } from '../../types';
import classes from './textarea.module.css';

export type TextAreaProps = {
  onChange: (value: string) => void;
  pattern: RegExp;
  isValid: boolean;
} & Omit<ReactTagProps<'textarea'>, 'onChange'>;

export const TextArea = ({ pattern, isValid, ...props }: TextAreaProps) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) {
      props.onChange(e.target.value);
    } else {
      const match = e.target.value.match(pattern);
      if (match && match.length === 1 && match[0] === e.target.value) {
        props.onChange(e.target.value);
      }
    }

    const element = e.target;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight - 16}px`;
  };

  return (
    <textarea
      {...props}
      onChange={onChange}
      className={classes.teaxarea}
      data-is-valid={isValid}
    />
  );
};
