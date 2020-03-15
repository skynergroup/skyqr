import { useState } from 'react';
import { QRDataType } from '@/types/qr';
import { Type } from 'lucide-react';

interface TextFormProps {
  onGenerate: (data: QRDataType) => void;
  isGenerating: boolean;
}

export default function TextForm({ onGenerate, isGenerating }: TextFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    onGenerate({
      type: 'text',
      data: text.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Plain Text</h3>
      </div>

      {/* Text Input */}
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Content *
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter any text you want to encode in the QR code..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-vertical"
          required
        />
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {text.length} characters
        </div>
      </div>

      {/* Common Text Examples */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Examples:</p>
        <div className="space-y-2">
          {[
            'Hello, World!',
            'Welcome to our event!',
            'Contact us: info@company.com',
            'Follow us on social media'
          ].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setText(example)}
              className="block w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
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
        {isGenerating ? 'Generating...' : 'Generate Text QR Code'}
      </button>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>* Required fields</p>
        <p className="mt-1">
          The QR code will contain exactly the text you enter above.
        </p>
      </div>
    </form>
  );
}
