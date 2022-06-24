import { validators, errors } from "commons";
import { restaurant } from "../../../logic/node_modules/data/src/schemas";

const { validateToken } = validators
const { ClientError, ServerError } = errors


export default function (token) {
    validateToken(token)

    return fetch(`http://localhost:8080/api/restaurant`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },

    })
        .then(res => {
            const { status } = res
            if (status === 200)
                return res.json()
                    .then(restaurant => { 

                        return restaurant
                    })
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new ClientError(message)
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new ServerError(text)
                    })
        })
}