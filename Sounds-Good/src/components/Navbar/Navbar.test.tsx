import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

test('renders Navbar component', () => {
  render(
    <Router>
      <Navbar />
    </Router>
  )

  const navbarElement = screen.getByText('Sounds Good')
  expect(navbarElement).toBeInTheDocument()

  const homeButton = screen.getByText('Home')
  expect(homeButton).toBeInTheDocument()
})
