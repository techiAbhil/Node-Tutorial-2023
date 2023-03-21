import {
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
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Dashboard() {
	const nav = useNavigate();
	const [rows, setRows] = useState<
		{
			title: string;
			body: string;
			post_id: number;
		}[]
	>([]);

	return (
		<>
			{/* Hero unit */}
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}
			>
				<Container>
					{rows.length === 0 && (
						<Typography variant="h3" color="Highlight">
							{' '}
							You have been successfully logged in...!
						</Typography>
					)}
					{rows.length > 0 && (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="right">Post ID</TableCell>
										<TableCell align="right">Title</TableCell>
										<TableCell align="right">Body</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.post_id}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.title}
											</TableCell>
											<TableCell align="right">{row.body}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Container>
			</Box>
		</>
	);
}
