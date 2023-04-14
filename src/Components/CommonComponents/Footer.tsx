import { Tooltip, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import icon32 from '../../Images/bug_wrench_32px.png'

export default function FixedBottomNavigation() {

	return (
		<Typography
			component={'footer'}
			sx={{
				position: 'fixed',
				bottom: 24,
				left: 0,
				right: 0,
				paddingY: 1,
				borderBottomRadius: 0,
				height: '39px'
			}}
		>
			<Paper sx={{
				position: 'fixed',
				bottom: 24,
				left: 0,
				right: 0,
				paddingY: 1,
				borderBottomRadius: 0,
				boxShadow: '0px -3px 3px -3px rgba(0,0,0,0.2), 0px -3px 4px -3px rgba(0,0,0,0.14), 0px -1px 8px -1px rgba(0,0,0,0.12)'
			}} elevation={3}>
				<a target={'_blank'} href="https://www.flaticon.com/free-icons/fix" rel="noreferrer">
					<Tooltip
						title="Fix icons created by Freepik - Flaticon"
						placement='top'
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
						<img alt='Bug icon' src={icon32} />
					</Tooltip>
				</a>
			</Paper>
			<Paper sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				paddingY: 1,
				borderRadius: 0,
				boxShadow: 'none',
				background: 'linear-gradient(to top, #0E5D77, #fff)',
				height: '8px'
			}} elevation={3}></Paper>
		</Typography>
	)
}
