import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TeamCards from "./components/Team-cards";

function App() {
  
  return (

    <div className="flex flex-col min-h-screen gap-8">
      <Navbar />
      <h1 className="text-3xl text-center font-bold underline text-black px-4 py-2 rounded-lg">
        Notre équipe
      </h1>
      <TeamCards></TeamCards>
      <Footer></Footer> 
    </div>

  )
}
export default App