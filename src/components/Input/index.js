/**
 *
 * Input
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Input } from './styles';

function InputComponent({
  value,
  onChange,
  fullWidth,
  placeholder,
  type,
  width,
  ...restProps
}) {
  return (
    <Input
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      placeholder={placeholder}
      type={type}
      width={width}
      {...restProps}
    />
  );
}

InputComponent.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
};

InputComponent.defaultProps = {
  value: '',
  onChange: () => {},
  fullWidth: true,
  placeholder: '',
  type: 'text',
  width: '180px',
};

export default memo(InputComponent);
