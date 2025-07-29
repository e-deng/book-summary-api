'use client';

import { useState } from 'react';

interface BookData {
  book_name: string;
  author: string;
  publication_date: string;
}

interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export default function Home() {
  const [bookData, setBookData] = useState<BookData>({
    book_name: '',
    author: '',
    publication_date: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [status, setStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookData.book_name || !bookData.author || !bookData.publication_date) {
      setStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }

    setIsLoading(true);
    setResult('');
    setStatus({ message: '🔗 Connecting to GPT Researcher...', type: 'info' });

    try {
      const response = await fetch('http://localhost:8000/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resultText = await response.text();
      
      if (resultText.startsWith('Error:')) {
        setStatus({ message: '❌ ' + resultText, type: 'error' });
        setResult(resultText);
      } else {
        setStatus({ message: '✅ Research completed successfully!', type: 'success' });
        setResult(resultText);
      }

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setStatus({ message: '❌ Error: ' + errorMessage, type: 'error' });
      setResult(`Error occurred: ${errorMessage}\n\nMake sure:\n1. The API server is running on localhost:8000\n2. GPT Researcher is running on localhost:8001\n3. Your internet connection is stable`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              📚 Book Summary API
            </h1>
            <p className="text-xl text-white/90">
              Generate comprehensive book summaries using GPT Researcher
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Form Section */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="book_name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Book Name *
                    </label>
                    <input
                      type="text"
                      id="book_name"
                      name="book_name"
                      value={bookData.book_name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Atomic Habits"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={bookData.author}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., James Clear"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="publication_date" className="block text-sm font-semibold text-gray-700 mb-2">
                      Publication Date *
                    </label>
                    <input
                      type="text"
                      id="publication_date"
                      name="publication_date"
                      value={bookData.publication_date}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Oct 16 2018"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      ⏳ Researching...
                    </span>
                  ) : (
                    '🚀 Generate Book Summary'
                  )}
                </button>
              </form>
            </div>

            {/* Results Section */}
            <div className="border-t border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Research Results</h3>
              
              {/* Status Message */}
              {status && (
                <div className={`mb-4 p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                  status.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                  'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {status.message}
                </div>
              )}

              {/* Results Display */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[300px]">
                {isLoading ? (
                  <div className="text-center text-gray-600">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p>Researching book... This may take 5-20 minutes for deep analysis.</p>
                  </div>
                ) : result ? (
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed overflow-auto max-h-96">
                    {result}
                  </pre>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Enter book details above and click "Generate Book Summary" to start the research.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Example Books */}
          <div className="mt-8 text-center">
            <h4 className="text-white text-lg font-semibold mb-4">💡 Try these example books:</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Atomic Habits', author: 'James Clear', date: 'Oct 16 2018' },
                { name: '1984', author: 'George Orwell', date: '1949' },
                { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', date: '1925' }
              ].map((book, index) => (
                <button
                  key={index}
                  onClick={() => setBookData({
                    book_name: book.name,
                    author: book.author,
                    publication_date: book.date
                  })}
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  {book.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
