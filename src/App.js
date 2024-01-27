import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Upload from "./components/pdf/Upload";
import Viewer from "./components/pdf/Viewer";
import Main from "./components/pdf/Main";
import Dash from "./components/dashboard/Dash";
import Logo from "./components/Logo";

function App() {
  return (
    <ChakraProvider>
      <Dash />
      {/* <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router> */}
    </ChakraProvider>
  );
}
// ReactDOM.render(<App />, document.getElementById("root"));

export default App;
