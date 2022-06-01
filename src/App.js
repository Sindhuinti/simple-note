import './App.css';

import React, { useState } from 'react';
import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import LandingPage from './components/screens/LandingPage/LandingPage';
import { Route ,BrowserRouter, Routes,useParams } from 'react-router-dom';
import MyNotes from './components/screens/MyNotes/MyNotes';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';
import LoginScreen from './components/screens/LoginScreen/LoginScreen';
import CreateNote from './components/screens/CreateNote/CreateNote';
import SingleNote from './components/screens/SingleNote/SingleNote';
import ProfileScreen from './components/screens/ProfileScreen/ProfileScreen';

const App = () => {

  const {id} = useParams();
  const [search,setSearch]= useState('');
  return (
    
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route  path="/login" element={<LoginScreen/>} />
        <Route  path="/profile" element={<ProfileScreen/>} />
        <Route  path="/register" element={<RegisterScreen/>} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/note/:id" element={<SingleNote />} />
        <Route path="/mynotes" element={<MyNotes search={search}/>} />
        </Routes>
      </main>
    <Footer/>
    </BrowserRouter>
  );
}

export default App
