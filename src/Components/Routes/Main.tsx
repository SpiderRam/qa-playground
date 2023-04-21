import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MainTabTextList from '../RouteComponents/MainTabTextList'
import icon16 from '../../Images/bug_wrench_16px.png'
import { Drawer, IconButton } from '@mui/material'
import behaviors from '../../Data/Behaviors'
import { ReactNode, useState, SyntheticEvent, Fragment } from 'react'
import BehaviorsList from '../CommonComponents/BehaviorsList'

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

const BehaviorLists = [
  behaviors.mainTabTextFieldAndList,
  behaviors.mainTabDates,
  behaviors.mainTabMultiSelect,
  behaviors.mainTabForm,
  behaviors.mainTabDataGrid,
  behaviors.mainTabDashboard,
  behaviors.mainTabSwiper,
]

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`mainTabPanel_${index}`}
      aria-labelledby={`mainTab_${index}`}
      {...other}
    >
      {value === index && <Typography component={'div'}>{children}</Typography>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `mainTab_${index}`,
    'aria-controls': `mainTabPanel_${index}`,
  }
}

export default function Main() {
  const [tabIndex, setTabIndex] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activePulse, setActivePulse] = useState(true)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }

  return (
    <Box
      sx={{
        marginX: '2rem',
      }}
    >
      <Typography variant='h1'>Interactive Components</Typography>
      <Typography variant='h3' sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={icon16} alt='test behavior list bullet' /> Tabs should scroll on small screens
      </Typography>
      <Box
        sx={{
          width: '100%',
          marginY: '1rem',
          marginX: 'auto',
          maxWidth: '1200px',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            variant='scrollable'
            value={tabIndex}
            onChange={handleChange}
            aria-label='Interactive component type tabs'
          >
            <Tab data-test-class='mainTabButton' label='Text Field & List' {...a11yProps(0)} />
            <Tab data-test-class='mainTabButton' label='Date Picker' {...a11yProps(1)} />
            <Tab data-test-class='mainTabButton' label='MultiSelect' {...a11yProps(2)} />
            <Tab data-test-class='mainTabButton' label='Form' {...a11yProps(3)} />
            <Tab data-test-class='mainTabButton' label='Data Grid' {...a11yProps(4)} />
            <Tab data-test-class='mainTabButton' label='Dashboard' {...a11yProps(5)} />
            <Tab data-test-class='mainTabButton' label='Swiper' {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <MainTabTextList />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          Date Picker (TODO)
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          MultiSelect (TODO)
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          Form (TODO)
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          Data Grid (TODO)
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          Dashboard (TODO)
        </TabPanel>
        <TabPanel value={tabIndex} index={6}>
          Swiper (TODO)
        </TabPanel>
      </Box>

      {/* Mobile drawer */}
      <IconButton
        className={activePulse ? 'pulseIconButton' : undefined}
        aria-label='open behaviors drawer'
        onClick={() => {
          setOpenDrawer(true)
          setActivePulse(false)
        }}
        sx={{
          position: 'absolute',
          bottom: '90px',
          right: '10px',
          backgroundColor: '#fff',
          padding: '3px 4px 4px',
          borderRadius: '50px',
          display: { xs: 'flex', md: 'none' },
          minWidth: 'unset',
        }}
      >
        <img src={icon16} alt='small bug icon' />
      </IconButton>
      <Fragment>
        <Drawer
          anchor={'left'}
          open={openDrawer}
          onClose={toggleDrawer(false)}
          PaperProps={{
            style: {
              width: window.innerWidth * 0.85,
              paddingTop: '4.5rem',
              paddingRight: '1rem',
            },
          }}
        >
          {<BehaviorsList idPrefix='mainTextFieldTab' items={BehaviorLists[tabIndex]}></BehaviorsList>}
        </Drawer>
      </Fragment>
    </Box>
  )
}
