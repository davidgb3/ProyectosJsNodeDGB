
const Search = () => {

  const handleSearch = () => {};

  return (
    <>
      <div className="min-h-screen p-6">
            {/* Buscador */}
            <div className="max-w-2xl mx-auto mb-8">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar películas..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Buscar
                    </button>
                </form>
            </div>
      </div>
    </>
  )
}

export default Search