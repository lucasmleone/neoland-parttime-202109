const User = require('./user')

User.cache()
    .then(() => {
        const john = new User({ id: 'USER-123123123', name: 'John Doe', email: 'john@doe.com', password: '123123123' })
        
        john.save()
            .then(() => {        
                console.log('john saved')
        

                john.name = 'John Smith'
                john.email = 'john@smith.com'
                john.password = '234234234'
        
                return john.save()
            })
            .then(() => console.log('john updated'))
            .catch(err => console.error(err))
    })