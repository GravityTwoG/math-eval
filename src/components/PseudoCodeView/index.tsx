import classes from './pseudocode-view.module.css';

import { Command } from '../../domain/toPseudoCode';

export type PseudoCodeViewProps = {
  pseudoCode: Command[];
};

export const PseudoCodeView = ({ pseudoCode }: PseudoCodeViewProps) => {
  return (
    <div className={classes['pseudocode-view']}>
      <table className={classes['pseudocode-table']}>
        <tbody>
          {pseudoCode.map((command, idx) => (
            <tr key={idx} className={classes['pseudocode-command']}>
              <td>{idx + 1}</td>
              <td>{command.operation}</td>
              <td>{command.operand1}</td>
              <td>{command.operand2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
