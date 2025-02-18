import { useState } from "react"
import * as Yup from 'yup';

export const Form2=()=>{
    const[storedata,setStoreData] = useState([]);
    const[username,setUsername] = useState('');
    const[usermail,setUsermail] = useState('');
    const[errors,setErrors] = useState({});
    console.log("userdata",storedata);
    //it make an object of error 
    const validateErrors = Yup.object({
        username: Yup.string().required("User Name Required"),
        usermail: Yup.string().required("User Email Required"),
      });
    const SubmitForm=async(e)=>{
        e.preventDefault();
        try{
            //valiadte the errors on error object
          await validateErrors.validate({username,usermail},{abortEarly: false})
          setErrors({});
          setStoreData((prev)=>{
           return [...prev,
                {username,usermail}
            ]
          })
          setUsername('');
          setUsermail('');
        }
        catch(err){
           // put errors in to an array
          const errors = err.inner.reduce((acc,error)=>{
            //error path(where to show error)
            acc[error.path] = error.message;
            return acc;
          },{})
          setErrors(errors);
        }
    }
    const ValidateNAme=(e)=>{
        setUsername(e.target.value);
    }
    const ValidateMail=(e)=>{
        setUsermail(e.target.value);
    }
    return(
        <div>
            <div>
                <h1>Form Validations using Yup Package</h1>
            </div>
            <div>
                <form onSubmit={SubmitForm}>
                    <div>
                        <label>UserName:-</label>
                        {errors.username && <span>{errors.username}</span>}
                        <input type="text" placeholder="Enter Username"
                        value={username} onChange={ValidateNAme}/>
                    </div>
                    <div>
                        <label>User Email:-</label>
                        {errors.usermail && <span>{errors.usermail}</span>}
                        <input type="email" placeholder="Enter Useremail"
                        value={usermail} onChange={ValidateMail}/>
                    </div>
                    <div>
                        <button type="submit">Click It</button>
                    </div>
                </form>
            </div>
        </div>
    )
}