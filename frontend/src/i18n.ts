import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Company Information
      company_name: "Tropical Wood",
      company_subtitle: "A division of Roilux",
      company_description: "Your premier source for high-quality wood products from Cameroon",
      
      // Navigation
      nav_home: "Home",
      nav_about: "About Us",
      nav_products: "Our Products",
      nav_visit: "Visit Our Company",
      nav_contact: "Contact Us",
      
      // Home Page
      welcome_to: "Welcome to",
      hero_description: "Your premier source for high-quality wood products from Cameroon. From premium plywood to custom veneers, we deliver excellence worldwide.",
      explore_products: "Explore Products",
      schedule_tour: "Schedule Virtual Tour",
      ready_to_order: "Ready to Order?",
      sample_guarantee: "We can ship samples and guarantee quality production",
      view_products: "View Our Products",
      
      // Product Categories
      product_categories: "Our Product Categories",
      plywood: "Plywood",
      melamine: "Prefinished Melamine",
      melamine_plywood: "Prefinished Melamine Plywood",
      veneer: "Wood Veneer",
      logs: "Raw Wood Logs",
      
      // Features
      premium_quality: "Premium Quality",
      premium_quality_desc: "Finest wood products from Cameroon forests",
      custom_solutions: "Custom Solutions",
      custom_solutions_desc: "Tailored to your specific requirements",
      fast_production: "Fast Production",
      fast_production_desc: "50+ containers monthly capacity",
      global_shipping: "Global Shipping",
      global_shipping_desc: "Worldwide delivery available",
      
      // Contact Information
      call_us: "📞 Call Us",
      email_us: "📧 Email Us",
      visit_us: "📍 Visit Us",
      business_hours: "Business Hours",
      monday_friday: "Monday - Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      
      // Forms
      full_name: "Full Name",
      email_address: "Email Address",
      company_field: "Company Name",
      phone_number: "Phone Number",
      subject: "Subject",
      message: "Message",
      send_message: "Send Message",
      required_field: "*",
      
      // Virtual Tour
      virtual_tour_title: "Schedule Your Virtual Tour",
      virtual_tour_desc: "Experience our facilities from anywhere in the world with a personalized virtual tour",
      preferred_date: "Preferred Date",
      preferred_time: "Preferred Time",
      special_requests: "Special Requests or Questions",
      schedule_virtual_tour: "Schedule Virtual Tour",
      
      // Success Messages
      message_sent: "Message sent successfully!",
      tour_booked: "Virtual tour request submitted successfully!",
      contact_soon: "We'll contact you within 24 hours",
      
      // Contact Page
      contact_us_title: "Contact Us",
      contact_us_desc: "Get in touch with Tropical Wood for all your wood product needs. We're here to help!",
      company_information: "Company Information",
      send_us_message: "Send Us a Message",
      connect_with_us: "Connect With Us",
      our_location: "Our Location",
      chat_directly: "Chat with us directly",
      send_inquiries: "Send us your inquiries",
      global_delivery: "Worldwide delivery available",
      
      // Location
      cameroon: "Cameroon",
      abonbang: "Abonbang, Cameroon",
      
      // Language
      language: "Language",
      english: "English",
      french: "Français",
    }
  },
  fr: {
    translation: {
      // Company Information
      company_name: "Tropical Wood",
      company_subtitle: "Une division de Roilux",
      company_description: "Votre source principale pour des produits en bois de haute qualité du Cameroun",
      
      // Navigation
      nav_home: "Accueil",
      nav_about: "À Propos",
      nav_products: "Nos Produits",
      nav_visit: "Visitez Notre Entreprise",
      nav_contact: "Contactez-Nous",
      
      // Home Page
      welcome_to: "Bienvenue chez",
      hero_description: "Votre source principale pour des produits en bois de haute qualité du Cameroun. Du contreplaqué premium aux placages sur mesure, nous livrons l'excellence dans le monde entier.",
      explore_products: "Explorer les Produits",
      schedule_tour: "Planifier une Visite Virtuelle",
      ready_to_order: "Prêt à Commander?",
      sample_guarantee: "Nous pouvons expédier des échantillons et garantir une production de qualité",
      view_products: "Voir Nos Produits",
      
      // Product Categories
      product_categories: "Nos Catégories de Produits",
      plywood: "Contreplaqué",
      melamine: "Mélaminé Préfini",
      melamine_plywood: "Contreplaqué Mélaminé Préfini",
      veneer: "Placage de Bois",
      logs: "Grumes Brutes",
      
      // Features
      premium_quality: "Qualité Premium",
      premium_quality_desc: "Les meilleurs produits en bois des forêts camerounaises",
      custom_solutions: "Solutions Personnalisées",
      custom_solutions_desc: "Adaptées à vos exigences spécifiques",
      fast_production: "Production Rapide",
      fast_production_desc: "Capacité de 50+ conteneurs par mois",
      global_shipping: "Expédition Mondiale",
      global_shipping_desc: "Livraison disponible dans le monde entier",
      
      // Contact Information
      call_us: "📞 Appelez-Nous",
      email_us: "📧 Écrivez-Nous",
      visit_us: "📍 Visitez-Nous",
      business_hours: "Heures d'Ouverture",
      monday_friday: "Lundi - Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
      closed: "Fermé",
      
      // Forms
      full_name: "Nom Complet",
      email_address: "Adresse Email",
      company_field: "Nom de l'Entreprise",
      phone_number: "Numéro de Téléphone",
      subject: "Sujet",
      message: "Message",
      send_message: "Envoyer le Message",
      required_field: "*",
      
      // Virtual Tour
      virtual_tour_title: "Planifiez Votre Visite Virtuelle",
      virtual_tour_desc: "Découvrez nos installations depuis n'importe où dans le monde avec une visite virtuelle personnalisée",
      preferred_date: "Date Préférée",
      preferred_time: "Heure Préférée",
      special_requests: "Demandes Spéciales ou Questions",
      schedule_virtual_tour: "Planifier une Visite Virtuelle",
      
      // Success Messages
      message_sent: "Message envoyé avec succès!",
      tour_booked: "Demande de visite virtuelle soumise avec succès!",
      contact_soon: "Nous vous contacterons dans les 24 heures",
      
      // Contact Page
      contact_us_title: "Contactez-Nous",
      contact_us_desc: "Contactez Tropical Wood pour tous vos besoins en produits de bois. Nous sommes là pour vous aider!",
      company_information: "Informations sur l'Entreprise",
      send_us_message: "Envoyez-Nous un Message",
      connect_with_us: "Connectez-vous avec Nous",
      our_location: "Notre Emplacement",
      chat_directly: "Discutez avec nous directement",
      send_inquiries: "Envoyez-nous vos demandes",
      global_delivery: "Livraison mondiale disponible",
      
      // Location
      cameroon: "Cameroun",
      abonbang: "Abonbang, Cameroun",
      
      // Language
      language: "Langue",
      english: "English",
      french: "Français",
    }
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;