import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone'
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone'
import { Link } from 'react-router-dom'
import InfoSnack from './InfoSnack'
import icon16 from '../../Images/bug_wrench_16px.png'
import { mobilePages, pages } from '../../Data/NavRoutes'

const snackMessage = () => {
  return (
    <div>
      Items marked with the
      <Typography
        component='span'
        sx={{
          backgroundColor: '#fff',
          padding: '3px 6px 1px',
          borderRadius: '50px',
          marginX: '1ch',
        }}
      >
        <img src={icon16} alt='small bug icon' />
      </Typography>
      icon describe expected page behaviors, for possible test scenarios.
    </div>
  )
}

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='relative' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* standard view */}
          <DesktopWindowsTwoToneIcon data-testid='navDesktopIcon' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='span'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              fontSize: '1.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link data-testid='desktopNavLinkToHome' to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              E2E
            </Link>
          </Typography>

          {/* Mobile view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              data-testid='navMobileMenuIconButton'
              size='large'
              aria-label='app route options'
              aria-controls='navMobileMenuPopup'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='navMobileMenuPopup'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mobilePages.map(page => (
                <MenuItem data-testid={`navMobileMenuItem_${page.title}`} key={page.title} onClick={handleCloseNavMenu}>
                  <Link to={page.route} style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.87)' }}>
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <PhoneIphoneTwoToneIcon data-testid='navMobileIcon' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='span'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link data-testid='mobileNavLinkToHome' to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
              E2E
            </Link>
          </Typography>

          {/* Standard view */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Link
                data-testid={`navBarLink_${page.title}`}
                key={page.title}
                to={page.route}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                  }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <InfoSnack
              buttonId='navBarInfoButton'
              message={snackMessage()}
              iconButtonClasses={{ root: 'colorUnset' }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
