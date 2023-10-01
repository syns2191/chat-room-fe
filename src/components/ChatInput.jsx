import React from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import {
    createStyles,
    makeStyles
} from '@mui/styles';
const theme = createTheme();
const useStyles = makeStyles(() => createStyles({
    wrapForm : {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        position: 'absolute',
        bottom: '4px'
    },
    wrapText  : {
        width: "100%"
    },
    button: {
        margin: theme.spacing(1),
    },
}))


export const ChatInput = ({ data, onChange, onButtonClick, value, onKeyDown }) => {
    const classes = useStyles();
    return (
        <>
            <FormControl  className={classes.wrapForm}>
                <OutlinedInput
                    id="filled-adornment-password"
                    type='text'
                    placeholder='Send Text'
                    onChange={onChange}
                    value={value}
                    onKeyDown={onKeyDown}
                    disabled={data.state !== data.status.OPEN}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            color='secondary'
                            aria-label="toggle password visibility"
                            onClick={onButtonClick}
                            edge="end"
                            >
                            <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    )
}

ChatInput.propTypes = {
    data: PropTypes.any,
    onChange: PropTypes.func,
    onButtonClick: PropTypes.func,
    value: PropTypes.string,
    onKeyDown: PropTypes.func
}



