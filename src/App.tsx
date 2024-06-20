import React, { FC, useState } from 'react';
import type { VariableType } from './assets/types';
import { Weather } from './components';
import { Input } from './components/UI';

const ALL_VARIABLES = [
  'weathercode', 'temperature_2m_max', 'temperature_2m_min',
  'apparent_temperature_max', 'apparent_temperature_min',
  'sunrise', 'sunset', 'precipitation_sum', 'rain_sum',
  'showers_sum', 'snowfall_sum', 'precipitation_hours',
  'windspeed_10m_max', 'windgusts_10m_max', 'winddirection_10m_dominant',
  'shortwave_radiation_sum', 'et0_fao_evapotranspiration'
]

export const App: FC = () => {
  const [variables, setVariables] = useState<Set<VariableType>>(new Set(['rain_sum', 'snowfall_sum'] as VariableType[]));
  const [currentVariable, setCurrentVariable] = useState<VariableType | string>('');
  const [inputError, setInputError] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputError) {
      setInputError('');
    }
    setCurrentVariable(e.target.value);
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    } else if (!currentVariable) {
      setInputError('Вы не ввели значение переменной');
      return;
    }

    if (ALL_VARIABLES.includes(currentVariable)) {
      setVariables((set) => set.add(currentVariable as VariableType));
      setCurrentVariable('');
    } else {
      setInputError('Некорректное значение переменной');
    }
  }

  return (
    <div>
      <Input
        labelText='Введите значение переменной:'
        placeholder='Введите значение переменной...'
        currentVariable={currentVariable}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        error={inputError}
      />
      <Weather lat={55.751244} long={37.618423} variables={Array.from(variables)} />
    </div>
  );
}
