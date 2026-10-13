import { Outlet } from 'react-router-dom'
import PublicFooter from '../components/layout/PublicFooter'
import PublicNavbar from '../components/layout/PublicNavbar'

export default function PublicLayout() {
  return <div className="min-h-screen bg-white"><PublicNavbar /><main><Outlet /></main><PublicFooter /></div>
}
