import { img } from 'framer-motion/client';
import Wishlist_imag1 from '../assets/image/Wishlist_imag1.png'
import Wishlist_imag2 from '../assets/image/Wishlist_imag2.png'
import Wishlist_imag3 from '../assets/image/Wishlist_imag3.png'

import {
  ArrowTrendingUpIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
//book cover
import Cover_image from '../assets/image/Cover_image.png'
import Cover_image1 from '../assets/image/Cover_image1.png'
import Cover_image2 from '../assets/image/Cover_image2.png'
import Cover_image3 from '../assets/image/Cover_image3.png'
import Cover_image4 from '../assets/image/Cover_image4.png'
import Cover_image5 from '../assets/image/Cover_image5.png'
import { Route } from 'react-router-dom';



export const stats = [
  {
    title: "Total Purchases",
    value: 8,
    icon: ArrowTrendingUpIcon,
    bg: "bg-blue-100",
    iconBg: "bg-[#608CDF]",
    iconColor: "text-white",
    route:"/ebooks_user_page?tab=purchased",
  },
  {
    title: "eBooks in Library",
    value: 24,
    icon: BookOpenIcon,
    bg: "bg-emerald-100",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    route:"/ebooks_user_page?tab=all",
  },
  {
    title: "Total Downloads",
    value: 52,
    icon: ArrowDownTrayIcon,
    bg: "bg-amber-100",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    route:"/ebooks_user_page?download",
  },
  {
    title: "Books Wishlisted",
    value: 12,
    icon: BookmarkIcon,
    bg: "bg-purple-100",
    iconBg: "bg-purple-500",
    iconColor: "text-white",
    route:"/home_user_page/books_wishlisted" ,
  },
];

//book cover
export const cover = [
  {
    id: 1,
    title: "Digital Marketing 101",
    author: "Sarah Adams",
    price: "$12.99",
    image: Cover_image,
    category: "Business",
  },
  {
    id: 2,
    title: "Python Programming",
    author: "Alex Turner",
    price: "$9.99",
    image: Cover_image1,
    category: "Programming",
  },
  {
    id: 3,
    title: "Startup Guide",
    author: "Lisa Thompson",
    price: "Free",
    image: Cover_image2,
    category: "Self-Improvement",
  },
  {
    id: 4,
    title: "Healthy Eating",
    author: "Emily Clark",
    price: "$4.99",
    image: Cover_image3,
    category: "Health",
  },
  {
    id: 5,
    title: "Meditation for Beginners",
    author: "Mark Reynolds",
    price: "$6.99",
    image:Cover_image4,
    category: "Science Fiction",
  },
   {
    id: 6,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
  {
    id: 7,
    title: "Healthy Eating",
    author: "Emily Clark",
    price: "$4.99",
    image: Cover_image3,
    category: "Programming",
  },
  {
    id: 8,
    title: "Meditation for Beginners",
    author: "Mark Reynolds",
    price: "$6.99",
    image:Cover_image4,
    category: "Programming",
  },
   {
    id: 9,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
   {
    id: 10,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
    {
    id: 11,
    title: "Digital Marketing 101",
    author: "Sarah Adams",
    price: "$12.99",
    image: Cover_image,
    category: "Business",
  },
  {
    id: 12,
    title: "Python Programming",
    author: "Alex Turner",
    price: "$9.99",
    image: Cover_image1,
    category: "Programming",
  },
  {
    id: 13,
    title: "Startup Guide",
    author: "Lisa Thompson",
    price: "Free",
    image: Cover_image2,
    category: "Self-Improvement",
  },
  {
    id: 14,
    title: "Healthy Eating",
    author: "Emily Clark",
    price: "$4.99",
    image: Cover_image3,
    category: "Health",
  },
  {
    id: 15,
    title: "Meditation for Beginners",
    author: "Mark Reynolds",
    price: "$6.99",
    image:Cover_image4,
    category: "Science Fiction",
  },
   {
    id: 16,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
  {
    id: 17,
    title: "Healthy Eating",
    author: "Emily Clark",
    price: "$4.99",
    image: Cover_image3,
    category: "Programming",
  },
  {
    id: 18,
    title: "Meditation for Beginners",
    author: "Mark Reynolds",
    price: "$6.99",
    image:Cover_image4,
    category: "Programming",
  },
   {
    id: 19,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
   {
    id: 20,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
     {
    id: 21,
    title: "Python Programming",
    author: "Alex Turner",
    price: "Free",
    image: Cover_image5,
    category: "Programming",
    
  },
  
];

export const wishlist = [
  {
    title: "Machine Learning Made Easy",
    author: "Robert Lee",
    price: "$14.99",
    image: Wishlist_imag1,
  },
  {
    title: "Learn JavaScript",
    author: "David White",
    price: "Free",
    image: Wishlist_imag2,
  },
  {
    title: "Time Management",
    author: "Laura Smith",
    price: "$6.99",
    image: Wishlist_imag3,
  },
];


export const booksData = [
  {
    id: 1,
    title: "Machine Learning Made Easy",
    author: "Robert Lee",
    price: "$14.99",
    image: Cover_image2,
    paid: true,
  },
  {
    id: 2,
    title: "Learn JavaScript",
    author: "David White",
    price: "Free",
    image: Cover_image3,
    paid: false,
  },
  {
    id: 3,
    title: "Startup Guide",
    author: "Lisa Thompson",
    price: "$9.99",
    image: Cover_image4,
    paid: true,
  },
  {
    id: 4,
    title: "Time Management",
    author: "Laura Smith",
    price: "Free",
    image: Cover_image5,
    paid: false,
  },
];


export const initialItems = [
  {
    id: 1,
    title: "Python Programming",
    author: "Alex Turner",
    price: 9.99,
    image: Cover_image4 ,
    qty: 1,
  },
  {
    id: 2,
    title: "Digital Marketing 101",
    author: "Sarah Adams",
    price: 12.99,
    image: Cover_image5,
    qty: 1,
  },
];