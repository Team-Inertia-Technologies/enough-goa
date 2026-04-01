import { supabase } from './supabase';

const BUCKET = 'message-media';

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * The bucket must exist in your Supabase project with public access enabled.
 */
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

/**
 * Deletes a file from storage given its public URL.
 */
export async function deleteMedia(publicUrl: string): Promise<void> {
  const url = new URL(publicUrl);
  // path after /storage/v1/object/public/<bucket>/
  const parts = url.pathname.split(`/${BUCKET}/`);
  if (parts.length < 2) return;
  const path = parts[1];

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}
