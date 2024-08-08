import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Login: React.FC = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submitted");
  };
  return (
    <IonPage className="bg-primary">
      <div className="absolute inset-0 bg-primary flex flex-col items-center">
        <div className="py-20 w-72 -ml-5">
          <IonImg src="/icon_logo BWS.svg"></IonImg>
        </div>
        <IonContent>
          <div className="absolute inset-0 bg-primary p-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col bg-primarylight/60 gap-3 p-5 shadow-2xl rounded-3xl"
            >
              <label htmlFor="username" className="text-white">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                placeholder="Nom d'utilisateur"
                className="px-2 py-3 rounded-full"
              />
              <label htmlFor="Password" className="text-white mt-3">Mot de passe</label>
              <input
                type="text"
                id="Password"
                placeholder="Mote de passe"
                className="px-2 py-3 rounded-full"
              />
              <button className="bg-secondary rounded-full py-2.5 mt-7 text-white">Valider</button>
            </form>
          </div>
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Login;
