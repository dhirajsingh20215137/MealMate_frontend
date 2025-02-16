import loadable from "../../utils/loadable"

const Private = loadable(() => import("./containers/Private"), {
  fallback: null,
});

export default Private;
