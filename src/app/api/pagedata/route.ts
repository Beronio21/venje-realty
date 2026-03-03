import { NextResponse } from "next/server";

const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "/#blog" },
];

const features = [
    {
        id: 1,
        imgSrc: "/images/features/rating.svg",
        title: "Trusted Local Experts",
        description: "Our agents have deep roots in the Philippine real estate market, giving you the insider knowledge to make the best decisions."
    },
    {
        id: 2,
        imgSrc: "/images/features/Give-Women's-Rights.svg",
        title: "Client-First Approach",
        description: "We listen first. Every recommendation we make is tailored to your goals, budget, and lifestyle — no one-size-fits-all solutions."
    },
    {
        id: 3,
        imgSrc: "/images/features/live-chat.svg",
        title: "Always Here to Help",
        description: "From your first inquiry to the final handover, our team is available to guide you every step of the way."
    }
];

const searchOptions = {
    keywords: [
        { value: '', label: 'Keyword', placeholder: 'Keyword' },
    ],
    locations: [
        { value: '', label: 'Location' },
        { value: 'Cagayan de Oro', label: 'Cagayan de Oro' },
        { value: 'Davao', label: 'Davao' },
        { value: 'Cebu', label: 'Cebu' },
        { value: 'Manila', label: 'Manila' },
        { value: 'Quezon City', label: 'Quezon City' },
        { value: 'Makati', label: 'Makati' },
        { value: 'Iloilo', label: 'Iloilo' },
        { value: 'Bacolod', label: 'Bacolod' },
    ],
    category: [
        { value:'', label: 'Category' },
        { value:'apartment', label: 'Apartment' },
        { value:'villa', label: 'Villa' },
        { value:'office', label: 'Office' },
        { value:'shop', label: 'Shop' },
        { value:'house', label: 'House' },
        { value:'warehouse', label: 'Warehouse' },
    ],
    beds: [
        { value: '', label: 'Beds' },
        { value: '1', label: '1 Bed' },
        { value: '2', label: '2 Beds' },
        { value: '3', label: '3 Beds' },
        { value: '4', label: '4 Beds' },
        { value: '5', label: '5 Beds' },
    ],
    garages: [
        { value: '', label: 'Garages' },
        { value: '1', label: '1 Garage' },
        { value: '2', label: '2 Garages' },
    ],
};

const data = [
    {
        src: "https://svgshare.com/i/187L.svg",
        src1: "https://svgshare.com/i/183P.svg",
        alt: "Apartment",
        name: "Apartment",
        count: 35,
    },
    {
        src: "https://svgshare.com/i/188i.svg",
        src1: "https://svgshare.com/i/185B.svg",
        alt: "Villa",
        name: "Villa",
        count: 15,
    },
    {
        src: "https://svgshare.com/i/186r.svg",
        src1: "https://svgshare.com/i/185n.svg",
        alt: "Office",
        name: "Office",
        count: 26,
    },
    {
        src: "https://svgshare.com/i/187Z.svg",
        src1: "https://svgshare.com/i/184b.svg",
        alt: "Shop",
        name: "Shop",
        count: 43,
    },
    {
        src: "https://svgshare.com/i/1881.svg",
        src1: "https://svgshare.com/i/183k.svg",
        alt: "House",
        name: "House",
        count: 95,
    },
    {
        src: "https://svgshare.com/i/188C.svg",
        src1: "https://svgshare.com/i/184d.svg",
        alt: "Warehouse",
        name: "Warehouse",
        count: 18,
    },
];

export const GET = async () => {
  return NextResponse.json({
    menuItems,
    features,
    searchOptions,
    data
  });
};
