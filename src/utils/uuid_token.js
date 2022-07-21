import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
    if (!localStorage.getItem('uuid')) {
        localStorage.setItem('uuid', uuidv4())
    }
    return localStorage.getItem('uuid')
}