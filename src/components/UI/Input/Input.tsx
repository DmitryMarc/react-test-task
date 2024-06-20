import { FC, useId} from 'react';
import classes from './Input.module.css';

interface IProps {
    labelText: string;
    placeholder?: string;
    currentVariable: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    error: string;
}

export const Input: FC<IProps> = (props) => {
    const { labelText, placeholder, currentVariable, onChange, onKeyDown, error } = props;
    const id = useId();
    return (
        <div className={classes.wrapper}>
            {labelText &&
                <label htmlFor={id}>
                    {labelText}
                </label>
            }
            <div className={classes.input}>
                <input
                    id={id}
                    type="text"
                    className={classes.input__value}
                    placeholder={placeholder}
                    value={currentVariable}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                {error &&
                    <small className={classes.input__error}>{error}</small>
                }
            </div>
        </div>
    )
}
