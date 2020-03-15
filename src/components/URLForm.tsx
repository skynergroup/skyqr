import { useState } from 'react';
import { QRDataType } from '@/types/qr';
import { Globe, ExternalLink } from 'lucide-react';

interface URLFormProps {
  onGenerate: (data: QRDataType) => void;
  isGenerating: boolean;
}

export default function URLForm({ onGenerate, isGenerating }: URLFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url.trim())) {
      alert('Please enter a valid URL');
      return;
    }

    onGenerate({
      type: 'url',
      data: url.trim(),
    });
  };

  const handleTestUrl = () => {
    if (url.trim()) {
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(testUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Website URL</h3>
      </div>

      {/* URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website URL *
        </label>
        <div className="relative">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com or example.com"
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          />
          {url.trim() && (
            <button
              type="button"
              onClick={handleTestUrl}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Test URL"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Common URL Examples */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Examples:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'https://google.com',
            'https://github.com',
            'https://youtube.com',
            'https://linkedin.com'
          ].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setUrl(example)}
              className="text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate URL QR Code'}
      </button>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>* Required fields</p>
        <p className="mt-1">
          The QR code will automatically add &quot;https://&quot; if no protocol is specified.
        </p>
      </div>
    </form>
  );
}
