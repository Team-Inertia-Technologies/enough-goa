import { supabase } from './supabase';

const BUCKET = 'message-media';

export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteMedia(publicUrl: string): Promise<void> {
  const url = new URL(publicUrl);
  const parts = url.pathname.split(`/${BUCKET}/`);
  if (parts.length < 2) return;
  const { error } = await supabase.storage.from(BUCKET).remove([parts[1]]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}
