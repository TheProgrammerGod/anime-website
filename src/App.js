import { useGlobalContext } from "./Context/global";

function App() {

  const global = useGlobalContext();
  console.log(global);
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
