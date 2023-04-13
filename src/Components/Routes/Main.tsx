import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MainTabTextList from '../RouteComponents/MainTabTextList'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Typography>{children}</Typography>
			)}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export default function Main() {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{
			marginX: '2rem'
		}}>
			<Typography variant='h1' sx={{ marginY: '1rem' }}>QA Playground</Typography>
			<Typography variant='h2'>Tabs should scroll on small screens</Typography>
			<Box sx={{ width: '100%', marginTop: '1rem' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs variant='scrollable' value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab data-test-class='mainTabButton' label="Text Field & List" {...a11yProps(0)} />
						<Tab data-test-class='mainTabButton' label="Date Picker" {...a11yProps(1)} />
						<Tab data-test-class='mainTabButton' label="MultiSelect" {...a11yProps(2)} />
						<Tab data-test-class='mainTabButton' label="Form" {...a11yProps(3)} />
						<Tab data-test-class='mainTabButton' label="Data Grid" {...a11yProps(4)} />
						<Tab data-test-class='mainTabButton' label="Dashboard" {...a11yProps(5)} />
						<Tab data-test-class='mainTabButton' label="Swiper" {...a11yProps(6)} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<MainTabTextList />
				</TabPanel>
				<TabPanel value={value} index={1}>
					Date Picker (TODO)
				</TabPanel>
				<TabPanel value={value} index={2}>
					MultiSelect (TODO)
				</TabPanel>
				<TabPanel value={value} index={3}>
					Form (TODO)
				</TabPanel>
				<TabPanel value={value} index={4}>
					Data Grid (TODO)
				</TabPanel>
				<TabPanel value={value} index={5}>
					Dashboard (TODO)
				</TabPanel>
				<TabPanel value={value} index={6}>
					Swiper (TODO)
				</TabPanel>
			</Box>
		</Box>
	)
}
