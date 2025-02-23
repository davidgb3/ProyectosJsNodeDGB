import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { user, token, login, error } = useAuth();
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    if(!error){
      navigate('/movies');
    }
    console.log(user);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl text-blue-950 font-semibold italic mb-4 underline">Inicio de Sesión</h1>
        <form className="p-2 bg-blue-200/50 rounded-lg w-fit" onSubmit={handleSubmit}>
            <label htmlFor='email' className="text-xl font-semibold italic text-blue-950">Email: </label> <br />
            <input id="email" type="email" value={formData.email} onChange={handleChange} name="email" className="border rounded-md bg-gray-200 p-1" placeholder="Email..."></input>

            <br />

            <label htmlFor='password' className="text-xl font-semibold italic text-blue-950">Password: </label> <br />
            <input id="password" type="password" value={formData.password} onChange={handleChange} name="password" className="border rounded-md bg-gray-200 p-1" placeholder="Password..."></input> <br /> <br />
            <button type='submit' className="bg-blue-950 text-white p-1 rounded-md w-full font-bold hover:bg-blue-800 transition-all duration-150">Iniciar Sesión</button>
        </form>
    </div>
  )
}

export default Login