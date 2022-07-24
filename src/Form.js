import React, { useState } from 'react'

const Form = ({searchText}) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        searchText(text);
    }
    return (

        <div>
            <form className="mt-10" onSubmit={handleSubmit}>
                <input type="text" onChange={(e)=>setText(e.target.value)} className="px-2 py-2 mx-2 rounded-lg" placeholder="e.g search" />
                <button type="submit" className="bg-blue-400 py-2 px-2 rounded-lg text white">
                    Search
                </button>
            </form>
        </div>

    )
}

export default Form;