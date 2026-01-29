export default function LocalSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "PetGroomingService",
        "name": "Hairy Home 毛孩之家",
        "image": "https://hairyhome.com/logo.webp",
        "@id": "https://hairyhome.com",
        "url": "https://hairyhome.com",
        "telephone": "+601139968999",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "102A,B,C, Jalan Jejaka, Maluri",
            "addressLocality": "Cheras",
            "addressRegion": "Kuala Lumpur",
            "postalCode": "55100",
            "addressCountry": "MY"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 3.1268738,
            "longitude": 101.7310649
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "11:00",
            "closes": "19:00"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
