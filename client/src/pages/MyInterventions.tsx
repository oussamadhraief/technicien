import {
  IonContent,
  IonImg,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from "../utils/axiosConfig";
import { IIntervention } from "../types/Intervention";

const MyInterventions: React.FC = () => {

    const [interventions, setInterventions] = useState<IIntervention[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/interventions');
                console.log(response.data.interventions);
                
                setInterventions(response.data.interventions)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData()
    },[])

  return (
    <IonPage>
      <div className="p-3 w-32">
        <IonImg src="/icon_logo BWS.svg"></IonImg>
      </div>
      <p className="w-full text-base font-bold text-center">
        Mes interventions
      </p>
      <IonContent className="ion-padding">
        <div className="w-full px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Client
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Lieu
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Boitier
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {interventions.map(intervention => 
                    (<tr>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {intervention?.clientName}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                        {intervention?.location}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">{intervention?.device?.name}</p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${intervention?.status === 'Pending' ? 'text-yellow-500' : 'text-emerald-700'}`}>
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 ${intervention?.status === 'Pending' ? 'bg-yellow-500/50' : 'bg-green-500/50'} rounded-full opacity-50`}
                          ></span>
                          <span className="relative">{intervention?.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <Link
                          to={`/intervention/${intervention?._id}`}
                          className="bg-blue-500 px-3 py-1.5 rounded-full inline-flex items-center justify-center"
                        >
                          <MdOutlineRemoveRedEye className="text-white w-10 h-5" />
                        </Link>
                      </td>
                    </tr>))}
                  </tbody>
                </table>
                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <div className="flex items-center border rounded-full">
                    <button
                      type="button"
                      className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-full hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        className=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-base text-blue-500 bg-blue-200 border-t border-b "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-full hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        className=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyInterventions;
