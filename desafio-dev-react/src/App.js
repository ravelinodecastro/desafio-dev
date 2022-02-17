import logo from './logo.svg';
import './assets/css/app.css';
import CustomTable from './components/CustomTable'
import FileForm from './components/FileForm'

function App() {
  return (

    <div className="App">
      <FileForm />
      <CustomTable />
    </div>
  );
}

export default App;
