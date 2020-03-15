import QRCode from 'qrcode';
import { QRCodeOptions, QRDataType, WiFiQRData, ContactQRData, EmailQRData, SMSQRData, LocationQRData } from '@/types/qr';

export class QRGenerator {
  private static defaultOptions: QRCodeOptions = {
    errorCorrectionLevel: 'M',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 256,
  };

  static async generateQR(data: QRDataType, options?: Partial<QRCodeOptions>): Promise<string> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const content = this.formatData(data);
    
    try {
      const dataUrl = await QRCode.toDataURL(content, {
        errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
        margin: mergedOptions.margin,
        color: mergedOptions.color,
        width: mergedOptions.width,
      });
      
      return dataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  private static formatData(data: QRDataType): string {
    switch (data.type) {
      case 'url':
        return this.formatUrl(data.data);
      case 'text':
        return data.data;
      case 'wifi':
        return this.formatWiFi(data.data);
      case 'contact':
        return this.formatContact(data.data);
      case 'email':
        return this.formatEmail(data.data);
      case 'sms':
        return this.formatSMS(data.data);
      case 'location':
        return this.formatLocation(data.data);
      default:
        throw new Error('Unsupported QR data type');
    }
  }

  private static formatUrl(url: string): string {
    // Add protocol if missing
    if (!url.match(/^https?:\/\//)) {
      return `https://${url}`;
    }
    return url;
  }

  private static formatWiFi(wifi: WiFiQRData): string {
    const { ssid, password, security, hidden = false } = wifi;
    return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
  }

  private static formatContact(contact: ContactQRData): string {
    const {
      firstName = '',
      lastName = '',
      organization = '',
      phone = '',
      email = '',
      url = '',
      note = ''
    } = contact;

    const fullName = `${firstName} ${lastName}`.trim();
    
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${fullName}`,
      firstName && `N:${lastName};${firstName};;;`,
      organization && `ORG:${organization}`,
      phone && `TEL:${phone}`,
      email && `EMAIL:${email}`,
      url && `URL:${url}`,
      note && `NOTE:${note}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
  }

  private static formatEmail(email: EmailQRData): string {
    const { email: emailAddress, subject = '', body = '' } = email;
    let mailto = `mailto:${emailAddress}`;
    
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    
    if (params.length > 0) {
      mailto += `?${params.join('&')}`;
    }
    
    return mailto;
  }

  private static formatSMS(sms: SMSQRData): string {
    const { phone, message = '' } = sms;
    return message ? `sms:${phone}?body=${encodeURIComponent(message)}` : `sms:${phone}`;
  }

  private static formatLocation(location: LocationQRData): string {
    const { latitude, longitude, query = '' } = location;
    return query 
      ? `geo:${latitude},${longitude}?q=${encodeURIComponent(query)}`
      : `geo:${latitude},${longitude}`;
  }

  static downloadQR(dataUrl: string, filename: string = 'qrcode.png'): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
