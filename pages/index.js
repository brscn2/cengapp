import dynamic from "next/dynamic";

// Currently the dashboard page, will be developed later

const Navbar = dynamic(() => import("../components/UI/Navbar"), {
  ssr: false,
});

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
};

export default App;
