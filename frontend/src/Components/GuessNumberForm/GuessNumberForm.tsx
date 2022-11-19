import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { GameControllerService } from 'clients/CoreService';
import Input from 'Components/Input';
import { delay } from 'consts/delay';
import { entities } from 'consts/entities';
import { useSnackbarOnError } from 'hooks/useSnackbarOnError';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import './GuessNumberForm.css';

enum Status {
	Idle,
	Active,
	Lost,
	NoActiveGames,
}

export default function GuessNumberForm() {
	const snackbar = useSnackbarOnError();
	const queryClient = useQueryClient();
	const [status, setStatus] = useState<Status>(Status.NoActiveGames);
	const [id, setId] = useState<string>('');
	const [guessedNumber, setGuessedNumber] = useState<string>('');
	const [errorTxt, setErrorTxt] = useState<string>('');
	const time = useRef(0);

	useEffect(() => {
		if (status === Status.Lost) {
			setErrorTxt('');
			setId('');
		}
	}, [status]);

	const { mutate: createGame } = useMutation(
		[entities.game],
		() => {
			return GameControllerService.createGame();
		},
		{
			onError: snackbar,
			onSettled: data => {
				if (data) {
					setId(data.id);
					setStatus(Status[data.status]);
				}
				queryClient.invalidateQueries(entities.game);
			},
		},
	);

	const { mutate: startGame } = useMutation(
		[entities.game],
		() => {
			return GameControllerService.start(id);
		},
		{
			onError: snackbar,
			onSettled: data => {
				if (data) {
					setStatus(Status[data.status]);
					time.current = Date.now() + data.timeToGuess * 1000;
				}
				queryClient.invalidateQueries(entities.game);
			},
		},
	);

	const { mutate: guessNumber } = useMutation(
		[entities.game],
		(enteredNumber: number) => {
			return GameControllerService.guessNumber(id, { enteredNumber });
		},
		{
			onError: snackbar,
			onSettled: data => {
				if (data) {
					if (!data.isGuessed) {
						setErrorTxt(`Number is incorrect, must be ${data.characteristic}`);
						setGuessedNumber('');
						setStatus(Status[data.game.status]);
					} else {
						setErrorTxt('');
						setGuessedNumber('');
						time.current = Date.now() + data.game.timeToGuess * 1000;
					}
				}
				queryClient.invalidateQueries(entities.game);
			},
		},
	);

	const { data: currentGame } = useQuery(
		[entities.game],
		() => {
			return GameControllerService.getGame(id);
		},
		{
			enabled: !!id,
			onSettled: data => {
				if (data) {
					setStatus(Status[data.status]);
				}
			},
			onError: snackbar,
		},
	);

	const handleTimerComplete = () => {
		setTimeout(() => queryClient.invalidateQueries(entities.game), delay.invalidateQueriesDelay);
	};

	return (
		<div className='form_container'>
			<div className='form_box'>
				<div className='header_form'>
					<h4 className='text_primary'>Game status: {currentGame?.status || Status[status]}</h4>
				</div>
				<div className='body_form'>
					{status === Status.Idle && (
						<button className='guess_button' onClick={() => startGame()}>
							Start game
						</button>
					)}
					{status === Status.Active && currentGame && (
						<>
							<div className='level_text'>Level: {currentGame.level}</div>
							<div className='level_text'>
								Pick a number between {currentGame.guessedNumberInterval.from} and{' '}
								{currentGame?.guessedNumberInterval.to}. Be on time.
							</div>
							<div className='level_text'>
								<Countdown date={time.current} onComplete={handleTimerComplete}>
									<span>Time is up!</span>
								</Countdown>
							</div>
							{errorTxt && <div className='level_text error_text'>{errorTxt}</div>}
							<Input
								label='Guess Number Game'
								value={guessedNumber}
								onChange={e => {
									setGuessedNumber(e.target.value);
								}}
							/>
							<button
								className='guess_button'
								onClick={() => {
									guessNumber(+guessedNumber);
								}}
							>
								Guess
							</button>
						</>
					)}
					{(status === Status.Lost || status === Status.NoActiveGames) && (
						<button className='guess_button' onClick={() => createGame()}>
							Create new game
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
