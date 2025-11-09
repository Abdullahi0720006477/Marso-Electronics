export interface SiteSettings {
    siteName: string;
    tagline: string;
    contactEmail: string;
    location: string;
    paymentNumber: string;
    maintenanceMode: boolean;
}
  
export const settings: SiteSettings = {
    siteName: 'Marso Electronic',
    tagline: 'Innovation at Your Fingertips',
    contactEmail: 'abdullahideeer@gmail.com',
    location: 'Nairobi, Kenya',
    paymentNumber: '0720006477',
    maintenanceMode: false,
};