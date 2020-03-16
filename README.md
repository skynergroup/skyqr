# QR Code Generator

A simple, responsive QR code generator that creates QR codes for WiFi credentials, URLs, contact information, SMS, email, and locations.

## Features

- **WiFi QR Codes**: Share WiFi network credentials with SSID, password, and security type
- **URL QR Codes**: Generate QR codes for websites and links
- **Text QR Codes**: Create QR codes for plain text messages
- **Email QR Codes**: Generate mailto links with pre-filled subject and body
- **SMS QR Codes**: Create QR codes for text messages with phone numbers
- **Contact QR Codes**: Generate vCard QR codes with contact information
- **Location QR Codes**: Share geographic coordinates and locations
- **Instant Download**: Download generated QR codes as PNG files
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme detection

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **QR Generation**: qrcode.js library
- **Icons**: Lucide React
- **Deployment Ready**: Optimized for static hosting and subdomain deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skyqr
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Subdomain Deployment

This application is designed to be deployed as a subdomain (e.g., `qr.yourdomain.com`). Here are deployment options:

#### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `out` (if using static export)
4. Configure custom domain

#### Traditional Hosting
1. Build the application: `npm run build`
2. Export static files: `npm run export` (if needed)
3. Upload to your hosting provider
4. Configure subdomain DNS

### Environment Variables

No environment variables are required for basic functionality.

## Usage

1. **Select QR Code Type**: Choose from WiFi, URL, Text, Email, SMS, Contact, or Location
2. **Fill Form**: Enter the required information for your selected type
3. **Generate**: Click the generate button to create your QR code
4. **Download**: Use the download button to save the QR code as a PNG file

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with modern JavaScript support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on the GitHub repository.
