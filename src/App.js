import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataComponent } from './Component/ChatBox';
import { Login } from './Component/login';
import { Registration } from './Component/Registration';
import { ImageUploadComponent } from './Component/ImageUpload';
import { ChatComponent } from './Component/Chating';
import {Navbar} from './Component/Navbar';
import { Chat } from './Component/Chat';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
         

          <Route element={<Navbar />}>
            <Route path='/imageUpload' element={<ImageUploadComponent />} />
            <Route path='/chatbox' element={<DataComponent />} />
            <Route path='/chat' element={<ChatComponent />} />
            <Route path='/pointer' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
