function Navbar() {
    return (
        <nav className="bg-black center shadow dark:bg-gray-800">
            <div className="container flex items-center justify-center p-6 mx-auto text-white capitalize">React Pokemon App
                
                <a href="#" className="text-white-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6">Accueil</a>

                <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Services</a>

                <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">A propos</a>

                <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">Contact</a>

            </div>
        </nav>
    )
}

export default Navbar;
