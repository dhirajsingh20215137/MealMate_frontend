import loadable from "../../utils/loadable";

const Public = loadable(() => import("./containers/Public"), {
  fallback: null,
});

export default Public;
