import { useState } from 'react'

import './App.css'


import Inputcard from './components/Inputcard'
import Historial from './components/Historial'

function App() {
  const [history, setHistory] = useState([])

  
  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center " 
    style={{ backgroundImage: "url('/gif-back/art.gif')" }}
    >
      
      <Inputcard history={history} setHistory={setHistory} />

      
      <div className="w-full mt-0 sm:mt-12 md:mt-16 lg:mt-20">
        <Historial history={history} />
      </div>
    </div>
  );

}

export default App
