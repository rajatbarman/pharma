import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularLoader from 'shared/CircularLoader';
import styles from './FullPageLoader.scss';

const FullPageLoader = function({ backgroundColor }) {
    return (
        <div className={styles.container} style={{backgroundColor}}>
            <CircularLoader
                width={40}
                height={40}
                color="gray"
            />
        </div>
    )
}

export default FullPageLoader;
