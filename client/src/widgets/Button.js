import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import CircularLoader from 'shared/CircularLoader';
import styles from './Button.scss';

export default class Button extends Component {
    static propTypes = {
        onClick: PropTypes.func,

        children: PropTypes.node,

        className: PropTypes.string,

        label: PropTypes.string,

        disabledClassName: PropTypes.string,

        disabled: PropTypes.bool,

        loading: PropTypes.bool,

        loaderClassName: PropTypes.string,

        loader: PropTypes.node,
    };

    handleButtonClick = event => {
        const { onClick, loading, disabled } = this.props;

        if (loading || disabled)
            return;

        onClick && onClick({
            event,
        });
    };

    renderChildren = () => {
        const { loader, loading, label, children, loaderClassName } = this.props;

        if (loading) {
            return loader ? loader : <CircularLoader className={loaderClassName} />
        }
        else if (label)
            return label;
        else
            return children;

    };

    render() {
        const {
            className,
            disabled,
            disabledClassName,
            loading,
        } = this.props;

        const _className = cx(
            className,
            styles.button,
            styles.shadow,
            {
                [styles.disabled]: disabled,
                [disabledClassName]: disabled,
                [styles.loading]: loading,
            },
        );

        return (
            <div
                onClick={this.handleButtonClick}
                className={_className}
            >
                {
                    this.renderChildren()
                }
            </div>
        );
    }
}
