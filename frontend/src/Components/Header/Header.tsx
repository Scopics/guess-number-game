import React, { useState } from 'react';
import './Header.css';

export interface HeaderProps {
	value: string;
}

export default function Header({ value }: HeaderProps) {
	return (
		<header className='header'>
			<div className='container'>
				<div className='header_inner'>
					<div className='header_logo' data-scroll='#intro'>
						{value}
					</div>
				</div>
			</div>
		</header>
	);
}
