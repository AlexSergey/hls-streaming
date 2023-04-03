import { Dropzone } from './components/dropzone/dropzone.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

export const App = (): JSX.Element => (
  <div style={{ margin: '20px auto', width: '900px' }}>
    <Dropzone />
    <MoviesListComponent />
  </div>
);
