import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {

  const user=useSelector((store)=>store.user);
    const {
    firstName = "",
    lastName = "",
    photoUrl = "/placeholder-profile.png",
    about = "",
    age,
    gender,
    skills = [],
  } = user;

  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="max-w-sm w-full mx-auto my-auto mb-40 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition-transform hover:scale-[1.02]">
   \
      <div className="relative h-56 bg-gray-100">
        <img
          src={photoUrl || "/placeholder-profile.png"}
          alt={fullName || "User"}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/placeholder-profile.png")}
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {fullName || "Unnamed User"}
        </h2>

        {(age || gender) && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {age && `${age} years old`} {gender && `• ${gender}`}
          </p>
        )}

        <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {about || "This user hasn't added a bio yet."}
        </p>

        {skills && skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex gap-3 justify-center">
            {/* <button className="px-4 py-1 rounded-full border border-violet-300 text-white-700 hover:bg-gray-50 transition text-sm">
              Message
            </button>
            <button className="px-4 py-1 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition text-sm">
              Follow
            </button> */}
          </div>

         
          <Link
            to="/edit/profile"
            className="inline-block mt-2 px-5 py-2 text-sm font-medium text-white bg-violet-600 rounded-full hover:bg-violet-700 transition shadow-md hover:shadow-lg"
          >
            ✏️ Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
