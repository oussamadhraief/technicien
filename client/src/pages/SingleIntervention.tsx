import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
  IonButtons,
} from "@ionic/react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

const SingleIntervention: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory(); // To handle navigation
  const [intervention, setIntervention] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntervention = async () => {
      try {
        const response = await axios.get(`/api/interventions/find/${id}`);
        setIntervention(response.data);

        // Fetch the photo if it exists
        if (response.data.photo) {
          const photoResponse = await axios.get(`/${response.data.photo}`, {
            responseType: "blob",
          });
          const photoUrl = URL.createObjectURL(photoResponse.data);
          setPhotoUrl(photoUrl);
        }
      } catch (err) {
        setError("Failed to fetch intervention");
      } finally {
        setLoading(false);
      }
    };

    fetchIntervention();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-white">
          <IonTitle>Details de la fiche</IonTitle>
          <IonButtons slot="end">
            <Link
              to="/interventions"
              style={{ background: "none", border: "none" }}
            >
              <FaTimes size={20} color="grey" />
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && <IonLoading isOpen={loading} message={"Loading..."} />}
        {error && <IonText color="danger">{error}</IonText>}
        {intervention && (
          <div className="pb-20">
            <p className="font-bold text-xl">Informations Générales</p>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Technicien:</p>
              <IonText>{intervention.user.username}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Client Name:</p>
              <IonText>{intervention.clientName}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Lieu:</p>
              <IonText>{intervention.location}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Boitier:</p>
              <IonText>{intervention.device.name}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Status:</p>
              <IonText>{intervention.status}</IonText>
            </div>

            <p className="font-bold text-xl mt-10">Détails Techniques</p>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Matricule:</p>
              <IonText>{intervention.technicianId}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">ID Boitier:</p>
              <IonText>{intervention.deviceId}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Panne:</p>
              <IonText>{intervention.malfunction.type}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Action:</p>
              <IonText>{intervention.interventionType.name}</IonText>
            </div>

            <p className="font-bold text-xl mt-10">
              Informations Supplémentaires
            </p>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Nouveau Boitier:</p>
              <IonText>{intervention.based}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Pièce:</p>
              <IonText>{intervention.sparePart.name}</IonText>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <p className="font-bold">Date:</p>
              <IonText>
                {moment(intervention.createdAt).format("MMM D, YYYY")}
              </IonText>
            </div>

            {photoUrl ? (
              <div className="flex flex-col gap-1 mt-10">
                <p className="font-bold">Photo état avant:</p>

                <img
                  src={photoUrl}
                  alt="Intervention"
                  style={{ width: "100%" }}
                />
              </div>
            ) : (
              <IonText>Photo non disponible</IonText>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SingleIntervention;
