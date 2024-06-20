/* tslint:disable */
// @ts-nocheck
import { FC, useEffect, useState } from 'react';
import classes from './Weather.module.css';
import { WeatherAPI } from '../../api';
import type{ VariableType } from '../../assets/types';

interface IProps {
    lat: number;
    long: number;
    variables: VariableType[];
}

export const Weather: FC<IProps> = ({ lat, long, variables }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        WeatherAPI.getWeatherData(lat, long, variables).then(weatherData => {
            if (weatherData) {
                setWeather(weatherData);
            }
        });
    }, [lat, long, variables])


    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <td className={classes.td}>date</td>
                    {variables.map((variable, index) => (
                            <td key={index} className={classes.td}>
                                {variable}
                            </td>
                        )
                    )}
                </tr>
            </thead>
            <tbody>
                {weather?.daily?.time.map((time, index) => (
                    <tr key={index}>
                        <td className={classes.td}>
                            {time}
                        </td>

                        {variables.map((variable) => (
                                <td key={variable} className={classes.td}>
                                    {weather.daily[variable]?.[index]}
                                </td>
                            )
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
