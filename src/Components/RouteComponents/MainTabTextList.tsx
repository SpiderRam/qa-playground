import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import LabelIcon from '@mui/icons-material/Label'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { useState } from 'react'
import { Card, Grid, InputAdornment, TextField, Typography } from '@mui/material'

export default function InteractiveList() {
	const [listItems, setListItems] = useState<string[]>([])

	return (
		<Grid
			container
			columns={{ xs: 1, sm: 5, md: 5 }}
		>
			<Grid sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={2} md={2}>
				<TextField
					color='primary'
					fullWidth
					id="listItemField"
					label="Enter list item"
					variant="outlined"
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<>
								<IconButton color='secondary' aria-label="add item">
									<CheckIcon />
								</IconButton>
								<IconButton color='error' aria-label="add item">
									<ClearIcon />
								</IconButton>
							</>
						</InputAdornment>
					}}
				/>
			</Grid>
			<Grid sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={3} md={3}>
				<Card sx={{ padding: '1rem' }}>
					{listItems.length
						? listItems.map((item, index) => {
							return (
								<List>
									<ListItem
										secondaryAction={
											<IconButton color='secondary' edge="end" aria-label="delete">
												<DeleteIcon />
											</IconButton>
										}
									>
										<ListItemAvatar>
											<Avatar sx={{ bgcolor: '#5fa59a' }}>
												<LabelIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={item}
										/>
									</ListItem>
								</List>
							)
						})
						: <Typography component={'p'}>No items added yet</Typography>}
				</Card>
			</Grid>
		</Grid>
	)
}