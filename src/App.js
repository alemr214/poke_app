import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div class="row row-cols-1 row-cols-md-6 g-4">
        <div class="col">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
