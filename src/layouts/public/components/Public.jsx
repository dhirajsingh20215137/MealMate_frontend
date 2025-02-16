import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "../../../navigation/routes";
import { CustomHeader } from "../../../shared/components";

const Public = () => {
  return (
    <>
      <CustomHeader />  
      <div className="pt-20"> 
        <Routes>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Public;
