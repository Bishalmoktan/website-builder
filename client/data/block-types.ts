import { BlockType } from "../types";
import {
  MapPin,
  Camera,
  Users,
  Star,
  Compass,
  Plane,
  Mountain,
  Waves,
  Sun,
  Calendar,
} from "lucide-react";

export const blockTypes: BlockType[] = [
  {
    _id: "hero",
    name: "Hero Section",
    icon: Mountain,
    category: "headers",
    defaultContent: {
      title: "Discover Amazing Destinations",
      subtitle:
        "Create unforgettable memories with our curated travel experiences",
      backgroundImage:
        "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Start Exploring",
      buttonLink: "#destinations",
    },
    defaultStyle: {
      textColor: "#ffffff",
      overlayOpacity: 0.4,
      alignment: "center",
      height: "100vh",
    },
  },
  {
    _id: "destinations",
    name: "Destinations Grid",
    icon: MapPin,
    category: "content",
    defaultContent: {
      title: "Popular Destinations",
      destinations: [
        {
          id: "1",
          name: "Santorini, Greece",
          image:
            "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=400",
          description:
            "Experience the stunning sunsets and white-washed buildings.",
          price: "$1,299",
        },
        {
          id: "2",
          name: "Bali, Indonesia",
          image:
            "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400",
          description:
            "Discover tropical paradise with rich culture and beautiful beaches.",
          price: "$899",
        },
        {
          id: "3",
          name: "Machu Picchu, Peru",
          image:
            "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=400",
          description:
            "Explore ancient Incan ruins high in the Andes mountains.",
          price: "$1,599",
        },
      ],
    },
    defaultStyle: {
      backgroundColor: "#f8fafc",
      columns: 3,
      spacing: "2rem",
    },
  },
  {
    _id: "testimonials",
    name: "Testimonials",
    icon: Users,
    category: "social",
    defaultContent: {
      title: "What Our Travelers Say",
      testimonials: [
        {
          id: "1",
          name: "Sarah Johnson",
          location: "New York",
          avatar:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
          text: "The trip to Santorini was absolutely magical! Every detail was perfectly planned.",
          rating: 5,
        },
        {
          id: "2",
          name: "Michael Chen",
          location: "California",
          avatar:
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
          text: "Outstanding service and unforgettable experiences. Highly recommend!",
          rating: 5,
        },
      ],
    },
    defaultStyle: {
      backgroundColor: "#ffffff",
      textAlign: "center",
    },
  },
  {
    _id: "gallery",
    name: "Photo Gallery",
    icon: Camera,
    category: "media",
    defaultContent: {
      title: "Travel Gallery",
      images: [
        {
          id: "1",
          url: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400",
          alt: "Beautiful mountain landscape",
          caption: "Mountain Adventure",
        },
        {
          id: "2",
          url: "https://images.pexels.com/photos/1450340/pexels-photo-1450340.jpeg?auto=compress&cs=tinysrgb&w=400",
          alt: "Tropical beach scene",
          caption: "Beach Paradise",
        },
        {
          id: "3",
          url: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400",
          alt: "City skyline at sunset",
          caption: "Urban Exploration",
        },
      ],
    },
    defaultStyle: {
      layout: "grid",
      columns: 3,
      spacing: "1rem",
    },
  },
  {
    _id: "features",
    name: "Features",
    icon: Star,
    category: "content",
    defaultContent: {
      title: "Why Choose Us",
      features: [
        {
          id: "1",
          icon: "Compass",
          title: "Expert Guides",
          description: "Local experts who know every hidden gem and story.",
        },
        {
          id: "2",
          icon: "Plane",
          title: "Seamless Travel",
          description:
            "All logistics handled so you can focus on enjoying your trip.",
        },
        {
          id: "3",
          icon: "Calendar",
          title: "Flexible Planning",
          description:
            "Customize your itinerary to match your interests and schedule.",
        },
      ],
    },
    defaultStyle: {
      backgroundColor: "#f1f5f9",
      layout: "horizontal",
      iconSize: "3rem",
    },
  },
  {
    _id: "cta",
    name: "Call to Action",
    icon: Compass,
    category: "conversion",
    defaultContent: {
      title: "Ready for Your Next Adventure?",
      subtitle:
        "Book your dream vacation today and create memories that last a lifetime.",
      buttonText: "Book Now",
      buttonLink: "#contact",
      backgroundImage:
        "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    defaultStyle: {
      textColor: "#ffffff",
      overlayOpacity: 0.6,
      alignment: "center",
      padding: "5rem 0",
    },
  },
];
