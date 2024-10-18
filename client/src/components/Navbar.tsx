import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { username, logout } = useAuth();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          {username && <IonButton>Welcome, {username}</IonButton>}
          <IonButton onClick={logout}>Logout</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
