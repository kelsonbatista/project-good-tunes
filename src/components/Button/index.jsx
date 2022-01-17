import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      label,
      id,
      type,
      name,
      dataTestid,
      classElement,
      classDiv,
      disabled,
      param,
      onClick,
    } = this.props;

    return (
      <div className={ classDiv }>
        <button
          id={ id }
          type={ type === 'submit' ? 'submit' : 'button' }
          name={ name }
          className={ classElement }
          data-testid={ dataTestid }
          data-label={ label }
          disabled={ disabled }
          onClick={ param ? (() => onClick(param)) : onClick }
        >
          {label}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  dataTestid: PropTypes.string,
  classElement: PropTypes.string,
  classDiv: PropTypes.string,
  disabled: PropTypes.bool,
  param: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default Button;
