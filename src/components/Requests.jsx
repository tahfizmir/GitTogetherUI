import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Connections = () => {
  const [showToast, setShowToast] = useState(false);
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

  const handleReviewRequests = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
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
                  <div
                    className="tooltip tooltip-top"
                    data-tip="Accept connection request"
                    onClick={() => {
                      return handleReviewRequests("accepted", request._id);
                    }}
                  >
                    <CheckIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <div
                    className="tooltip tooltip-top"
                    data-tip="Ignore connection request"
                    onClick={() => {
                      return handleReviewRequests("rejected", request._id);
                    }}
                  >
                    <XMarkIcon className="w-8 h-8 text-red-500 mx-30" />
                  </div>
                </li>
              );
            })}
          </ul>
          {showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Responded</span>
              </div>
            </div>
          )}
        </>
      );
    }
  }
};

export default Connections;
