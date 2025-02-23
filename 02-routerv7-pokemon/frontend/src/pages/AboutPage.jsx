import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col gap-2 justify-center items-center mt-4 p-4 bg-gray-400 rounded-lg shadow-amber-200">
        <h2 className="text-4xl font-bold underline italic mb-4 text-gray-800">Desarrollado por</h2>
        <figure className="flex flex-col gap-2 justify-center items-center bg-gray-200 p-2 rounded-lg">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/644.png" alt="Zekrom Shiny" className="rounded-full object-cover shadow-lg shadow-gray-900 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/80"/>
          <figcaption className="text-xl font-semibold text-gray-600">Desarrollador Frontend</figcaption>
          <figcaption className="text-xl font-semibold text-gray-600">Desarrollador Backend</figcaption>
          <figcaption className="text-xl font-semibold text-gray-600">Github: <Link to='https://github.com/davidgb3' target="blank" className="hover:text-black hover:text-2xl transition-all duration-150">David Gómez Bravo</Link></figcaption>
        </figure>
      </div>
    </div>
  )
}

export default AboutPage