import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy initialization to avoid build-time errors when env vars are not available
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase URL and Key must be defined in environment variables");
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
}

// For backward compatibility - creates client on first access
export const supabaseClient = new Proxy({} as SupabaseClient, {
  get: (_, prop) => {
    const client = getSupabaseClient();
    const value = client[prop as keyof SupabaseClient];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

function randomString(length: number) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

export const supabaseUploadFile = async (
  file: File | string,
  bucket: "company" | "applicant" | "avatars"
) => {
  // Determine file extension from file type
  let extension = "jpg";
  if (file instanceof File) {
    const mimeToExt: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "image/webp": "webp",
      "application/pdf": "pdf",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
      "text/plain": "txt",
    };
    extension = mimeToExt[file.type] || "jpg";
  }

  const filename = `${randomString(12)}.${extension}`;

  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return {
    data,
    error,
    filename,
  };
};

export const supabaseGetPublicUrl = (
  filename: string,
  bucket: "company" | "applicant" | "avatars"
) => {
  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return {
    publicUrl: data.publicUrl,
  };
};

export const supabaseDeleteFile = (
  filename: string,
  bucket: "company" | "applicant" | "avatars"
) => {
  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(`public/${filename}`);

  return {
    data,
  };
};

export const supabaseUpdateFile = async (
  file: File | string,
  filename: string,
  bucket: "company" | "applicant" | "avatars"
) => {
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .update(`public/${filename}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  return {
    data, error
  }
};

export const supabasePublicUrl = async (filename: string, bucket: string) => {
  const { data: { publicUrl } } = await supabaseClient.storage.from(bucket).getPublicUrl(`public/${filename}`)

  return publicUrl
}
