# Book Summary API Frontend

A modern Next.js frontend for testing the Book Summary API with GPT Researcher integration.

## 🚀 Features

- **Modern UI**: Beautiful gradient design with Tailwind CSS
- **Real-time Feedback**: Loading states and status messages
- **Error Handling**: Clear error messages and troubleshooting tips
- **Example Books**: Quick test buttons for popular books
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full type safety

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📦 Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🎯 Usage

1. **Start the API server** (in the parent directory):
   ```bash
   cd ..
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the frontend**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:3000`

4. **Enter book details** and click "Generate Book Summary"

## 🧪 Testing

### Example Books
- **Atomic Habits** by James Clear (Oct 16 2018)
- **1984** by George Orwell (1949)
- **The Great Gatsby** by F. Scott Fitzgerald (1925)

### API Endpoint
The frontend connects to: `http://localhost:8000/generate-summary`

## 📱 Features

- **Form Validation**: Ensures all fields are filled
- **Loading States**: Shows research progress
- **Status Messages**: Success, error, and info states
- **Responsive Design**: Works on all screen sizes
- **Quick Fill**: Click example books to auto-fill the form

## 🔧 Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
└── components/         # React components (if needed)
```

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Gradient backgrounds** for modern look
- **Smooth animations** and hover effects
- **Responsive grid** layout
- **Custom loading spinners**

## 🔗 API Integration

The frontend makes POST requests to your FastAPI backend:

```typescript
const response = await fetch('http://localhost:8000/generate-summary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    book_name: string,
    author: string,
    publication_date: string
  })
});
```

## 🚀 Deployment

This Next.js app can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Any static hosting service**

```bash
# Build for production
npm run build

# The built files will be in the .next directory
```
