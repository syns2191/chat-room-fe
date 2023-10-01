import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
// import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const theme = createTheme();

const useStyles = makeStyles(() =>
  createStyles({
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      minHeight: "30px",
      minWidth: "150px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: theme.palette.primary.main,
      width: "60%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: "10px",
      color: '#fff',
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `15px solid ${theme.palette.primary.main}`,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `17px solid ${theme.palette.primary.main}`,
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
      }
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      minHeight: "30px",
      padding: "10px",
      backgroundColor: theme.palette.secondary.main,
      width: "60%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
      color: '#fff',
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `15px solid ${theme.palette.secondary.main}`,
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: `17px solid ${theme.palette.secondary.main}`,
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px"
      }
    },

    messageContent: {
      padding: 0,
      margin: 0,
      wordWrap: 'break-word'
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-1px",
      right: "5px"
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px",
      fontSize: '11px',
      fontWeight: 'bold',
      left: '-24px',
      top: '-8px',
      position: 'relative'
    }
  })
);

export const MessageLeft = (props) => {
  const message = props.message ? props.message : 'no message';
  const timestamp = props.timestamp ? props.timestamp : '';
  const displayName = props.displayName ? props.displayName : ''
 
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
          <div className={classes.messageBlue}>
            <div className={classes.displayName}>{`@${displayName}`}</div>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
      </div>
    </>
  );
};

MessageLeft.propTypes = {
    message: PropTypes.string,
    timestamp: PropTypes.string,
    displayName: PropTypes.string
}

export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};

MessageRight.propTypes = {
    message: PropTypes.string,
    timestamp: PropTypes.string
}
