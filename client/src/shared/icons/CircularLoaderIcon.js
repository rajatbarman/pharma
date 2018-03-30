import React from 'react';
import Icon from './IconBase.js';

const CircularLoader = props => (
    <Icon viewBox="0 0 34 34" {...props}>
        <path d="M17 32c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C8.716 2 2 8.716 2 17" stroke="currentColor" fill="none" strokeWidth="3" fillRule="evenodd"></path>
    </Icon>
);

export default CircularLoader;
