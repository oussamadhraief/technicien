import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonText,
  IonImg,
} from "@ionic/react";
import axios from "../utils/axiosConfig";
import { IInterventionType } from "../types/InterventionType";
import { IIntervention } from "../types/Intervention";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { FaCamera } from "react-icons/fa";
import { IMalfunction } from "../types/Malfunction";
import { ISparePart } from "../types/SparePart";
import { useHistory } from 'react-router-dom';


const InterventionForm = () => {
  const [interventionTypes, setInterventionTypes] = useState<
    IInterventionType[]
  >([]);
  const [malfunctions, setMalfunctions] = useState<IMalfunction[]>([]);
  const [spareParts, setSpareParts] = useState<ISparePart[]>([]);
  const [selectedMalfunction, setSelectedMalfunction] = useState("");
  const [selectedSparePart, setSelectedSparePart] = useState("");
  const [selectedInterventionType, setSelectedInterventionType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<IIntervention>({
    technicianId: "",
    deviceId: "",
    status: 'Pending',
    malfunction: "",
    interventionType: "",
    photo: "",
    based: "",
    sparePart: "",
  });
  const [photo, setPhoto] = useState("");

  const history = useHistory();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interventionResponse, malfunctionResponse, sparePartResponse] =
          await Promise.all([
            axios.get("/api/interventions/types"),
            axios.get("/api/malfunctions/types"),
            axios.get("/api/spareparts/types"),
          ]);

        setInterventionTypes(interventionResponse.data.interventionTypes);
        setMalfunctions(malfunctionResponse.data.malfunctions);
        setSpareParts(sparePartResponse.data.spareParts);
        
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (!selectedInterventionType || !selectedMalfunction || !selectedSparePart || !form.technicianId || !form.deviceId || !form.based) {
      setErrorMessage("Please fill all the required fields.");
      return;
    }
  
    const clientDetails = localStorage.getItem("clientDetails");
    const parsedClientDetails = clientDetails ? JSON.parse(clientDetails) : null;
  
    if (!parsedClientDetails) {
      history.push('/create-intervention');
      return;
    }
  
    const formData = new FormData();
    formData.append('clientName', parsedClientDetails.clientName);
    formData.append('location', parsedClientDetails.location);
    formData.append('device', parsedClientDetails.selectedDevice);
    formData.append('technicianId', form.technicianId);
    formData.append('deviceId', form.deviceId);
    formData.append('status', selectedStatus);
    formData.append('malfunction', selectedMalfunction);
    formData.append('interventionType', selectedInterventionType);
    formData.append('based', form.based);
    formData.append('sparePart', selectedSparePart);
  
    if (photo) {
      const response = await fetch(photo);
      const blob = await response.blob();
      formData.append('photo', blob, 'photo.jpg');
    }
    
    axios
      .post("/api/interventions/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Intervention saved:", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the intervention!", error);
      });
  };
  

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      promptLabelHeader: "Take Picture",
    });

    setPhoto(image.dataUrl as string);
  };

  return (
    <IonPage>
      <div className="p-3 w-32">
        <IonImg src="/icon_logo BWS.svg"></IonImg>
      </div>
      <p className="w-full text-base font-bold text-center">Fiche d'intervention</p>
      <IonContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start px-5 gap-5 overflow-auto pb-20"
        >
          <div className="w-full flex items-center justify-between gap-2 mt-5">
            <IonLabel className="whitespace-nowrap w-28">Matricule</IonLabel>
            <input
              type="text"
              id="technicianId"
              name="technicianId"
              onChange={handleChange}
              value={form.technicianId}
              className="w-full py-3 rounded-full border border-gray-300"
            />
          </div>

          <div className="w-full flex items-center justify-between gap-2">
            <IonLabel className="whitespace-nowrap w-28">Id boitier</IonLabel>
            <input
              type="text"
              id="deviceId"
              name="deviceId"
              onChange={handleChange}
              value={form.deviceId}
              className="w-full py-3 rounded-full border border-gray-300"
            />
          </div>

          <div className="w-full flex items-center justify-between gap-2">
            <IonLabel className="w-28">Status</IonLabel>
            <IonSelect
              value={selectedStatus}
              name="status"
              onIonChange={(e) => setSelectedStatus(e.detail.value)}
              class="w-full py-0.5 px-2 rounded-full border border-gray-300"
            >
              <IonSelectOption className="w-full" value="Pending">
                En cours
              </IonSelectOption>
              <IonSelectOption className="w-full" value="Complete">
                Terminé
              </IonSelectOption>
            </IonSelect>
          </div>

          <div className="w-full flex items-start justify-between gap-2">
            <IonLabel className="w-28 mt-3">Type panne</IonLabel>
            <IonSelect
              value={selectedMalfunction}
              name="malfunction"
              onIonChange={(e) => setSelectedMalfunction(e.detail.value)}
              class="w-full py-0.5 px-2 rounded-full border border-gray-300"
            >
              {malfunctions.map((malfunction) => (
                <IonSelectOption
                  className="w-full"
                  key={malfunction._id}
                  value={malfunction._id}
                >
                  {malfunction.type}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="w-full flex items-start justify-between gap-2">
            <IonLabel className="w-28">Type intervention</IonLabel>
            <IonSelect
              value={selectedInterventionType}
              name="interventionType"
              onIonChange={(e) => setSelectedInterventionType(e.detail.value)}
              class="w-full py-0.5 px-2 rounded-full border border-gray-300"
            >
              {interventionTypes.map((interventionType) => (
                <IonSelectOption
                  className="w-full"
                  key={interventionType._id}
                  value={interventionType._id}
                >
                  {interventionType.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="w-full flex items-start gap-5">
            <IonLabel className="w-28">Photo état avant</IonLabel>
            <div className="flex flex-col items-start gap-5">
              <button
                onClick={takePicture}
                type="button"
                className="bg-secondary shadow px-4 py-2 rounded-full"
              >
                <FaCamera color="white" />
              </button>
              {photo && <img src={photo} alt="Captured Image" />}
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-2">
            <IonLabel className="w-28">Nom Nouveau Espace</IonLabel>
            <input
              type="text"
              id="based"
              name="based"
              onChange={handleChange}
              value={form.based}
              className="w-full py-3 rounded-full border border-gray-300"
            />
          </div>

          <div className="w-full flex items-start justify-between gap-2">
            <IonLabel className="w-28">Piece Rechance</IonLabel>
            <IonSelect
              value={selectedSparePart}
              name="sparePart"
              onIonChange={(e) => setSelectedSparePart(e.detail.value)}
              class="w-full py-0.5 px-2 rounded-full border border-gray-300"
            >
              {spareParts.map((sparePart) => (
                <IonSelectOption
                  className="w-full"
                  key={sparePart._id}
                  value={sparePart._id}
                >
                  {sparePart.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="w-full flex justify-center">
            <button className="w-11/12 bg-secondary h-10 rounded-full shadow text-white text-sm font-bold uppercase">
              Créer intervention
            </button>
          </div>

          {errorMessage && <IonText color="danger">{errorMessage}</IonText>}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default InterventionForm;
