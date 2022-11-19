import React from 'react';
import './Input.css';

export interface InputProps {
	locked?: boolean;
	active?: boolean;
	predicted?: string;
	value?: string;
	error?: string;
	label?: string;
}

type StateType = {
	active: boolean;
	value: string;
	error: string;
	label: string;
};

export default class Input extends React.Component<InputProps, StateType> {
	constructor(props: InputProps) {
		super(props);

		this.state = {
			active: (props.locked && props.active) || false,
			value: props.value || '',
			error: props.error || '',
			label: props.label || 'Label',
		};
	}

	changeValue(event: React.FormEvent<HTMLInputElement>) {
		const value = event.currentTarget.value;
		this.setState({ value, error: '' });
	}

	render() {
		const { active, value, error, label } = this.state;

		return (
			<div className={'field active'}>
				<input
					id={'base_input'}
					type='text'
					value={value}
					placeholder={label}
					onChange={this.changeValue.bind(this)}
					onFocus={() => active && this.setState({ active: true })}
					onBlur={() => active && this.setState({ active: false })}
				/>
				<label htmlFor={'base_input'} className={error && 'error'}>
					{error || label}
				</label>
			</div>
		);
	}
}
