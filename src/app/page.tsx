'use client';

import { useState } from 'react';
import { QRGenerator } from '@/lib/qr-generator';
import { QRDataType } from '@/types/qr';
import { Wifi, Globe, MessageSquare, Mail, MapPin, User, Type } from 'lucide-react';
import QRDisplay from '@/components/QRDisplay';
import WiFiForm from '@/components/WiFiForm';
import URLForm from '@/components/URLForm';
import TextForm from '@/components/TextForm';
import EmailForm from '@/components/EmailForm';
import SMSForm from '@/components/SMSForm';
import ContactForm from '@/components/ContactForm';
import LocationForm from '@/components/LocationForm';

type QRType = 'wifi' | 'url' | 'text' | 'email' | 'sms' | 'contact' | 'location';

const qrTypes = [
  { id: 'wifi' as QRType, name: 'WiFi', icon: Wifi, description: 'Share WiFi credentials' },
  { id: 'url' as QRType, name: 'Website', icon: Globe, description: 'Link to a website' },
  { id: 'text' as QRType, name: 'Text', icon: Type, description: 'Plain text message' },
  { id: 'email' as QRType, name: 'Email', icon: Mail, description: 'Send an email' },
  { id: 'sms' as QRType, name: 'SMS', icon: MessageSquare, description: 'Send a text message' },
  { id: 'contact' as QRType, name: 'Contact', icon: User, description: 'Share contact info' },
  { id: 'location' as QRType, name: 'Location', icon: MapPin, description: 'Share a location' },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<QRType>('wifi');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: QRDataType) => {
    setIsGenerating(true);
    try {
      const qrDataUrl = await QRGenerator.generateQR(data);
      setGeneratedQR(qrDataUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'wifi':
        return <WiFiForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'url':
        return <URLForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'text':
        return <TextForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'email':
        return <EmailForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'sms':
        return <SMSForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'contact':
        return <ContactForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      case 'location':
        return <LocationForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create QR codes for WiFi, websites, and more
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Choose QR Code Type
            </h2>

            {/* Type Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {qrTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedType === type.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Type Description */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {qrTypes.find(t => t.id === selectedType)?.description}
              </p>
            </div>

            {/* Form */}
            {renderForm()}
          </div>

          {/* Right Panel - QR Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <QRDisplay qrDataUrl={generatedQR} isGenerating={isGenerating} />
          </div>
        </div>
      </div>
    </div>
  );
}
