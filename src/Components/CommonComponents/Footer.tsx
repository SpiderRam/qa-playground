import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function FixedBottomNavigation() {

	return (
		<Box>
			<Paper sx={{
				position: 'fixed',
				bottom: 24,
				left: 0,
				right: 0,
				paddingY: 1,
				borderBottomRadius: 0,
			}} elevation={3}>
				<a target={'_blank'} href="https://www.flaticon.com/free-icons/fix" rel="noreferrer">
					<Tooltip
						title="Fix icons created by Freepik - Flaticon"
						componentsProps={{
							tooltip: {
								sx: {
									bgcolor: '#0E5D77',
									'& .MuiTooltip-arrow': {
										color: '#0E5D77',
									},
								},
							},
						}}
					>
						<img alt='Bug icon' src={process.env.PUBLIC_URL + '/bug_wrench_32px.png'} />
					</Tooltip>
				</a>
			</Paper>
			<Paper sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				paddingY: 1,
				borderTopRadius: 0,
				borderBottomRadius: 0,
				boxShadow: 'none',
				background: 'linear-gradient(to top, #0E5D77, #fff)',
				height: '8px'
			}} elevation={3}></Paper>
		</Box>
	)
}
