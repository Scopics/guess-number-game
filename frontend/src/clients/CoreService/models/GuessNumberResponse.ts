/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameResponse } from './GameResponse';

export type GuessNumberResponse = {
    isGuessed: boolean;
    game: GameResponse;
    characteristic: string;
};
