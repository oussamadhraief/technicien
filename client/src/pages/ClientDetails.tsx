import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { IDevice } from "../types/Device";

const ClientDetails = () => {
  const [form, setForm] = useState({
    clientName: "",
    location: "",
  });
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  const history = useHistory();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/api/devices/types")
        .then((response) => {
          setDevices(response.data.devices);
        })
        .catch((error) => {
          console.error("There was an error fetching the types!", error);
        });
    };
    fetchData();
  }, []);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (form.clientName && form.location && selectedDevice) {
      localStorage.setItem(
        "clientDetails",
        JSON.stringify({
          ...form,
          selectedDevice,
        })
      );
      history.push("/create-intervention/info");
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <IonPage>
      <div className="p-3 w-32">
        <IonImg src="/icon_logo BWS.svg"></IonImg>
      </div>
      <p className="w-full text-base font-bold text-center">Fiche d'intervention</p>
      <IonContent>
        <form
          onSubmit={handleNext}
          className="flex flex-col items-start px-5 gap-5"
        >
          <div className="w-full flex items-center justify-between gap-2 mt-10">
            <IonLabel className="whitespace-nowrap w-28">
              Nom du client
            </IonLabel>
            <input
              type="text"
              id="clientName"
              name="clientName"
              onChange={handleChange}
              value={form.clientName}
              className="w-full py-3 rounded-full border border-gray-300"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <IonLabel className="w-28">Localisation</IonLabel>
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              value={form.location}
              className="w-full py-3 rounded-full border border-gray-300"
            />
          </div>
          <div className="w-full flex items-start justify-between gap-7">
            <IonLabel className="w-28">Device</IonLabel>
            <IonSelect
              value={selectedDevice}
              onIonChange={(e) => setSelectedDevice(e.detail.value)}
              class="w-full py-0.5 px-2 rounded-full border border-gray-300"
            >
              {devices.map((device) => (
                <IonSelectOption
                  className="w-full"
                  key={device._id}
                  value={device._id}
                >
                  {device.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>
          <div className="w-full flex justify-center">
            <button className="w-11/12 bg-secondary h-10 rounded-full shadow text-white text-sm font-bold uppercase mt-10">
              Suivant
            </button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ClientDetails;
