export interface Photo {
  id: string;
  title: string;
  url: string;
  author: string;
  authorAvatar?: string; // For the Download Modal profile
  location: string;
  category: 'Wildlife' | 'Urban' | 'Culture' | 'Nature'; // For filtering
  isFree: boolean;
  price?: number;
  width: number;
  height: number;
}

export const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    title: 'Lagos Island Skyline',
    url: 'https://images.unsplash.com/photo-1618828665011-0abb99c40785?q=80&w=1200&auto=format&fit=crop',
    author: 'Adebayo Smith',
    authorAvatar: 'https://i.pravatar.cc/150?u=adebayo',
    location: 'Lagos, Nigeria',
    category: 'Urban',
    isFree: true,
    width: 800,
    height: 1200
  },
  {
    id: '2',
    title: 'Sahara Desert Caravans',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    author: 'Youssef Idris',
    authorAvatar: 'https://i.pravatar.cc/150?u=youssef',
    location: 'Morocco',
    category: 'Nature',
    isFree: false,
    price: 19.99,
    width: 800,
    height: 1000
  },
  {
    id: '3',
    title: 'The Streets of Bo-Kaap',
    url: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1200&auto=format&fit=crop',
    author: 'Selam Habte',
    authorAvatar: 'https://i.pravatar.cc/150?u=selam',
    location: 'Cape Town, South Africa',
    category: 'Culture',
    isFree: true,
    width: 800,
    height: 1100
  },
  {
    id: '4',
    title: 'Majestic Zebra Grazing',
    url: 'https://images.unsplash.com/photo-1523805081446-cd93d569b912?q=80&w=1200&auto=format&fit=crop',
    author: 'Sarah Juma',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    location: 'Maasai Mara, Kenya',
    category: 'Wildlife',
    isFree: false,
    price: 25.00,
    width: 800,
    height: 1200
  },
  {
    id: '5',
    title: 'Modern Architecture',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop',
    author: 'Kofi Mensah',
    authorAvatar: 'https://i.pravatar.cc/150?u=kofi',
    location: 'Nairobi, Kenya',
    category: 'Urban',
    isFree: true,
    width: 800,
    height: 1200
  },
  {
    id: '6',
    title: 'Market Life',
    url: 'https://images.unsplash.com/photo-1489493585363-d69421e0dee3?q=80&w=1200&auto=format&fit=crop',
    author: 'Anita Otieno',
    authorAvatar: 'https://i.pravatar.cc/150?u=anita',
    location: 'Accra, Ghana',
    category: 'Culture',
    isFree: false,
    price: 12.50,
    width: 800,
    height: 900
  },
  {
    id: '7',
    title: 'Savannah Sunset',
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop',
    author: 'Erik van der Boom',
    authorAvatar: 'https://i.pravatar.cc/150?u=erik',
    location: 'Namibia',
    category: 'Wildlife',
    isFree: true,
    width: 800,
    height: 1150
  },
  {
    id: '8',
    title: 'Urban Lagos',
    url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop',
    author: 'David Ndlovu',
    authorAvatar: 'https://i.pravatar.cc/150?u=david',
    location: 'Nigeria',
    category: 'Urban',
    isFree: false,
    price: 30.00,
    width: 800,
    height: 1000
  }
];