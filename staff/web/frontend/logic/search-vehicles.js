function searchVehicles(query, token, callback) {
    if (typeof token !== 'string') throw new TypeError('token is not string')
    if (!token.trim()) throw new Error('token is empty or blank')
    if (token.split('.').length !== 3) throw new Error('invalid token')

    if (typeof query !== 'string') throw new TypeError(query + ' is not string')
    if (!query.trim()) throw new Error('query is empty or blank')

    ValidateCallback(callback)



    const xhr = new XMLHttpRequest

    xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.addEventListener('load', function () {
        if (this.status === 401) {
            const res = JSON.parse(this.responseText)

            const error = res.error

            callback(new Error(error))
        } else if (this.status >= 400 && this .status < 500) {
            callback(new Error('client error'))
        }else if (this.status>=500){
            callback(new Error('server error'))
        }else if (this.status === 200){

       
            const user = JSON.parse(this.responseText)

            const favs = user.favs || []


            var xhr = new XMLHttpRequest


            xhr.open('GET', 'https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=' + query)

            xhr.onload = function () {
                if (this.status >= 400 && this.status < 500) {
                    callback(new Error('client error'))
                } else if (this.status >= 500) {
                    callback(new Error('server error'))
                } else if (this.status === 200) {
                    var vehicles = JSON.parse(this.responseText)

                    vehicles.forEach(vehicle =>
                        vehicle.isFav = favs.includes(vehicle.id)
                    )

                    callback(null, vehicles)
                } else {
                    var res = JSON.parse(this.responseText)

                    var error = res.error

                    callback(new Error(error))
                }
            }

            xhr.send()
        }
    })

    xhr.setRequestHeader('Authorization', 'Bearer ' + token)

    xhr.send()

}