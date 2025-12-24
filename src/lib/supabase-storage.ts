import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(
  file: File,
  bucket: string,
  path: string
): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${path}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
}

export async function uploadResume(file: File, applicantId: string): Promise<string | null> {
  return uploadFile(file, "resumes", `applicants/${applicantId}`);
}

export async function uploadCompanyLogo(file: File, companyId: string): Promise<string | null> {
  return uploadFile(file, "logos", `companies/${companyId}`);
}

export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
  return uploadFile(file, "avatars", `users/${userId}`);
}

export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    return !error;
  } catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
}
