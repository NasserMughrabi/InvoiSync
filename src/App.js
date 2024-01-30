import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./components/pdf/Main";
import Dash from "./components/dashboard/Dash";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dash />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
// ReactDOM.render(<App />, document.getElementById("root"));

export default App;
