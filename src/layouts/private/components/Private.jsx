import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes } from "../../../navigation/routes";
import { CustomHeader } from "../../../shared/components";

const Private = () => {
  return (
    <>   
      <CustomHeader /> 
      <div className="pt-20">  
        <Routes>
          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
         
          <Route path="*" element={<Navigate to="/plan-meal" />} />
        </Routes>
      </div>
    </>
  );
};

export default Private;
