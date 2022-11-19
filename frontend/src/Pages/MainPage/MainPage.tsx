import GuessNumberForm from 'Components/GuessNumberForm';
import Header from 'Components/Header';
import Input from 'Components/Input';
import React, { useState } from 'react';

export default function MainPage() {
	return (
		<>
			<div>
				<Header value='Guess Number Game' />
				<GuessNumberForm />
			</div>
		</>
	);
}
