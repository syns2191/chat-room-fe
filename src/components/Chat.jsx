import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { MessageLeft, MessageRight } from "./Message";
import Paper from '@mui/material/Paper';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import api from "../utils/api";
import { format } from 'date-fns';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import ForumIcon from '@mui/icons-material/Forum';
import {
	createStyles,
	makeStyles
} from '@mui/styles';

const useStyles = makeStyles(() => createStyles({
	paper: {
		height: "91vh",
		minWidth: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		position: "relative",
		marginTop: '42px'
	},
	paper2: {
		width: "80vw",
		maxWidth: "500px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		position: "relative"
	},
	container: {
		width: "100vw",
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	messagesBody: {
		width: "calc( 100% - 20px )",
		margin: 10,
		overflowY: "scroll",
		height: "calc( 100% - 80px )"
	}
}))



export default function Chat() {
	const classes = useStyles()
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const messagesEndRef = useRef(null)

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const [socketUrl, setSocketUrl] = useState('ws://localhost:3000/chats');
	const [messageHistory, setMessageHistory] = useState([]);
	const [unsendMessage, setUnsendMessage] = useState('');
	const [curruntUser, setCurrentUser] = useState({
		username: '',
		roomid: '',
		userid: '',
		room_id: ''
	})



	const { lastMessage, readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
		onClose: () => {
			console.log('connection close')
		},
		onMessage: (ev) => {
			console.log('message send');
		},
		reconnectInterval: 2000,

	});

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	useEffect(() => {
		if (lastJsonMessage !== null && lastJsonMessage.meta === 'send-message') {
			setMessageHistory((prev) => prev.concat(lastJsonMessage.payload));
			scrollToBottom()
		}
	}, [lastMessage, setMessageHistory]);

	const joinRoom = () => {
		const dataUser = localStorage.getItem('token');
		const dataJson = JSON.parse(dataUser);
		if (!curruntUser.username) {
			setCurrentUser({
				username: dataJson.username,
				roomid: dataJson.roomid,
				userid: dataJson.userid,
				room_id: dataJson.room_id
			})
		}

		sendJsonMessage({
			meta: "join",
			room: dataJson.roomid,
			participant: dataUser.username,
			payload: {
				username: dataUser.username,
				type: 'join'
			}
		})
	}

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			joinRoom()
			scrollToBottom()
		}

	}, [readyState])

	useEffect(() => {
		if (curruntUser.roomid) {
			loadHistory();
		}
	}, [curruntUser])

	const loadHistory = async () => {
		const result = await api.get(`/history-chats/${curruntUser.roomid}`);
		if (result.data) {
			setMessageHistory([...messageHistory, ...result.data.map((x) => ({
				message: x.message,
				username: x.userId.username,
				userid: x.userId._id,
				roomid: x.roomId._id,
				date: new Date(x.createdAt)
			}))])
		}
	}

	const typingMessage = (e) => {
		setUnsendMessage(e.target.value);
	}

	const onClickSend = () => {
		sendJsonMessage({
			topic: "room-event",
			meta: "send-message",
			room: curruntUser.roomid,
			payload: {
				message: unsendMessage,
				username: curruntUser.username,
				userid: curruntUser.userid,
				roomid: curruntUser.roomid,
				date: new Date()
			}
		})
		setUnsendMessage('');
	}

	return (
		<>
			<AppBar position="static" style={{ position: 'absolute', zIndex: 1 }} color="secondary">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<ForumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							{curruntUser.room_id}
						</Typography>
						<ForumIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							{curruntUser.room_id}
						</Typography>


						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title={curruntUser.username}>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt={curruntUser.username} src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>

						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<div className={classes.container}>
				<Paper className={classes.paper} elevation={2}>
					<Paper className={classes.messagesBody}>

						{messageHistory.map((x) => {
							if (x.userid === curruntUser.userid) {
								return (
									<MessageRight
										key={x.date}
										message={x.message}
										timestamp={format(new Date(x.date), 'HH:mm')}
										photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
										displayName={x.username}
										avatarDisp={true}
									/>
								)
							}
							return (
								<MessageLeft
									key={x.date}
									message={x.message}
									timestamp={format(new Date(x.date), 'HH:mm')}
									photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
									displayName={x.username}
									avatarDisp={true}
								/>
							)
						})}
						<div ref={messagesEndRef}>-</div>
					</Paper>
					<ChatInput
						data={{ state: readyState, status: ReadyState }}
						onChange={typingMessage}
						onButtonClick={onClickSend}
						value={unsendMessage}
						onKeyDown={(key) => {
							if (key.keyCode === 13) {
								onClickSend()
							}
						}}
					/>
				</Paper>
			</div>
		</>
	);
}
