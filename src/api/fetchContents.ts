export interface ContentItem {
  id: string;
  photo: string;
  user: string;
  title: string;
  pricingOption: number;
  price?: number;
}

export const fetchContents = async (): Promise<ContentItem[]> => {
  const response = await fetch(
    'https://closet-recruiting-api.azurewebsites.net/api/data'
  );
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};
