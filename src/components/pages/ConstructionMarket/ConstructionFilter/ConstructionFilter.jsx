import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

const Wrapper = styled.div`
  width: 90%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  & > span {
    font-weight: 600;
    font-size: 1.08rem;
  }
`;

const styles = theme => ({
  formControl: {
    minWidth: 120,
    width: '100%'
  },
});

class ConstructionFilter extends React.Component {
  state = {
    textValue: '',
    selectValue: ''
  }
  handleChange = (e) => {
    const id = e.target.id || e.target.name;
    const value = e.target.value;
    this.setState({
      [id]: value,
      selectValue: value,
      textValue: value,
    }, () => {
      this.props.handleChange({id: id, value: value});
    })
  }
  render() {
    const { name, type, options, displayName, classes } = this.props;
    const { textValue, selectValue } = this.state;
    return(
      <Wrapper>
        <InputWrapper>
          {
            type.toLowerCase() === "select" ? (
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor={name}>{displayName}</InputLabel>
                <Select
                  fullWidth
                  value={selectValue}
                  onChange={this.handleChange}
                  inputProps={{
                    name: {name},
                    id: {name},
                  }}
                >
                  {
                    options.map(opt => (
                      <MenuItem value={opt.value}>{opt.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              // <select id={name} value={selectValue} onChange={this.handleChange}>
              //   {
              //     options.map(opt => (
              //       <option value={opt.value}>{opt.name}</option>
              //     ))
              //   }
              // </select>
            ) : (
              <input id={name} type="text" value={textValue} onChange={this.handleChange} />
            )
          }
        </InputWrapper>
      </Wrapper>
    )
  }
}

export default withStyles(styles)(ConstructionFilter);