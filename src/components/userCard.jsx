import { useSelector } from "react-redux";

const UserCard = ({ user = {} }) => {
  const { firstName = "", lastName = "", about = "", photoUrl } = user;

  const savedUser = useSelector((store) => store.user);

  const fullName = `${firstName} ${lastName}`.trim();

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
