import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
<<<<<<< HEAD
=======
  base: "/fdert22/",
>>>>>>> b96d286 (fix: resolve @ alias and vite config)
  plugins: [react(), tsconfigPaths()],
});
