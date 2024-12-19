import { updateCollection } from '@/api/Collection'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RxCross1 } from 'react-icons/rx'

interface EditCollection {
    editData: { id: number, title: string }
    setShowEditScreen: React.Dispatch<React.SetStateAction<boolean>>
    setRefresher: React.Dispatch<React.SetStateAction<boolean>>
    refresher: boolean
}

const EditScreen = ({ editData, setShowEditScreen, setRefresher, refresher }: EditCollection) => {

    const [title, setTitle] = useState<string>(editData.title)
    const handleSave = async () => {
        await updateCollection(editData.id, title)
        setShowEditScreen(false)
        setRefresher(!refresher)
    }
    return (
        <div className='edit-card rounded-2xl shadow-md bg-white border-t-4 border-gray-300 px-5 py-6' >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Collection</h2>
            <div className="mb-4">
                <label className="block text-gray-600 mb-2">Title</label>
                <input
                    type="text"
                    id="collection-title"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSave}
                    className="edit-btn"
                >
                    <FaEdit />
                    Save
                </button>
                <button
                    onClick={() => setShowEditScreen(false)}
                    className="delete-btn "
                >
                    <RxCross1 />
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditScreen