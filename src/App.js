import { BrowserRouter, Route, Routes } from "react-router-dom";
//import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import FileUpload from "./components/FileUpload";
// import ImageGallery from "./components/ImageGallery";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/gallery" element={<ImageGallery/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
