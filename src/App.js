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

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/viewer" element={<Viewer />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
// ReactDOM.render(<App />, document.getElementById("root"));

export default App;
