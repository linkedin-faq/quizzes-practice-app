import React from 'react';
import { InputAdornment, OutlinedInput, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

const CssTextField = withStyles({
    root: {
        borderRadius: '40px',
        background: '#fff'
    }
})(OutlinedInput);

const SearchBar = ({ style, className, type, placeholder, onChangeEvent, value }) => {
    return (
        <CssTextField
            className={className}
            style={style}
            type={type}
            onChange={onChangeEvent}
            placeholder={placeholder}
            value={value}
            variant="outlined"
            startAdornment={
                <InputAdornment position="start">
                    <IconButton style={{ fontSize: '20px', padding: 0 }}>
                        <SearchOutlinedIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default SearchBar;
