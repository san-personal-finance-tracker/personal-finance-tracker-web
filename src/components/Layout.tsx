import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="layout-container">
      <header
        className="flex justify-content-between align-items-center px-4 py-3 border-bottom-1 surface-border"
        style={{ height: "60px", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="font-bold text-xl text-900">Finance Tracker</div>
        <div className="flex align-items-center gap-4">
          <Button
            label="Dashboard"
            link
            className={
              location.pathname === "/" ? "text-primary font-bold" : "text-600"
            }
            onClick={() => navigate("/")}
          />
          <Button
            label="All Transactions"
            link
            className={
              location.pathname === "/transactions"
                ? "text-primary font-bold"
                : "text-600"
            }
            onClick={() => navigate("/transactions")}
          />
          <Button
            label="Add Transaction"
            onClick={() => navigate("/add-transaction")}
          />
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
