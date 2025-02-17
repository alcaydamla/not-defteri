import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd"; 
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "antd/dist/reset.css"; 

import { useAuthContext } from "./hooks/useAuthContext";

const { Content } = Layout; 

function App() {
  const { kullanici } = useAuthContext();

  return (
    <Layout style={{ minHeight: "100vh" }}> 
      <BrowserRouter>
        <Navbar />
        <Content style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
          <Routes>
            <Route path="/" element={kullanici ? <Home /> : <Navigate to="login" />} />
            <Route path="/login" element={!kullanici ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!kullanici ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
