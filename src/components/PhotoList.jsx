import React from 'react'
import Photo from './Photo'

const PhotoList = ({ photos }) => {
    return (
        <div className='album'>
            {photos.map((photo) => (
                <Photo key={photo.id} data={photo}/>
            ))}
        </div>
    )
}

export default PhotoList