import loadable from "../../utils/loadable";

const Public = loadable(() => import("./containers/Public"), {
  fallback: <div>Loading...</div>,
});

export default Public;
