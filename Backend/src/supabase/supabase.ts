import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import multer from "multer";
import path from "path";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

const uploadToSupabase = async (
    localpath: string
): Promise<
    { success: true; path: string } | { success: false; error: Error }
> => {
    try {
        const { data, error } = await supabase.storage
            .from("vedai-images")
            .upload("file_path", localpath);

        if (error) {
            return {
                success: false,
                error: new Error(
                    `Error while storing the file: ${error.message}`
                ),
            };
        }

        return {
            success: true,
            path: data.fullPath,
        };
    } catch (e: any) {
        return {
            success: false,
            error: new Error(`Unexpected error: ${e.message}`),
        };
    }

};

export const getStoredURL = async (file_path:string) => {
    const supabaseURL = await uploadToSupabase(file_path);
    if (supabaseURL.success) {
        return supabaseURL.path;
    } else {
        console.error(supabaseURL.error);
        return "";
    }
};





