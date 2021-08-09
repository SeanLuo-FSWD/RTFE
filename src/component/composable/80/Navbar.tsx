import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <Link to="/public">
                <h2>Public pg</h2>
            </Link>
        </div>
    )
}

export default Navbar
