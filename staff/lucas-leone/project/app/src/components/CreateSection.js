
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { addSectionToList} from "../logic"
import { useContext } from 'react'
import Context from './Context'


export default () => {
    const { setFeedback } = useContext(Context)
    const[errorFeedback, setErrorFeedback]= useState(false)
    const params = useParams()
    const { listId } = params
    const navigate = useNavigate()

    const handleSave = event => {
        event.preventDefault()

        const { target: { name: { value: name } } } = event

        try {
            addSectionToList(sessionStorage.token, listId, name)
                .then(section => {
                    navigate(`/list/${listId}/section/${section}`)
                })
                .catch((error) => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }

    }

    const handleCreateItem = () => {
        setErrorFeedback(!errorFeedback)

    }

    

    const handleGoBack = () => {
        navigate(`/list/${listId}`)
    }



    return <div>

        <button onClick={handleGoBack}>x</button>
        <h1>Create Section</h1>
        <form onSubmit={handleSave}>
            <input type="text" name="name" ></input>

            <button type="submit">Done</button>
        </form>
        <h3>Items</h3>
        {errorFeedback?
        <>
        <p>You need a name of this section</p></>
        :<></>}
        <button onClick={handleCreateItem}>+</button>

    </div>


}