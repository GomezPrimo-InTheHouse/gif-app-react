import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import Inputcard from './components/Inputcard'
import Historial from './components/Historial'

function App() {
  const [history, setHistory] = useState([])

  
  return (
    <div className="flex flex-col items-center px-4">
      {/* Paso props al input */}
      <Inputcard history={history} setHistory={setHistory} />

      
      <div className="w-full mt-0 sm:mt-12 md:mt-16 lg:mt-20">
        <Historial history={history} />
      </div>
    </div>
  );

}

export default App
