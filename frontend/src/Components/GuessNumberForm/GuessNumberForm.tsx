import Input from 'Components/Input';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import './GuessNumberForm.css';

export interface GuessNumberFormProps {
	value: string;
}

enum Status {
	Idle,
	Active,
	Lost,
}

const time = 10;
let status = 0;
status = 2;

export default function GuessNumberForm() {
	return (
		<div className='form_container'>
			<div className='form_box'>
				<div className='header_form'>
					<h4 className='text_primary'>Game status: {Status[status]}</h4>
				</div>
				<div className='body_form'>
					{status == Status.Idle && (
						<button className='guess_button' role='button'>
							Start game
						</button>
					)}
					{status == Status.Active && (
						<>
							<div className='level_text'>Level: {1}</div>
							<div className='level_text'>
								Pick a number between {1} and {10}. Be on time.
							</div>
							<div className='level_text'>
								<Countdown date={Date.now() + time * 1000}>
									<span>Time is up!</span>
								</Countdown>
							</div>
							<Input label='Guess Number Game' active />
							<button className='guess_button' role='button'>
								Guess
							</button>
						</>
					)}
					{status == Status.Lost && (
						<button className='guess_button' role='button'>
							Start new game
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
