import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    <Navbar/>
    <main className="max-w-7xl mx-auto px-4 py-6 h-full">
        <Outlet/>
    </main>
    <Footer/>
    </div>
  )
}

export default RootLayout