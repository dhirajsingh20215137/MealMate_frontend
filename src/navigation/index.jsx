import { useAuth } from "../auth";
import Public from "../layouts/public/loadable";
import Private from "../layouts/private/loadable";

const Navigation = () => {
  const { token } = useAuth();

  return token ? <Private /> : <Public />;
};

export default Navigation;
