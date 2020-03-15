import { Download, Loader2 } from 'lucide-react';
import { QRGenerator } from '@/lib/qr-generator';
import Image from 'next/image';

interface QRDisplayProps {
  qrDataUrl: string | null;
  isGenerating: boolean;
}

export default function QRDisplay({ qrDataUrl, isGenerating }: QRDisplayProps) {
  const handleDownload = () => {
    if (qrDataUrl) {
      QRGenerator.downloadQR(qrDataUrl, 'skyqr-code.png');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Generated QR Code
      </h2>
      
      <div className="w-full max-w-sm aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center mb-6">
        {isGenerating ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Generating QR code...</p>
          </div>
        ) : qrDataUrl ? (
          <Image
            src={qrDataUrl}
            alt="Generated QR Code"
            width={256}
            height={256}
            className="max-w-full max-h-full rounded-lg"
            unoptimized
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-500 rounded"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill out the form to generate a QR code
            </p>
          </div>
        )}
      </div>

      {qrDataUrl && !isGenerating && (
        <div className="w-full space-y-3">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download QR Code
          </button>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>Right-click to copy or save the QR code</p>
          </div>
        </div>
      )}
    </div>
  );
}
