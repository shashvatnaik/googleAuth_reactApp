import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import Login from './components/login';
import Home from './components/home';
//import $ from 'j'query';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            isAuth:false
        }
    }

    componentDidMount(){

        if(localStorage.user){
            this.setState({isAuth:true});
        }else{console.log(`authenticate first`);
            axios.get(`http://localhost:5454/getReqUser`,{crossDomain : true,
                withCredentials: true}).then((res)=>{console.log(`user on componentDidMount:`,res);if(res.data){
                console.log(res);
                this.setState({isAuth:true});
                localStorage.setItem(`user`,res.data);
            }});
        }
    }

changeAuth=()=> {
    console.log(this.state);
    this.setState({isAuth: true});
};
    googleAuth=()=>{
        window.location='http://localhost:5454/google';
    };

    render(){
        return(
            this.state.isAuth ? <div><h1>Home</h1><Home/>
                    <button onClick={()=>{localStorage.clear();this.setState({isAuth:false});
                        axios({
                            method: 'get',
                            url: 'http://localhost:5454/logout',
                            crossDomain : true,
                            withCredentials: true
                        }).then((res)=>{
                            console.log(res);
                        }).catch((err)=>{console.log(err)});
                    }}>logout</button>
                </div>
                :
                <div>
                    <center>
                        <h1>Login</h1>
                        <Login authMethod={this.changeAuth}/><br/>
                        <button className="loginBtn loginBtn--google" onClick={this.googleAuth}>Google Login</button>
                    </center>
                </div>

        )
    }
}

ReactDOM.render(<div><App /></div>, document.getElementById('root'));
registerServiceWorker();







// componentDidMount(){
//     /*axios.post(`http://localhost:5454/login`,{
//         "username":"asd@asd.com",
//         "password":"asd"
//     },myApi).then((data)=>{
//         console.log(data);
//     }).catch((err)=>{
//         console.log(`err:`);
//         console.log(err);
//     })*/
//     axios({
//         method: 'post',
//         url: 'http://localhost:5454/login',
//         data: {
//             "username":"asd@asd.com",
//             "password":"asd"
//         },
//         crossDomain : true,
//         withCredentials: true
//     }).then((res)=>{
//         console.log(res);
//     });
//     /*$.ajax({
//         type: "POST",
//         dataType: 'text',
//         url:`http://localhost:5454/login`,
//         data:{
//             "username":"asd@asd.com",
//             "password":"asd"
//         },
//         crossDomain : true,
//         xhrFields: {
//             withCredentials: true
//         }
//     })
//         .done(function(xhr, textStatus, a) {
//             console.log(xhr);
//             console.log(textStatus);
//             console.log(a);
//         })
//         .fail( function(xhr, textStatus, errorThrown) {
//             console.log(xhr.responseText);
//             console.log(textStatus);
//         });*/
// }