import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const {
      label,
      id,
      type,
      name,
      dataTestid,
      classElement,
      classDiv,
      maxLength,
      placeholder,
      disabled,
      checked,
      value,
      required,
      onChange,
    } = this.props;

    return (
      <div className={ classDiv }>
        <label htmlFor={ id } data-testid={ dataTestid }>
          {label}
        </label>
        <input
          id={ id }
          type={ type }
          name={ name }
          className={ classElement }
          data-testid={ dataTestid }
          data-label={ label }
          maxLength={ maxLength }
          placeholder={ placeholder }
          disabled={ disabled }
          checked={ checked }
          value={ value }
          required={ required }
          onChange={ onChange }
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  dataTestid: PropTypes.string,
  classElement: PropTypes.string,
  classDiv: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  value: PropTypes.string,
  required: PropTypes.bool,
}.isRequired;

export default Input;
