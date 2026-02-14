import { supabase } from './supabaseClient';
import { SupabaseClient, PostgrestError } from '@supabase/supabase-js';

export class ApiClient {
  protected static get client(): SupabaseClient {
    return supabase;
  }

  protected static handleError(
    error: PostgrestError | Error,
    context: string
  ): never {
    const message = error?.message || 'An unexpected error occurred';
    throw new Error(`${context}: ${message}`);
  }

  protected static async executeQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    errorContext: string
  ): Promise<T> {
    const { data, error } = await queryFn();

    if (error) {
      this.handleError(error, errorContext);
    }

    if (!data) {
      throw new Error(`${errorContext}: No data returned`);
    }

    return data;
  }

  protected static async executeQueryNullable<T>(
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    errorContext: string,
    notFoundCode?: string
  ): Promise<T | null> {
    const { data, error } = await queryFn();

    if (error) {
      if (notFoundCode && error.code === notFoundCode) {
        return null;
      }
      this.handleError(error, errorContext);
    }

    return data;
  }
}
