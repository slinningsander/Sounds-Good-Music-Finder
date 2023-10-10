import './Page.css'
import { Children } from '../../types.ts'

type PageProps = {
  children?: Children
}
export function Page({ children }: PageProps) {
  return <div className="page">{children}</div>
}
export default Page
