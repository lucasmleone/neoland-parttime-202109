class PostRegister extends React.Component{
    constructor(){
        super()
    }
    render(){
        return <div>
        <h2>User successfully register</h2>


        <button onClick={event =>{
            event.preventDefault()
            this.props.onPostRegisterClick()
            }}>Login</button>
    </div>
    } 
}