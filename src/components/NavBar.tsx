import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav id="navbar"
            className="bg-black transition-all duration-500 text-white px-4 py-4 fixed w-full flex justify-start gap-3 items-center">
            <Link href="">
                <div className="text-xl font-bold">NeoPrompt</div>
            </Link>
        </nav>
    )
}

export default NavBar