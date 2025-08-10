// Image configuration mapping menu items to asset folders
export const imageConfig = {
  products: {
    plywood: {
      folder: 'raw-plywood',
      mainImage: '/assets/raw-plywood/rp-1.jpg',
      galleryImages: [
        '/assets/raw-plywood/rp-1.jpg',
        '/assets/raw-plywood/rp-2.jpg',
        '/assets/raw-plywood/rp-3.jpg',
        '/assets/raw-plywood/rp-4.jpg',
        '/assets/raw-plywood/rp-5.jpg',
        '/assets/raw-plywood/rp-6.jpg',
        '/assets/raw-plywood/rp-7.jpg',
        '/assets/raw-plywood/rp-8.jpg',
        '/assets/raw-plywood/rp-9.png',
        '/assets/raw-plywood/rp-10.jpg',
      ]
    },
    'melamine-plywood': {
      folder: 'prefined-melaminated-plywood',
      mainImage: '/assets/prefined-melaminated-plywood/pmp-1.jpg',
      galleryImages: Array.from({length: 31}, (_, i) => {
        const num = i + 1;
        // Skip pmp-32 as it doesn't exist
        if (num === 32) return null;
        if (num > 32) return `/assets/prefined-melaminated-plywood/pmp-${num}.jpg`;
        return `/assets/prefined-melaminated-plywood/pmp-${num}.jpg`;
      }).filter(Boolean) as string[]
    },
    veneer: {
      folder: 'wood-veneer',
      mainImage: '/assets/wood-veneer/wv-1.jpg',
      galleryImages: Array.from({length: 23}, (_, i) => 
        `/assets/wood-veneer/wv-${i + 1}.jpg`
      )
    },
    logs: {
      folder: 'raw-wood-logs',
      mainImage: '/assets/raw-wood-logs/rwl-3.jpg',
      galleryImages: [
        '/assets/raw-wood-logs/rwl-3.jpg'
      ]
    }
  },
  factory: {
    pictures: [
      '/assets/factoty-picture/fp1.jpg',
      '/assets/factoty-picture/fp2.jpg',
      '/assets/factoty-picture/fp3.jpg'
    ],
    videos: [
      '/assets/factory-video/f-video-1.mp4',
      '/assets/factory-video/f-video-2.mp4',
      '/assets/factory-video/f-video-3.mp4',
      '/assets/factory-video/f-video-4.mp4'
    ],
    productionProcess: Array.from({length: 67}, (_, i) => {
      const num = i + 1;
      // Skip missing numbers: 15, 41, 58
      if ([15, 41, 58].includes(num)) return null;
      return `/assets/production-process/pp-${num}.jpg`;
    }).filter(Boolean) as string[],
    processingEquipment: Array.from({length: 28}, (_, i) => {
      const num = i + 1;
      // Skip missing numbers: 7, 8, 14
      if ([7, 8, 14].includes(num)) return null;
      return `/assets/processing-equipments/pe-${num}.jpg`;
    }).filter(Boolean) as string[],
    qualityControl: Array.from({length: 11}, (_, i) => 
      `/assets/quality-control/qc-${i + 1}.jpg`
    ),
    warehouse: [
      '/assets/finished-product-warehouse/fpw-1.jpg',
      '/assets/finished-product-warehouse/fpw-2.jpg'
    ]
  },
  certifications: [
    '/assets/certifications/Cameroon Forest Ministry Autorization.pdf',
    '/assets/certifications/logo.jpg'
  ],
  logo: '/assets/logo.jpg'
};

// Helper function to get product images
export const getProductImages = (productId: string) => {
  const product = imageConfig.products[productId as keyof typeof imageConfig.products];
  return product || null;
};

// Helper function to get random factory images
export const getRandomFactoryImages = (count: number = 3) => {
  const allImages = [
    ...imageConfig.factory.pictures,
    ...imageConfig.factory.productionProcess.slice(0, 10),
    ...imageConfig.factory.processingEquipment.slice(0, 5)
  ];
  
  const shuffled = [...allImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};