import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { migrateDataToFirestore } from '@/utils/migrateDataToFirestore';

export default function MigrateDataPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleMigrate = async () => {
    try {
      setLoading(true);
      setStatus('idle');
      setMessage('Migrating data to Firestore...');

      const result = await migrateDataToFirestore();

      setStatus('success');
      setMessage(result.message + ' Check your Firestore database.');
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred during migration'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Data Migration</h1>
        <p className="text-gray-600 mb-6">
          Migrate your products, categories, and branches to Firestore
        </p>

        <div className="space-y-4">
          {/* Status Messages */}
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success!</p>
                <p className="text-sm text-green-800">{message}</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-800">{message}</p>
              </div>
            </div>
          )}

          {status === 'idle' && message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Loader className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
              <div>
                <p className="text-sm text-blue-800">{message}</p>
              </div>
            </div>
          )}

          {/* Migration Info */}
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-semibold mb-2">Will migrate:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Products</li>
              <li>Categories</li>
              <li>Branches</li>
            </ul>
          </div>

          {/* Migrate Button */}
          <button
            onClick={handleMigrate}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            {loading ? 'Migrating...' : 'Start Migration'}
          </button>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center">
            This will not duplicate data if collections already exist.
          </p>
        </div>
      </div>
    </div>
  );
}
