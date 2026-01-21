import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AllTransactions from "./pages/AllTransactions";
import AddTransaction from "./pages/AddTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<AllTransactions />} />
          <Route path="add-transaction" element={<AddTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
