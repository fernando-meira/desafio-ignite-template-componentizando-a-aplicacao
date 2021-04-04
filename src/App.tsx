import './styles/global.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { MoviesProvider } from './hooks/MoviesContext';

export function App() {
  return (
    <MoviesProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Content />
      </div>
    </MoviesProvider>
  )
}