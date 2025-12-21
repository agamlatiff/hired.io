import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!!
);

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
  bucket: "company" | "applicant"
) => {
  const filename = `${randomString(6)}.jpg`;

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
  bucket: "company" | "applicant"
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
  bucket: "company" | "applicant"
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
  bucket: "company" | "applicant"
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
