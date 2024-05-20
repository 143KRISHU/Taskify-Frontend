import { Outlet } from "react-router-dom"
import Header from "./Component/Header";
import './App.css'

function App() {
  

  return (
    <>
      <header>
        <Header />
      </header>
      <main >
        <section className="container mx-auto">
        <Outlet />
        </section>
      </main>
    </>
  )
}

export default App
