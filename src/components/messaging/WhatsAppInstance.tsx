import { useState } from 'react';
import { QrCode, RefreshCw, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

type InstanceStatus = 'disconnected' | 'scanning' | 'connected';

interface WhatsAppInstanceProps {
  instanceName?: string;
}

export function WhatsAppInstance({ instanceName = 'Primary' }: WhatsAppInstanceProps) {
  const [status, setStatus] = useState<InstanceStatus>('disconnected');
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    // TODO: integrate with your WhatsApp gateway API
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('scanning');
    setLoading(false);
  }

  function handleDisconnect() {
    setStatus('disconnected');
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex items-start gap-4">
      <div
        className={`rounded-lg p-2.5 ${
          status === 'connected'
            ? 'bg-emerald-50 text-emerald-600'
            : status === 'scanning'
            ? 'bg-yellow-50 text-yellow-600'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {status === 'connected' ? (
          <CheckCircle2 size={22} />
        ) : status === 'scanning' ? (
          <QrCode size={22} />
        ) : (
          <Phone size={22} />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{instanceName} instance</p>
        <p className="text-xs text-gray-500 mt-0.5 mb-3 capitalize">{status}</p>

        {status === 'scanning' && (
          <div className="mb-3 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-xs text-gray-500">
            QR code will appear here once the gateway responds.
          </div>
        )}

        <div className="flex gap-2">
          {status === 'disconnected' && (
            <Button size="sm" onClick={handleConnect} loading={loading}>
              Connect
            </Button>
          )}
          {status === 'scanning' && (
            <Button size="sm" variant="secondary" onClick={handleConnect} loading={loading}>
              <RefreshCw size={13} /> Refresh QR
            </Button>
          )}
          {status === 'connected' && (
            <Button size="sm" variant="danger" onClick={handleDisconnect}>
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
