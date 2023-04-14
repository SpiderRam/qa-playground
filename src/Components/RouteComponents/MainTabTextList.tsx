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
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Card, Grid, InputAdornment, TextField, Typography } from '@mui/material'

export default function InteractiveList() {
	const textFieldRef = useRef<HTMLInputElement>()
	const [listItems, setListItems] = useState<string[]>([])
	const [enteredItemValue, setEnteredItemValue] = useState<string>('')
	const [disableButtons, setDisableButtons] = useState(true)

	useEffect(() => {
		if(enteredItemValue) {
			setDisableButtons(false)
		} else {
			setDisableButtons(true)
		}
	}, [enteredItemValue])

	const removeItem = (index: number) => {
		setListItems([
			...listItems.slice(0, index),
			...listItems.slice(index + 1, listItems.length)
		])
	}

	return (
		<Grid
			container
			columns={{ xs: 1, sm: 5, md: 5 }}
		>
			<Grid
				item={true}
				sx={{ paddingX: '1vw', paddingY: '2rem' }}
				xs={1}
				sm={2}
				md={2}
			>
				<TextField
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setEnteredItemValue(event.target.value)
					}}
					inputRef={textFieldRef}
					value={enteredItemValue}
					color='primary'
					fullWidth
					id="listItemField"
					label="Enter list item"
					variant="outlined"
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<>
								<IconButton
									disabled={disableButtons}
									color='secondary'
									aria-label="add item"
									onClick={() => {
										setListItems([enteredItemValue, ...listItems])
										setEnteredItemValue('')
										if(textFieldRef && textFieldRef.current) {
											textFieldRef.current.focus()
										}
									}}
								>
									<CheckIcon />
								</IconButton>
								<IconButton
									disabled={disableButtons}
									color='error'
									aria-label="clear field"
									onClick={() => {
										setEnteredItemValue('')
										if(textFieldRef && textFieldRef.current) {
											textFieldRef.current.focus()
										}
									}}
								>
									<ClearIcon />
								</IconButton>
							</>
						</InputAdornment>
					}}
				/>
			</Grid>
			<Grid item={true} sx={{ paddingX: '1vw', paddingY: '2rem' }} xs={1} sm={3} md={3}>
				<Card sx={{ padding: '1rem' }}>
					{listItems.length
						? <List>
							{listItems.map((item, index) => {
								return (
									<ListItem
										key={index}
										secondaryAction={
											<IconButton
												color='secondary'
												edge="end"
												aria-label="delete"
												onClick={() => { removeItem(index) }}
											>
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
								)
							})}
						</List>
						: <Typography component={'p'}>No items added yet</Typography>}
				</Card>
			</Grid>
		</Grid>
	)
}