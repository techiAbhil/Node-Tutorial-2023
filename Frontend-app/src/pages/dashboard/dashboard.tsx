import {
	Alert,
	AlertTitle,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AddPost from './add-post';
import DeletePost from './delete-post';

export interface IPost {
	title: string;
	body: string;
	post_id: number;
}
const TOAST_TIMER = 3000;
export default function Dashboard() {
	const nav = useNavigate();
	const [openAddPost, setOpenAddPost] = useState<boolean>(false);
	const [updatePost, setUpdatePost] = useState<IPost | null>(null);
	const [deletePost, setDeletePost] = useState<IPost | null>(null);

	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);

	const [rows, setRows] = useState<IPost[]>([]);

	const getPostsForUser = useCallback(async () => {
		const { posts }: any = await axios.get('/app/post');
		if (Array.isArray(posts)) setRows(posts);
	}, []);

	useEffect(() => {
		getPostsForUser();
	}, []);

	const setErrorMsg = useCallback((error_msg: string) => {
		setError(error_msg);

		setTimeout(() => {
			setError(undefined);
		}, TOAST_TIMER);
	}, []);

	const setSuccessMsg = useCallback((success_msg: string) => {
		setSuccess(success_msg);

		setTimeout(() => {
			setSuccess(undefined);
		}, TOAST_TIMER);
	}, []);

	const addPostResponseHandler = useCallback((isSUccess: boolean) => {
		if (isSUccess) {
			getPostsForUser();
			setOpenAddPost(false);
			setSuccessMsg('Post has been successfully added...!');
		} else {
			setErrorMsg('Something went wrong while adding post...!');
		}
	}, []);

	const updatePostHandler = useCallback((isSUccess: boolean) => {
		if (isSUccess) {
			getPostsForUser();
			setUpdatePost(null);
			setSuccessMsg('Post has been successfully updated...!');
		} else {
			setErrorMsg('Something went wrong while updating post...!');
		}
	}, []);

	const deletePostHandler = useCallback((isSUccess: boolean) => {
		if (isSUccess) {
			getPostsForUser();
			setDeletePost(null);
			setSuccessMsg('Post has been successfully deleted...!');
		} else {
			setErrorMsg('Something went wrong while deleting post...!');
		}
	}, []);
	return (
		<>
			{/* Hero unit */}
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 2,
					pb: 6,
				}}
			>
				<Container>
					{error && (
						<Alert severity="error">
							<AlertTitle>Error</AlertTitle>
							{error}
						</Alert>
					)}

					{success && (
						<Alert severity="success">
							<AlertTitle>Success</AlertTitle>
							{success}
						</Alert>
					)}
					<Box
						py={1.5}
						display="flex"
						justifyContent={'end'}
						alignItems="center"
					>
						<Button
							variant="contained"
							color="success"
							onClick={() => setOpenAddPost(true)}
						>
							Add a Post
						</Button>
					</Box>
					{rows.length === 0 && (
						<Typography variant="h3" color="Highlight">
							{' '}
							You have been successfully logged in...!
						</Typography>
					)}
					{rows.length > 0 && (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead
									sx={{
										background: '#ccc',
									}}
								>
									<TableRow>
										<TableCell>Post ID</TableCell>
										<TableCell align="center">Title</TableCell>
										<TableCell align="center">Body</TableCell>
										<TableCell align="center">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.post_id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.post_id}
											</TableCell>
											<TableCell align="center" component="th" scope="row">
												{row.title}
											</TableCell>
											<TableCell align="center">{row.body}</TableCell>
											<TableCell align="center">
												<Button
													color="primary"
													onClick={() => setUpdatePost(row)}
												>
													Update
												</Button>
												<Button
													color="error"
													onClick={() => setDeletePost(row)}
												>
													Delete
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Container>
			</Box>

			<AddPost
				open={openAddPost}
				handleClose={() => {
					setOpenAddPost(false);
				}}
				submitResponseHandler={addPostResponseHandler}
				post={null}
			/>

			<AddPost
				open={!!updatePost}
				handleClose={() => {
					setUpdatePost(null);
				}}
				submitResponseHandler={updatePostHandler}
				post={updatePost}
			/>

			<DeletePost
				open={!!deletePost}
				handleClose={() => setDeletePost(null)}
				submitResponseHandler={deletePostHandler}
				post={deletePost}
			/>
		</>
	);
}
