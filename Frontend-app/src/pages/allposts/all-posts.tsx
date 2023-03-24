import {
	Alert,
	AlertTitle,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DefaultImg from '../../assets/black-panther.jpg';

interface IPost {
	title: string;
	body: string;
	post_id: number;
	users: any;
}
const TOAST_TIMER = 3000;
export default function AllPosts() {
	const nav = useNavigate();

	const [error, setError] = useState<string | undefined>(undefined);
	const [rows, setRows] = useState<IPost[]>([]);

	const setErrorMsg = useCallback((error_msg: string) => {
		setError(error_msg);

		setTimeout(() => {
			setError(undefined);
		}, TOAST_TIMER);
	}, []);

	const getAllPosts = useCallback(async () => {
		const { posts }: any = await axios.get('/app/post/all');
		setRows(posts);
	}, []);

	useEffect(() => {
		try {
			getAllPosts();
		} catch (e) {
			setErrorMsg('Failed to load posts, please reload the page');
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
					{rows.length === 0 && (
						<Typography variant="h3" color="Highlight">
							{' '}
							loading data please wait...!
						</Typography>
					)}
					{rows.length > 0 && (
						<Grid container spacing={2} pt={5}>
							{rows.map((row) => {
								return (
									<Grid key={row.post_id} item xs={4}>
										<Card
											sx={{
												maxWidth: 345,
												height: 350,
												background: '#e2faec',
												padding: 2,
											}}
										>
											<Box
												display={'flex'}
												justifyContent="center"
												alignItems={'center'}
											>
												<CardMedia
													sx={{ height: 150, width: 150, borderRadius: '50%' }}
													image={
														row?.users?.profile_pic
															? `${import.meta.env.VITE_ASSETS_URL}/${
																	row?.users?.profile_pic
															  }`
															: DefaultImg
													}
													title="green iguana"
												/>
											</Box>
											<CardContent>
												<Typography gutterBottom variant="h6" component="p">
													{row.title}
												</Typography>

												<Typography variant="body2" color="text.secondary">
													{row.body}
												</Typography>
												<Typography
													gutterBottom
													variant="caption"
													component="p"
													align="right"
													pt={1}
												>
													- By {row?.users?.first_name} {row?.users?.last_name}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								);
							})}
						</Grid>
					)}
				</Container>
			</Box>

			{error && (
				<Alert severity="error">
					<AlertTitle>Error</AlertTitle>
					{error}
				</Alert>
			)}
		</>
	);
}
