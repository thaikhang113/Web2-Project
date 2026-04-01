import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { useAuthStore } from "./hooks/useAuthStore.js";
import { AppRoutes } from "./routes/AppRoutes.jsx";

function App() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
