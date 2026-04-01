import { useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { uploadMedia } from '../../lib/storage';

export interface ComposerDraft {
  title: string;
  body: string;
  mediaUrl: string | null;
}

interface MessageComposerProps {
  onNext: (draft: ComposerDraft) => void;
}

export function MessageComposer({ onNext }: MessageComposerProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const url = await uploadMedia(file);
      setMediaUrl(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleNext() {
    if (!title.trim() || !body.trim()) return;
    onNext({ title: title.trim(), body: body.trim(), mediaUrl });
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Batch title"
        placeholder="e.g. Event invitation – Panaji"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Message body</label>
        <textarea
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your WhatsApp message here…"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <p className="text-xs text-gray-400">{body.length} characters</p>
      </div>

      {/* Media upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Attach media (optional)</label>
        {mediaUrl ? (
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
            <span className="flex-1 truncate text-gray-600">{mediaUrl.split('/').pop()}</span>
            <button onClick={() => setMediaUrl(null)} className="text-gray-400 hover:text-red-500">
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-emerald-400 hover:text-emerald-600">
            <Paperclip size={16} />
            {uploading ? 'Uploading…' : 'Choose image or document'}
            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
          </label>
        )}
        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!title.trim() || !body.trim()}>
          Preview & select recipients →
        </Button>
      </div>
    </div>
  );
}
