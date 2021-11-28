// function Home() {
//     return <h1>Hello, World!</h1>
// }
class Home extends React.Component {
    constructor() {


        super()

        this.state = { name: null, username: null }

    }

    componentDidMount() {


        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) return alert(error.message)

                this.setState({ name: user.name })
                this.setState({ username: user.username })

            })
        } catch (error) {
            alert(error.message)
        }
    }
    render() {

        if (this.state.name) {
            return <div>
                <h1>hello, {this.state.name ? this.state.name : 'World'}!</h1>
                <p>For change your username</p> <a href="" onClick={event => {
                    event.preventDefault()
                    this.props.onClicked(this.state.username)
                }}>click here</a>
            </div>
        }
        else {return null}
    }

}

