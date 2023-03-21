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
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DefaultImg from '../../assets/black-panther.jpg';

const STATIC_DATA = [
	{
		post_id: 1,
		title: 'Post-1',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 2,
		title: 'Post-2',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 3,
		title: 'Post-3',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 4,
		title: 'Post-4',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 5,
		title: 'Post-5',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 6,
		title: 'Post-6',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 7,
		title: 'Post-7',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 8,
		title: 'Post-8',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 9,
		title: 'Post-9',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
	{
		post_id: 10,
		title: 'Post-10',
		body: 'im just testing this out, im just testing this out, im just testing this out',
	},
];

export interface IPost {
	title: string;
	body: string;
	post_id: number;
}
const TOAST_TIMER = 3000;
export default function AllPosts() {
	const nav = useNavigate();

	const [error, setError] = useState<string | undefined>(undefined);
	const [rows, setRows] = useState<IPost[]>([...STATIC_DATA]);

	const setErrorMsg = useCallback((error_msg: string) => {
		setError(error_msg);

		setTimeout(() => {
			setError(undefined);
		}, TOAST_TIMER);
	}, []);

	useEffect(() => {
		try {
			(async () => {
				setRows(STATIC_DATA);
			})();
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
											sx={{ maxWidth: 345, background: '#e2faec', padding: 2 }}
										>
											<Box
												display={'flex'}
												justifyContent="center"
												alignItems={'center'}
											>
												<CardMedia
													sx={{ height: 150, width: 150, borderRadius: '50%' }}
													image={DefaultImg}
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
													- By John Doe
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
