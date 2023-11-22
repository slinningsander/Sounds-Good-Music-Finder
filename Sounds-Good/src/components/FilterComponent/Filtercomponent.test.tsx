import { render } from '@testing-library/react'
import { FilterComponent } from './FilterComponent'

describe('FilterComponent', () => {
  test('renders FilterComponent without crashing', () => {
    render(<FilterComponent />)
  })
})
