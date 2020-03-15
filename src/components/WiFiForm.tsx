import { useState } from 'react';
import { QRDataType } from '@/types/qr';
import { Eye, EyeOff, Wifi } from 'lucide-react';

interface WiFiFormProps {
  onGenerate: (data: QRDataType) => void;
  isGenerating: boolean;
}

export default function WiFiForm({ onGenerate, isGenerating }: WiFiFormProps) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ssid.trim()) {
      alert('Please enter a network name (SSID)');
      return;
    }

    if (security !== 'nopass' && !password.trim()) {
      alert('Please enter a password for secured networks');
      return;
    }

    onGenerate({
      type: 'wifi',
      data: {
        ssid: ssid.trim(),
        password: password.trim(),
        security,
        hidden,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Wifi className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">WiFi Settings</h3>
      </div>

      {/* Network Name (SSID) */}
      <div>
        <label htmlFor="ssid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Network Name (SSID) *
        </label>
        <input
          type="text"
          id="ssid"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          placeholder="Enter WiFi network name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      {/* Security Type */}
      <div>
        <label htmlFor="security" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Security Type
        </label>
        <select
          id="security"
          value={security}
          onChange={(e) => setSecurity(e.target.value as 'WPA' | 'WEP' | 'nopass')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>

      {/* Password */}
      {security !== 'nopass' && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter WiFi password"
              className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Hidden Network */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="hidden"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="hidden" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Hidden network
        </label>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate WiFi QR Code'}
      </button>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>* Required fields</p>
        <p className="mt-1">
          Scan this QR code to automatically connect to your WiFi network.
        </p>
      </div>
    </form>
  );
}
