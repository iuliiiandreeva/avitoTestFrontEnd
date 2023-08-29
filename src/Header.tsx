// src/Header.tsx
import logo from "./img/logo.webp";
// Header.tsx
import React from 'react';
import { Layout, Menu, Image, Select, Dropdown } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {

  return (
    <Header className="header">
      <div className="logo">
        <Image src={logo} alt="Logo" width={"4.5vh"} />
      </div>
    </Header>
  );
};

export default AppHeader;

