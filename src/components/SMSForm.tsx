import { useState } from 'react';
import { QRDataType } from '@/types/qr';
import { MessageSquare } from 'lucide-react';

interface SMSFormProps {
  onGenerate: (data: QRDataType) => void;
  isGenerating: boolean;
}

export default function SMSForm({ onGenerate, isGenerating }: SMSFormProps) {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      alert('Please enter a phone number');
      return;
    }

    // Basic phone number validation (allows various formats)
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!phonePattern.test(cleanPhone)) {
      alert('Please enter a valid phone number');
      return;
    }

    onGenerate({
      type: 'sms',
      data: {
        phone: cleanPhone,
        message: message.trim(),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">SMS Message</h3>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1234567890 or 1234567890"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        />
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Include country code for international numbers (e.g., +1 for US)
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message (Optional)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pre-filled SMS message..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-vertical"
        />
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {message.length} characters
        </div>
      </div>

      {/* Common Message Examples */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Examples:</p>
        <div className="space-y-2">
          {[
            'Hello! I got your number from the QR code.',
            'Thanks for sharing your contact!',
            'Hi, I\'d like to get in touch.',
          ].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setMessage(example)}
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
        {isGenerating ? 'Generating...' : 'Generate SMS QR Code'}
      </button>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>* Required fields</p>
        <p className="mt-1">
          Scanning this QR code will open the SMS app with the phone number and message pre-filled.
        </p>
      </div>
    </form>
  );
}
