import './ant.css';
import {useState, useEffect} from 'react';
import './App.css';
import { Layout, Row, Col, Pagination, Spin, Radio, Select, Button } from 'antd';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import AppHeader from './Header';
import ProductCard from './ProductCard';
import ErrorComponent from './Error';
import GameCard from './GameCard';
import Main from './Main';
import {Routes, Route} from 'react-router-dom';




function App() {

  return (
    <>
        <AppHeader />
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/game/:id" element={<GameCard/>}/>

    </Routes>
    </>

  );
}

export default App;
