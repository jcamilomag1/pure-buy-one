import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  reference: string;
  created_at: string;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProduct = (reference: string) => {
  return useQuery({
    queryKey: ["product", reference],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("reference", reference)
        .maybeSingle();

      if (error) throw error;
      return data as Product | null;
    },
    enabled: !!reference,
  });
};
