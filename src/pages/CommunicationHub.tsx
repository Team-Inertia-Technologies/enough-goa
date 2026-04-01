import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { useGuests } from '../hooks/useGuests';
import { MessageComposer, type ComposerDraft } from '../components/messaging/MessageComposer';
import { MessagePreview } from '../components/messaging/MessagePreview';
import { BatchList } from '../components/messaging/BatchList';
import { WhatsAppInstance } from '../components/messaging/WhatsAppInstance';

type Step = 'compose' | 'preview';

export function CommunicationHub() {
  const { batches, loading, createBatch, deleteBatch } = useMessages();
  const { guests } = useGuests();

  const [step, setStep] = useState<Step>('compose');
  const [draft, setDraft] = useState<ComposerDraft | null>(null);

  function handleNext(d: ComposerDraft) {
    setDraft(d);
    setStep('preview');
  }

  async function handleSend(selectedIds: string[]) {
    if (!draft) return;
    await createBatch({
      title: draft.title,
      body: draft.body,
      media_url: draft.mediaUrl,
      status: 'sending',
      sender: null,
      recipient_count: selectedIds.length,
      sent_count: 0,
      failed_count: 0,
      scheduled_at: null,
    });
    // TODO: trigger actual WhatsApp sends via gateway
    setStep('compose');
    setDraft(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">Communication Hub</h1>

      {/* WhatsApp connection status */}
      <WhatsAppInstance instanceName="Primary" />

      {/* Composer / Preview wizard */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-6">
          {(['compose', 'preview'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              {i > 0 && <div className="h-px w-8 bg-gray-200" />}
              <div
                className={`flex items-center gap-2 text-sm font-medium
                  ${step === s ? 'text-emerald-700' : 'text-gray-400'}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs
                    ${step === s ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}
                >
                  {i + 1}
                </span>
                {s === 'compose' ? 'Compose' : 'Preview & Send'}
              </div>
            </div>
          ))}
        </div>

        {step === 'compose' && <MessageComposer onNext={handleNext} />}
        {step === 'preview' && draft && (
          <MessagePreview
            draft={draft}
            guests={guests}
            onBack={() => setStep('compose')}
            onSend={handleSend}
          />
        )}
      </div>

      {/* Past batches */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Message Batches</h2>
        <BatchList batches={batches} loading={loading} onDelete={deleteBatch} />
      </div>
    </div>
  );
}
