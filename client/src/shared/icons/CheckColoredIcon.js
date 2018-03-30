import React from 'react';
import Icon from './IconBase.js';

const CheckColored = props => (
    <Icon viewBox="0 0 30 30" {...props}>
        <g fill="none" fillRule="evenodd"><circle fill="#4CAF79" cx="15" cy="15" r="15"></circle><path d="M3 3h24v24H3z"></path><path d="M21.838 12.267l-7.555 7.348c-.218.212-.647.385-.955.385h-.653c-.308 0-.737-.174-.955-.385l-3.557-3.468a.535.535 0 0 1 0-.77l1.4-1.358a.574.574 0 0 1 .793 0l2.273 2.2a.574.574 0 0 0 .792 0l6.23-6.06a.575.575 0 0 1 .792-.002l1.393 1.342c.218.211.219.556.002.768z" fill="#FFF"></path></g>
    </Icon>
);

export default CheckColored;