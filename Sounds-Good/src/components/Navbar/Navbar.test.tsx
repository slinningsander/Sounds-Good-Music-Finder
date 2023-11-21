import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './Navbar'

test('Navbar renders correctly', () => {
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  )

  // Check if the Navbar title "Sounds Good" is rendered
  const titleElement = getByText('Sounds Good')
  expect(titleElement).toBeInTheDocument()

  // Check if the "Home" button is rendered
  const homeButton = getByText('Home')
  expect(homeButton).toBeInTheDocument()
})

test('Clicking on the Home button navigates to the correct route', () => {
  const { getByText } = render(
    <Router>
      <Navbar />
    </Router>
  )

  const homeButton = getByText('Home')

  // Simulate a click on the Home button
  fireEvent.click(homeButton)

  // Assert if the URL changes to the expected route (e.g., `/project2/`)
  expect(window.location.pathname).toBe('/project2/')
})
