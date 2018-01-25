import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email:``,
            password:``
        }
    }
    changeHandler=(e)=>{
        let temp1=e.target.placeholder;
        this.setState({
            [temp1]:e.target.value
        })
    };
    clickHandler=()=>{

        axios({
            method: 'post',
            url: 'http://localhost:5454/login',
            data: {
                "username":this.state.email,
                "password":this.state.password
            },
            crossDomain : true,
            withCredentials: true
        }).then((res)=>{
            let token = res.headers[`x-auth`];
            console.log(res);
            if(token){
                console.log(token);
                localStorage.setItem(`user`,token);
                this.props.authMethod();
            }else{
                alert(res.data);
            }

        });

    };
    render(){
        return(
            <div id="loginSection">
                <In value={this.state.email} type="text" placeholder="email" method={this.changeHandler}/><br/><br/>
                <In value={this.state.password} type="password" placeholder="password" method={this.changeHandler}/><br/><br/>
                <Btn method={this.clickHandler} text="login"/>
            </div>
        )

    }
}
const Btn = (props) =>{
    return <button onClick={props.method}>{props.text}</button>
};
class In extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <input value={this.props.value} type={this.props.type} placeholder={this.props.placeholder} onChange={(e)=>{this.props.method(e)}}/>
        )
    }
}
export default Login;