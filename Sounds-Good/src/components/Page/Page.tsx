import styles from './Page.module.css'
import { Children } from '../../types.ts'

type PageProps = {
  children?: Children
}
export function Page({ children }: PageProps) {
  return <div className={styles.page}>{children}</div>
}
export default Page
