import { useSelector } from "react-redux";

const UserCard = ({ user = {} }) => {
  const { firstName = "", lastName = "", about = "", photoUrl = "" } = user;

  const savedUser = useSelector((store) => store.user);

  const fullName = `${firstName} ${lastName}`.trim();
  const skillsArray = Array.isArray(savedUser?.skills) ? savedUser?.skills : [];
const SkillChip = ({ children }) => (
  <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded-full text-xs font-medium shadow-sm">
    {children}
  </div>
);

  return (
    <div className="relative max-w-sm w-full  bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ">
      <div className="relative h-96 w-full bg-gray-100">
        <img
          src={photoUrl || "/placeholder-profile.png"}
          alt={fullName || "User photo"}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/placeholder-profile.png")}
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-semibold">
            {fullName || "Unnamed User"}
          </h2>
          {savedUser && savedUser.age && savedUser.gender && (
            <p className="text-sm opacity-80">{`${savedUser.age} • ${savedUser.gender}`}</p>
          )}
        </div>
      </div>

      <div className="p-4 text-gray-700 dark:text-gray-300">
        <p className="text-sm line-clamp-3">{about || "No bio available."}</p>
      </div>
      {/* Skills Section */}
      <div className=" mb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mx-3 p-1">
            Skills
          </h3>
          {skillsArray?.length > 4 ? (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {skillsArray?.length} listed
            </span>
          ) : null}
        </div>
        {skillsArray?.length ? (
          <div className="mt-2 flex flex-wrap gap-2 mx-4">
            {skillsArray?.map((skill, idx) => (
              <SkillChip key={`${skill}-${idx}`} className="flex-shrink-0">
                {String(skill)}
              </SkillChip>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            No skills added to this profile.
          </p>
        )}
      </div>

      <div className="flex justify-around pb-4">
        <button className="w-14 h-14 flex items-center justify-center rounded-full border border-red-400 text-red-500 text-xl hover:bg-red-50 hover:scale-110 transition">
          ❌
        </button>
        <button className="w-16 h-16 flex items-center justify-center rounded-full border border-green-400 text-green-500 text-2xl hover:bg-green-50 hover:scale-110 transition">
          ❤️
        </button>
      </div>
    </div>
  );
};

export default UserCard;
