import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  } else {
    if (requests.length === 0) {
      return <div>no pending requests</div>;
    } else {
      return (
        <>
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Your Requests
            </li>

            {requests.map((request) => {
              const { firstName, lastName, age, gender, about, photoUrl } =
                request.fromUserId;
              return (
                <li key={request._id} className="list-row">
                  <div>
                    <img className="size-10 rounded-box" src={photoUrl} />
                  </div>
                  <div>
                    <div>{firstName + " " + lastName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + " " + gender}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">{about}</p>
                </li>
              );
            })}
          </ul>
        </>
      );
    }
  }
};

export default Connections;
