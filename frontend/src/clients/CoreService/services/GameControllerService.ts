/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameResponse } from '../models/GameResponse';
import type { GuessNumberRequest } from '../models/GuessNumberRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GameControllerService {

    /**
     * @param id
     * @returns GameResponse
     * @throws ApiError
     */
    public static getGame(
        id: string,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/game/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns GameResponse
     * @throws ApiError
     */
    public static createGame(): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/game',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns GameResponse
     * @throws ApiError
     */
    public static guessNumber(
        id: string,
        requestBody: GuessNumberRequest,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/game/{id}/guess',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns GameResponse
     * @throws ApiError
     */
    public static start(
        id: string,
    ): CancelablePromise<GameResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/game/{id}/start',
            path: {
                'id': id,
            },
        });
    }

}