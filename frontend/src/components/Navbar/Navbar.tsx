import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <AppBar sx={{ backgroundColor: '#5C469C' }}>
      <Container maxWidth="xl">
        <Toolbar data-cy="Navbar">
          <Typography
            variant="h1"
            noWrap
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '2rem',
            }}
          >
            Sounds Good
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              onClick={() => navigate(`/project2/`)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
