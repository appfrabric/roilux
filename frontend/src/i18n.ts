import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Company Information
      company_name: "Tropical Wood",
      company_subtitle: "A division of Roiluxe",
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
      
      // Visit Company Page - Elegant Titles
      virtual_experience: "Virtual Experience",
      behind_the_scenes: "Behind the Scenes", 
      production_mastery: "Production Mastery",
      visit_quality_excellence: "Quality Excellence",
      our_workspace: "Our Workspace",
      facility_tour: "Facility Tour",
      manufacturing_process: "Manufacturing Process",
      equipment_showcase: "Equipment Showcase",
      quality_assurance: "Quality Assurance",
      storage_logistics: "Storage & Logistics",
      factory_tour_description: "Experience the artistry of wood craftsmanship through our immersive virtual tours and detailed facility showcases.",
      schedule_your_visit: "Schedule Your Visit",
      visit_welcome_message: "Whether you prefer an in-person visit or a virtual tour, we invite you to explore our world-class facilities and witness excellence in wood manufacturing.",
      click_to_play: "Click to play",
      
      // Admin and Authentication
      admin_login: "Admin Login",
      username: "Username",
      password: "Password",
      enter_username: "Enter username",
      enter_password: "Enter password",
      logging_in: "Logging in...",
      login: "Login",
      logout: "Logout",
      demo_credentials: "Demo credentials:",
      admin_dashboard: "Admin Dashboard",
      contact_requests: "Contact Requests",
      tour_requests: "Tour Requests",
      no_requests: "No requests found",
      contact_details: "Contact Details",
      tour_details: "Tour Details",
      basic_information: "Basic Information",
      name: "Name",
      message_details: "Message Details",
      admin_special_requests: "Special Requests",
      select_request: "Select a request to view details",
      delete: "Delete",
      
      // About Us Page
      about_us: "About Us",
      about_tropical_wood: "About Tropical Wood",
      about_description_1: "Tropical Wood, a division of Roiluxe, is a leading supplier of premium wood products from Cameroon, specializing in plywood, melamine, veneers, and raw logs. With years of experience in the timber industry, we have established ourselves as a trusted partner for businesses worldwide.",
      about_description_2: "Our state-of-the-art facilities and skilled craftsmen ensure that every product meets the highest quality standards. We pride ourselves on our ability to deliver custom solutions tailored to our clients' specific needs.",
      about_description_3: "From sustainable sourcing to timely delivery, we manage every aspect of the supply chain to provide you with exceptional wood products that exceed expectations.",
      our_values: "Our Values",
      quality_excellence: "Quality Excellence",
      quality_excellence_desc: "We maintain the highest standards in wood selection and processing",
      sustainable_practices: "Sustainable Practices",
      sustainable_practices_desc: "Committed to responsible forestry and environmental protection",
      customer_focus: "Customer Focus",
      customer_focus_desc: "Your satisfaction is our top priority",
      global_reach: "Global Reach",
      global_reach_desc: "Serving customers worldwide with reliable shipping",
      why_choose_us: "Why Choose Tropical Wood?",
      production_capacity: "Production Capacity",
      over_50_containers: "Over 50 containers monthly capacity",
      immediate_production: "Immediate production capability",
      custom_sizing: "Custom sizing and specifications",
      about_quality_assurance: "Quality Assurance",
      sample_shipping: "Sample shipping available",
      factory_visits: "Factory visits welcomed",
      certified_practices: "Certified sustainable practices",
      experience_difference: "Experience the Tropical Wood Difference",
      satisfied_customers: "Join hundreds of satisfied customers who trust Tropical Wood for their timber needs",
      explore_products_btn: "Explore Products",
      visit_factory: "Visit Our Factory",
      
      // Products Page
      our_products: "Our Products",
      products_description: "Discover our comprehensive range of high-quality wood products from Cameroon",
      our_guarantee: "Our Guarantee",
      ship_samples: "We can ship samples for quality verification",
      visit_factories: "Visit our factories for in-person inspection",
      immediate_capability: "Immediate production capability",
      monthly_capacity: "Capacity of over 50 40ft containers per month",
      plywood_desc: "Premium, marine, and structural plywood from 1mm to 3cm thick",
      melamine_desc: "Various colors with custom color requests supported",
      melamine_plywood_desc: "High-quality melamine-faced plywood in various finishes",
      veneer_desc: "Different thicknesses, all types of Cameroon wood",
      logs_desc: "High-quality raw logs from sustainable sources",
      available_woods: "Available Woods:",
      view_gallery: "View Gallery",
      
      // Contact Page Additional (Non-duplicated keys only)
      message_sent_success: "Message Sent Successfully!",
      thank_you_contact: "Thank you for contacting Tropical Wood. We'll get back to you within 24 hours.",
      send_another_message: "Send Another Message",
      address: "Address:",
      phone: "Phone:",
      email: "Email:",
      monday_friday_hours: "Monday - Friday",
      eight_six: "8:00 AM - 6:00 PM",
      saturday_hours: "Saturday",
      eight_two: "8:00 AM - 2:00 PM",
      sunday_hours: "Sunday",
      all_times_wat: "All times in West Africa Time (WAT)",
      whatsapp: "WhatsApp",
      heart_of_cameroon: "Located in the heart of Cameroon's timber region",
      view_google_maps: "View on Google Maps",
      select_subject: "Select a subject",
      product_inquiry: "Product Inquiry",
      quote_request: "Quote Request",
      technical_support: "Technical Support",
      partnership_opportunity: "Partnership Opportunity",
      general_information: "General Information",
      other: "Other",
      tell_us_requirements: "Tell us about your requirements, questions, or how we can help you...",
    }
  },
  fr: {
    translation: {
      // Company Information
      company_name: "Tropical Wood",
      company_subtitle: "Une division de Roiluxe",
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
      
      // Visit Company Page - Elegant Titles  
      virtual_experience: "Expérience Virtuelle",
      behind_the_scenes: "Dans les Coulisses",
      production_mastery: "Maîtrise de Production",
      visit_quality_excellence: "Excellence Qualité", 
      our_workspace: "Notre Espace de Travail",
      facility_tour: "Visite des Installations",
      manufacturing_process: "Processus de Fabrication",
      equipment_showcase: "Exposition d'Équipements",
      quality_assurance: "Assurance Qualité",
      storage_logistics: "Stockage et Logistique",
      factory_tour_description: "Découvrez l'art de l'artisanat du bois à travers nos visites virtuelles immersives et nos présentations détaillées d'installations.",
      schedule_your_visit: "Planifiez Votre Visite",
      visit_welcome_message: "Que vous préfériez une visite en personne ou une visite virtuelle, nous vous invitons à explorer nos installations de classe mondiale et à être témoin de l'excellence dans la fabrication du bois.",
      click_to_play: "Cliquez pour jouer",
      
      // Admin and Authentication
      admin_login: "Connexion Admin",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      enter_username: "Entrez le nom d'utilisateur",
      enter_password: "Entrez le mot de passe",
      logging_in: "Connexion...",
      login: "Se connecter",
      logout: "Se déconnecter",
      demo_credentials: "Identifiants de démonstration:",
      admin_dashboard: "Tableau de Bord Admin",
      contact_requests: "Demandes de Contact",
      tour_requests: "Demandes de Visite",
      no_requests: "Aucune demande trouvée",
      contact_details: "Détails du Contact",
      tour_details: "Détails de la Visite",
      basic_information: "Informations de Base",
      name: "Nom",
      message_details: "Détails du Message",
      admin_special_requests: "Demandes Spéciales",
      select_request: "Sélectionnez une demande pour voir les détails",
      delete: "Supprimer",
      
      // About Us Page
      about_us: "À Propos",
      about_tropical_wood: "À Propos de Tropical Wood",
      about_description_1: "Tropical Wood, une division de Roiluxe, est un fournisseur leader de produits en bois premium du Cameroun, spécialisé dans le contreplaqué, mélaminé, placages et grumes brutes. Avec des années d'expérience dans l'industrie du bois, nous nous sommes établis comme un partenaire de confiance pour les entreprises du monde entier.",
      about_description_2: "Nos installations de pointe et nos artisans qualifiés garantissent que chaque produit répond aux plus hauts standards de qualité. Nous sommes fiers de notre capacité à livrer des solutions personnalisées adaptées aux besoins spécifiques de nos clients.",
      about_description_3: "De l'approvisionnement durable à la livraison ponctuelle, nous gérons chaque aspect de la chaîne d'approvisionnement pour vous fournir des produits en bois exceptionnels qui dépassent les attentes.",
      our_values: "Nos Valeurs",
      quality_excellence: "Excellence Qualité",
      quality_excellence_desc: "Nous maintenons les plus hauts standards dans la sélection et le traitement du bois",
      sustainable_practices: "Pratiques Durables",
      sustainable_practices_desc: "Engagés dans la foresterie responsable et la protection environnementale",
      customer_focus: "Orientation Client",
      customer_focus_desc: "Votre satisfaction est notre priorité absolue",
      global_reach: "Portée Mondiale",
      global_reach_desc: "Servir les clients du monde entier avec des expéditions fiables",
      why_choose_us: "Pourquoi Choisir Tropical Wood?",
      production_capacity: "Capacité de Production",
      over_50_containers: "Capacité de plus de 50 conteneurs par mois",
      immediate_production: "Capacité de production immédiate",
      custom_sizing: "Dimensionnement et spécifications personnalisés",
      about_quality_assurance: "Assurance Qualité",
      sample_shipping: "Expédition d'échantillons disponible",
      factory_visits: "Visites d'usine bienvenues",
      certified_practices: "Pratiques durables certifiées",
      experience_difference: "Découvrez la Différence Tropical Wood",
      satisfied_customers: "Rejoignez des centaines de clients satisfaits qui font confiance à Tropical Wood pour leurs besoins en bois",
      explore_products_btn: "Explorer les Produits",
      visit_factory: "Visitez Notre Usine",
      
      // Products Page
      our_products: "Nos Produits",
      products_description: "Découvrez notre gamme complète de produits en bois de haute qualité du Cameroun",
      our_guarantee: "Notre Garantie",
      ship_samples: "Nous pouvons expédier des échantillons pour vérification de qualité",
      visit_factories: "Visitez nos usines pour inspection en personne",
      immediate_capability: "Capacité de production immédiate",
      monthly_capacity: "Capacité de plus de 50 conteneurs 40ft par mois",
      plywood_desc: "Contreplaqué premium, marine et structurel de 1mm à 3cm d'épaisseur",
      melamine_desc: "Diverses couleurs avec demandes de couleurs personnalisées supportées",
      melamine_plywood_desc: "Contreplaqué mélaminé de haute qualité dans diverses finitions",
      veneer_desc: "Différentes épaisseurs, tous types de bois camerounais",
      logs_desc: "Grumes brutes de haute qualité provenant de sources durables",
      available_woods: "Bois Disponibles:",
      view_gallery: "Voir la Galerie",
      
      // Contact Page Additional (Non-duplicated keys only)
      message_sent_success: "Message Envoyé avec Succès!",
      thank_you_contact: "Merci de contacter Tropical Wood. Nous vous répondrons dans les 24 heures.",
      send_another_message: "Envoyer un Autre Message",
      address: "Adresse:",
      phone: "Téléphone:",
      email: "Email:",
      monday_friday_hours: "Lundi - Vendredi",
      eight_six: "8h00 - 18h00",
      saturday_hours: "Samedi",
      eight_two: "8h00 - 14h00",
      sunday_hours: "Dimanche",
      all_times_wat: "Toutes les heures en heure d'Afrique de l'Ouest (WAT)",
      whatsapp: "WhatsApp",
      heart_of_cameroon: "Situé au cœur de la région forestière du Cameroun",
      view_google_maps: "Voir sur Google Maps",
      select_subject: "Sélectionnez un sujet",
      product_inquiry: "Demande de Produit",
      quote_request: "Demande de Devis",
      technical_support: "Support Technique",
      partnership_opportunity: "Opportunité de Partenariat",
      general_information: "Informations Générales",
      other: "Autre",
      tell_us_requirements: "Parlez-nous de vos exigences, questions, ou comment nous pouvons vous aider...",
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