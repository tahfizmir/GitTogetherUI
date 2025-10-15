import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import {
  EllipsisVerticalIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import { addConnections } from "../utils/connectionsSlice";
import { useDispatch } from "react-redux";

const Connections = () => {
  const [connections, setConnections] = useState();
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log("connection res", res);
      setConnections(res.data);
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  console.log("connections 888", connections);
  if (!connections) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  } else {
    if (connections.length === 0) {
      return <div>no connections</div>;
    } else {
      return (
        <>
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Your Connections
            </li>

            {connections.map((connection) => (
              <li key={connection._id} className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src={connection.photoUrl}
                  />
                </div>
                <div>
                  <div>{connection.firstName + " " + connection.lastName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {connection.age + " " + connection.gender}
                  </div>
                </div>
                <p className="list-col-wrap text-xs">{connection.about}</p>
                <div className="tooltip tooltip-top" data-tip="Chat">
                  <ChatBubbleLeftIcon className="w-8 h-8 text-yellow-500 cursor-pointer mx-5" />
                </div>
                <div className="tooltip tooltip-top" data-tip="Options">
                  <EllipsisVerticalIcon className="w-6 h-8 text-gray-600 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>
        </>
      );
    }
  }
};

export default Connections;
