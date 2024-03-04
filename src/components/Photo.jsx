import React from 'react'

const Photo = ({ data }) => {
    return (
        <div className='photo'>
            <img src={data.urls.small} alt={data.alt_description} />
        </div>
    )
}

export default Photo