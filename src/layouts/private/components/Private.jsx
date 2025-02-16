import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "../../../navigation/routes";
import { CustomHeader } from "../../../shared/components";

const Private = () => {
  return (
    <>   //grid
      <CustomHeader /> 
      <div className="pt-20">  //grid
        <Routes>
          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Private;
