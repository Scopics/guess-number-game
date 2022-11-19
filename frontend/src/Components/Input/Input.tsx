import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	locked?: boolean;
	error?: string;
	label?: string;
}

type StateType = {
	active: boolean;
	value: string;
	error: string;
	label: string;
};

export default function Input({ value, onChange, ...props }: InputProps) {
	const [label, setLabel] = useState(props.label || 'Label');
	const [error, setError] = useState(props.error || '');

	return (
		<div className={'field active'}>
			<input id='base_input' type='number' value={value} placeholder={label} onChange={onChange} />
			<label htmlFor='base_input' className={error && 'error'}>
				{error || label}
			</label>
		</div>
	);
}
