import React, {useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
//images
import background from '../src/assets/fish.jpg';
import Eye from '../src/assets/eye-hide.svg';
//store
import {Context} from '../src/context/store';
import {accountsConfig} from '../src/axiosConfig'



function Login() {
    const {dispatch, state: {user_data}} = useContext(Context);
    const isLogin = user_data.isLogin

    const [hide,setHide] = useState(true);
    const [error, setError] = useState()
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    //--------------Hide password---------------
    const handlePasswordShow = () => {
        setHide(!hide);
    };
    //------------------------------------------
    //----------------Login api-----------------

    const submitHandler = () => {

        accountsConfig
            .post("api/v1/users/login/admin/", {
                service_name: "supports",
                email: emailValue,
                password: passwordValue
            })
            .then ((response) => {
                const {StatusCode, data} = response.data;
                if(StatusCode === 6000){
                    dispatch({
                        type:"UPDATE_USER_DATA",
                        user_data: {
                            isLogin:true,
                            access_token: data.response.access_token,
                            email: emailValue,
                            password: passwordValue,
                            user_id: data.user_pk
                        },
                    });
                } else {
                    setError(data.message)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        //-----------------------------------------------
    
  return (
    <FormContainer>
        <FormPage>
            <Head>Login</Head>
            <Cover>
                <Username>Email Address</Username>
                <User>
                    <input type="email" onChange={(e) => setEmailValue(e.target.value)}/>
                </User>
            </Cover>
            <Cover> 
                <Username>Password</Username>
                <Password>
                    <input type={hide ? "password" : "text"} onChange={(e) => setPasswordValue(e.target.value)} />
                </Password>
                    <EyeCover onClick={handlePasswordShow} style={{cursor:"pointer"}}>
                        <img src={Eye} alt="image"/>
                    </EyeCover>
            </Cover>
            <ErrorMessage>{error} </ErrorMessage>
            <Check>
                <input type="checkbox" />
                <h3>Remember password</h3>
            </Check>
            <Button onClick={() => submitHandler()} > <span>Login</span> </Button>
        </FormPage>
    </FormContainer>
  )
}

export default Login;
const FormContainer = styled.div`
    background-image: url(${background});
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    width:100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FormPage = styled.div`
   
    width:50%;
    height:65%;
    border:1px solid #fff;
    background-color: rgba(0,0,0, 0.4); 
`;
const Head = styled.h3`
    font-size:20px;
    color:#fff;
    align-items:center;
    display:block;
`;
const Cover = styled.div`
    align-items:center;
    display:flex;
    justify-content:center;
`;
const User = styled.div`
    color: #bcbcbc;
    font-size:14px;
    &input {
        width:100%;
        height:45px;
        padding:15px 20px;
        cursor: pointer;
    }
`;
const Password = styled.div`
    color: #bcbcbc;
    font-size:14px;
    &input {
        width:100%;
        height:45px;
        cursor: pointer;
    }
`;
const Username = styled.div`

`;
const ErrorMessage = styled.div`
    color: red;
    font-size: 13px;
    height: 30px;
    margin-bottom: 10px;
`;
const EyeCover = styled.div`
    position: absolute;
    right: 15px;
    bottom: 12px;
`;
const Check = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    h3{
        color: #858585;
        margin-left: 10px;
        font-size: 16px;
    }
`;
const Button = styled.div`
    background: linear-gradient(255.47deg, #0881E0 0%, #05E8BA 102.09%);
    padding: 16px 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    @media all and (max-width: 980px){
        height:50px;
    }
    @media all and (max-width: 480px){
        font-size:17px;
    }
`;