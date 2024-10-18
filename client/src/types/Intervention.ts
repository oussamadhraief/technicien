import { IDevice } from "./Device";

export interface IIntervention { 
    _id?: string;
    clientName?: string;
    location?: string;
    device?: IDevice;
    technicianId?: string;
    deviceId?: string;
    status: 'Pending' | 'Complete'; 
    malfunction?: string; 
    interventionType?: string; 
    photo?: string;
    based?: string;
    sparePart?: string; 
  }