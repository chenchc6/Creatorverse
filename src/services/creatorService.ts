// handle all data interactions with the Supabase database
import { supabase } from '../client';

export interface Creator {
  id: string;
  name: string;
  url: string;
  description: string;
  imageURL?: string;
}

// Fetch all creators
export const fetchCreators = async (): Promise<Creator[]> => {
  const { data, error } = await supabase.from('creators').select('*');

  if (error) {
    console.error('Error fetching creators:', error);
    throw error;
  }

  return data as Creator[];
};

// Fetch a single creator by ID
export const fetchCreatorById = async (id: string): Promise<Creator | null> => {
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching creator:', error);
    throw error;
  }

  return data as Creator;
};

// Add a new creator
export const addCreator = async (
  newCreator: Omit<Creator, 'id'>
): Promise<void> => {
  const { error } = await supabase.from('creators').insert([newCreator]);

  if (error) {
    console.error('Error adding creator:', error);
    throw error;
  }
};

// Update an existing creator
export const updateCreator = async (
  id: string,
  updatedCreator: Partial<Creator>
): Promise<void> => {
  const { error } = await supabase
    .from('creators')
    .update(updatedCreator)
    .eq('id', id);

  if (error) {
    console.error('Error updating creator:', error);
    throw error;
  }
};

// Delete a creator
export const deleteCreator = async (id: string): Promise<void> => {
  const { error } = await supabase.from('creators').delete().eq('id', id);

  if (error) {
    console.error('Error deleting creator:', error);
    throw error;
  }
};
