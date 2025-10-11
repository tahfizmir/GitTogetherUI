import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [error,setError]= useState();
  const dispatch=useDispatch();

  const saveProfile=async ()=>{
    try {
     const res= await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,photoUrl,about,skills},{withCredentials:true});
     console.log("res after patch ", res);
     dispatch(addUser(res.data.data));
    } catch (err) {
      setError(err.message);
    }

  }

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAbout(user.about || "");
  }, [user]);

  return (
<div className="flex justify-center ">
      {user && (
        <div className="flex  justify-evenly">
          <div className="card w-96 bg-base-100 card-l shadow-sm my-15 border-1 shadow-2xl ">
            <div className="card-body shadow-2xl">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="Type new first here."
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="Type new Last here."
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input"
                    placeholder="Type your bio."
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    placeholder="Type your photo url // this will be later changed to uploading image."
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    className="input"
                    placeholder="Type your skills separated by a comma and press save."
                    onChange={(e) => setSkills(e.target.value.split(',').map(s => s.trim()))}
                  />
                </fieldset>
              </div>

              <div className="justify-end card-actions">
                <button className="btn btn-primary mx-4 my-2" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className="px-2 py-10">
          <p className="text-center mb-2 text-sm text-gray-500  ">
            Preview of your card
          </p>
          <UserCard user={{ firstName, lastName, photoUrl, about, skills }} />
        </div>
      )}
    </div>
  );
};

export default EditProfile;
