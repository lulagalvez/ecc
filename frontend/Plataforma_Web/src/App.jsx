import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./routes/AnimatedRoute";
import UserProvider from "./UserContextApi/UserProvider";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <UserProvider>
            <AnimatedRoutes />
          </UserProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
