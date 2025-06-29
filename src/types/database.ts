export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      couples: {
        Row: {
          id: string
          user_id: string
          bride_name: string
          groom_name: string
          wedding_date: string
          slug: string
          created_at: string
          updated_at: string
          subscription_plan_id: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          bride_name: string
          groom_name: string
          wedding_date: string
          slug?: string
          created_at?: string
          updated_at?: string
          subscription_plan_id?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          bride_name?: string
          groom_name?: string
          wedding_date?: string
          slug?: string
          created_at?: string
          updated_at?: string
          subscription_plan_id?: string | null
          is_active?: boolean
        }
      }
      // Outros tipos das tabelas...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 