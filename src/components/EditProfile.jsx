import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserCard from "./userCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAbout(user.about || "");
  }, [user]);

  return (
    <div className="flex  justify-evenly">
      {user && (
        <div className="flex  justify-evenly">
          <div className="card w-96 bg-base-100 card-l shadow-sm my-15 border-1 shadow-2xl ">
            <div className="card-body shadow-2xl">
              <h2 className="card-title">Login to proceed</h2>
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
                    placeholder="Type your skill."
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </fieldset>
              </div>

              <div className="justify-end card-actions">
                <button className="btn btn-primary mx-4 my-2">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && (
        <>
          <p className="text-center mb-2 text-sm text-gray-500">
            Preview of your card
          </p>
          <UserCard user={{ firstName, lastName, photoUrl, about, skills }} />
        </>
      )}
    </div>
  );
};

export default EditProfile;
