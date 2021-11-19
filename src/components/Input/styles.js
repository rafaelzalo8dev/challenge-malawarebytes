import styled from 'styled-components';

export const Input = styled.input`
  width: ${props => (props.fullWidth ? '100%' : props.width)};
  border: none;
  border: 1px solid #d3d0d0;
  border-radius: 4px;
  padding: 14px 16px;
  outline: none;
  margin: 10px 0;
`;
