export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 0 = Paid, 1 = Free, 2 = View Only
  imagePath: string;
  price?: number;
}

export const fetchContents = async (): Promise<ContentItem[]> => {
  const response = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};