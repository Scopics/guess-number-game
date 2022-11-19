import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	locked?: boolean;
	error?: string;
	label?: string;
}

export default function Input({ value, onChange, ...props }: InputProps) {
	return (
		<div className={'field active'}>
			<input
				id='base_input'
				type='number'
				value={value}
				placeholder={props.label || 'Label'}
				onChange={onChange}
			/>
			<label htmlFor='base_input' className={props.error && 'error'}>
				{props.error || props.label || 'Label'}
			</label>
		</div>
	);
}
