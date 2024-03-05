import React from 'react'
import './shimmer.css'
import { Navigate, useNavigate } from 'react-router-dom'

const Shimmer = ({onClick}) => {
    return (
        <div className="shimmer" onClick={onClick}>AANVISHIKI</div>
    )
}

export default Shimmer