import { useEffect, useState } from "react"

export const Form = () => {
    const [storedata, setStoreData] = useState([]);
    const [username, setUserName] = useState('');
    const [useremail, setUserEmail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [useraddress, setUserAddress] = useState('');
    const [usergender, setUserGender] = useState([]);
    const [userfav, setUserFav] = useState([]);
    const [errors, setErrors] = useState({});

    console.log("user Details", storedata)
    console.log("gender", usergender)
    console.log("fav", userfav);

    useEffect(() => {
        console.log("user details", storedata)
    }, [storedata])

    const SubmitForm = (e) => {
        e.preventDefault();
        let validatedata = {};
        if (!username.trim()) {
            validatedata.username = "User Name Required";
        }
        if (!useremail.trim()) {
            validatedata.useremail = "User Email Required";
        }
        if (!userphone.trim() || userphone.length!==10) {
            validatedata.userphone = "User Phone Required";
        }
        if (!useraddress.trim()) {
            validatedata.useraddress = "User Address Required";
        }
        if (!usergender.checked) {
            validatedata.usergender = "Choose Gender Required";
        }
        if (!userfav.checked) {
            validatedata.userfav = "Choose Fav Crickter Required";
        }
        setErrors(validatedata);
        if (Object.keys(validatedata).length>0) {
            setStoreData((prev) => {
                return [...prev, {
                    username, useremail, userphone, useraddress, usergender, userfav
                }]
            })
            setUserName('');
            setUserEmail('');
            setUserAddress('');
            setUserPhone('');
            setUserGender('');
            setUserFav('')
        }
    }
    const TakeName = (e) => {
        setUserName(e.target.value)
    }
    const TakeEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const TakePhone = (e) => {
        setUserPhone(e.target.value)
    }
    const TakeAddress = (e) => {
        setUserAddress(e.target.value)
    }
    const TakeGenderValue = (e) => {
        setUserGender(e.target.value)
    }
    const TakeFavCrik = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setUserFav((prv) => [...prv, value])
        }
        else {
            setUserFav((prev) => prev.filter((item) => item !== value))
        }
    }
    useEffect(() => {
        if (username.trim()) {
            setErrors((prev) => ({ ...prev, username: null }));
        }
    }, [username]);
    useEffect(()=>{
        if(useremail.trim()){
            setErrors((prev)=>({...prev,useremail: null}))
        }
    },[useremail])
    useEffect(()=>{
        if(userphone.trim()){
            setErrors((prev)=>({...prev,userphone:null}))
        }
    },[userphone])
    useEffect(()=>{
        if(useraddress.trim()){
            setErrors((prev)=>({...prev,useraddress:null}))
        }
    },[useraddress])
    useEffect(()=>{
        if(usergender){
            setErrors((prev)=>({...prev,usergender:null}))
        }
    },[usergender])
    useEffect(()=>{
        if(userfav.length>0){
            setErrors((prev)=>({...prev,userfav:null}))
        }
    },[userfav])
    return (
        <div className="h-[900px]"> 
            <div>
                <h1 className="text-center">Form with Customize Validations</h1>
            </div>
            <div className="border-2 border-black mt-[10px] bg-gray-200 h-[700px]">
                <form onSubmit={SubmitForm}>
                    <div>
                        <label>User Name:-</label><br />
                        {errors.username && <span>{errors.username}</span>}
                        <input type="text" placeholder="Enter User Name" className="border-2 border-black"
                            value={username} onChange={TakeName} />
                    </div>
                    <div>
                        <label>User Email:-</label><br />
                        {errors.useremail && <span>{errors.useremail}</span>}
                        <input type="email" placeholder="Enter User Email" className="border-2 border-black"
                            value={useremail} onChange={TakeEmail} />
                    </div>
                    <div>
                        <label>User Phone Number:-</label><br />
                        {errors.userphone && <span>{errors.userphone}</span>}
                        <input type="number" placeholder="Enter User Phone Number" className="border-2 border-black"
                            value={userphone} onChange={TakePhone} />
                    </div>
                    <div>
                        <label>User Address:-</label><br />
                        {errors.useraddress && <span>{errors.useraddress}</span>}
                        <textarea rows={2} cols={20} placeholder="Enter User Address" className="border-2 border-black"
                            value={useraddress} onChange={TakeAddress}></textarea>
                    </div>
                    <div>
                        <label>Choose Gender:-</label><br />
                        {errors.usergender && <span>{errors.usergender}</span>}
                        <input type="radio" value={"male"} checked={usergender === 'male'}
                            onChange={TakeGenderValue} />Male
                        <input type="radio" value={"female"} checked={usergender === 'female'}
                            onChange={TakeGenderValue} />FeMale
                        <input type="radio" value={"other"} checked={usergender === 'other'}
                            onChange={TakeGenderValue} />Other
                    </div>
                    <div>
                        <label>Choose Your Favourite Crickter:-</label><br />
                        {errors.userfav && <span>{errors.userfav}</span>}
                        <input type="checkbox" value={"virat kholi"}
                            checked={userfav.includes('virat kholi')} onChange={TakeFavCrik} />Virat Kholi
                        <input type="checkbox" value={"rohit sharma"}
                            checked={userfav.includes('rohit sharma')} onChange={TakeFavCrik} />Rohit Sharma
                        <input type="checkbox" value={"Ben Stokes"}
                            checked={userfav.includes('Ben Stokes')} onChange={TakeFavCrik} />Ben Stokes
                        <input type="checkbox" value={"Glean Maxwell"}
                            checked={userfav.includes('Glean Maxwell')} onChange={TakeFavCrik} />Glean Maxwell
                        <input type="checkbox" value={"joy root"}
                            checked={userfav.includes('joy root')} onChange={TakeFavCrik} />Joy Root
                    </div>
                    <div>
                        <button type="submit">Submit Data</button>
                    </div>
                </form>
            </div>
        </div>
    )
}