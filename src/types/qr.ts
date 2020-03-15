export interface QRCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  width?: number;
}

export interface WiFiQRData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface ContactQRData {
  firstName?: string;
  lastName?: string;
  organization?: string;
  phone?: string;
  email?: string;
  url?: string;
  note?: string;
}

export interface EmailQRData {
  email: string;
  subject?: string;
  body?: string;
}

export interface SMSQRData {
  phone: string;
  message?: string;
}

export interface LocationQRData {
  latitude: number;
  longitude: number;
  query?: string;
}

export type QRDataType = 
  | { type: 'url'; data: string }
  | { type: 'text'; data: string }
  | { type: 'wifi'; data: WiFiQRData }
  | { type: 'contact'; data: ContactQRData }
  | { type: 'email'; data: EmailQRData }
  | { type: 'sms'; data: SMSQRData }
  | { type: 'location'; data: LocationQRData };

export interface GeneratedQR {
  dataUrl: string;
  type: QRDataType['type'];
  content: string;
}
