/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GuessedNumberInterval } from './GuessedNumberInterval';

export type GameResponse = {
    id: string;
    level: number;
    timeToGuess: number;
    guessedNumberInterval: GuessedNumberInterval;
    status: 'Idle' | 'Active' | 'Lost';
};
