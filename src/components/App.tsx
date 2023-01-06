import { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import MainContent from "./MainContent";
import "./App.css";

function App(): JSX.Element {
  const [navSelection, setNavSelection] = useState("homepage");

  return (
    <>
      <Nav setNavSelection={setNavSelection} navSelection={navSelection} />
      <MainContent navSelection={navSelection} />
      <Footer />
    </>
  );
}

export default App;
