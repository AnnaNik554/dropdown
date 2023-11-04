import { Dropdown } from './Dropdown'
import { langData } from '../data'

function App() {
  return (
    <div>
      <Dropdown data={langData} title='Язык' multiple={true}/>
    </div>
  );
}

export default App;
