import { Bell, Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'

export default function AdminHeader({ title, onMenu }) {
  const navigate = useNavigate(); const { cases } = useDemo()
  const observed = cases.filter((item) => item.status === 'OBSERVED').length
  const search = (event) => { if (event.key === 'Enter' && event.currentTarget.value.trim()) navigate('/admin/expedientes?q=' + encodeURIComponent(event.currentTarget.value.trim())) }
  return <header className="admin-header"><div className="header-title"><button className="icon-button menu-button" onClick={onMenu} aria-label="Abrir navegación"><Menu /></button><div><span>Oficina de Asesoría Jurídica</span><h1>{title}</h1></div></div><div className="header-tools"><label className="global-search"><Search aria-hidden="true" /><span className="sr-only">Buscar expediente</span><input placeholder="Buscar expediente o DNI" onKeyDown={search} /></label><button className="icon-button" aria-label={observed + ' observaciones pendientes'} title={observed + ' observaciones pendientes'}><Bell /><b>{observed}</b></button></div></header>
}
