import loadable from "../../utils/loadable";

const Private = loadable(() => import("./containers/Private"), {
  fallback: <div>Loading...</div>,
});

export default Private;
