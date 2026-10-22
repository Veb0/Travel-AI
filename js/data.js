const travelData = {
    destinations: [
        {
            id: 1,
            name: "Goa",
            state: "Goa, India",
            category: "Beach",
            budget: "Medium",
            price: 18000,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
            description: "A coastal destination famous for beaches, water sports, Portuguese heritage and nightlife.",
            interests: ["beach", "adventure", "nightlife", "food"],
            bestTime: "November to February",
            duration: "3-5 Days"
        },
        {
            id: 2,
            name: "Manali",
            state: "Himachal Pradesh, India",
            category: "Mountain",
            budget: "Medium",
            price: 22000,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
            description: "A Himalayan destination offering mountains, adventure activities, nature and peaceful surroundings.",
            interests: ["mountains", "adventure", "nature", "couple"],
            bestTime: "October to June",
            duration: "4-6 Days"
        },
        {
            id: 3,
            name: "Jaipur",
            state: "Rajasthan, India",
            category: "Heritage",
            budget: "Low",
            price: 15000,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
            description: "The Pink City is known for historic forts, palaces, markets, architecture and Rajasthani culture.",
            interests: ["history", "culture", "heritage", "shopping", "food"],
            bestTime: "October to March",
            duration: "3-4 Days"
        },
        {
            id: 4,
            name: "Kerala",
            state: "Kerala, India",
            category: "Nature",
            budget: "Medium",
            price: 20000,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
            description: "Known for peaceful backwaters, lush greenery, beaches, traditional food and relaxing experiences.",
            interests: ["nature", "beach", "food", "relaxation", "couple"],
            bestTime: "October to March",
            duration: "4-6 Days"
        },
        {
            id: 5,
            name: "Mumbai",
            state: "Maharashtra, India",
            category: "City",
            budget: "Medium",
            price: 17000,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=80",
            description: "A vibrant metropolitan city with iconic landmarks, beaches, entertainment and diverse cuisine.",
            interests: ["city", "food", "shopping", "nightlife"],
            bestTime: "November to February",
            duration: "2-4 Days"
        },
        {
            id: 6,
            name: "Udaipur",
            state: "Rajasthan, India",
            category: "Heritage",
            budget: "Medium",
            price: 19000,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
            description: "A romantic heritage destination famous for lakes, palaces, architecture and scenic views.",
            interests: ["heritage", "history", "couple", "culture"],
            bestTime: "October to March",
            duration: "3-5 Days"
        },
        {
            id: 7,
            name: "Ooty",
            state: "Tamil Nadu, India",
            category: "Mountain",
            budget: "Low",
            price: 12000,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
            description: "A peaceful hill station surrounded by tea gardens, forests, lakes and pleasant weather.",
            interests: ["mountains", "nature", "family", "relaxation"],
            bestTime: "October to June",
            duration: "2-4 Days"
        },
        {
            id: 8,
            name: "Munnar",
            state: "Kerala, India",
            category: "Nature",
            budget: "Low",
            price: 14000,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
            description: "A beautiful hill destination with tea plantations, waterfalls, wildlife and scenic landscapes.",
            interests: ["nature", "mountains", "family", "couple"],
            bestTime: "September to May",
            duration: "3-5 Days"
        },
        {
            id: 9,
            name: "Rishikesh",
            state: "Uttarakhand, India",
            category: "Adventure",
            budget: "Low",
            price: 13000,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1590050752117-23a9d7fc2d8c?auto=format&fit=crop&w=900&q=80",
            description: "A destination for river rafting, yoga, spirituality, trekking and outdoor adventures.",
            interests: ["adventure", "nature", "spirituality", "trekking"],
            bestTime: "September to November",
            duration: "2-4 Days"
        },
        {
            id: 10,
            name: "Andaman",
            state: "Andaman and Nicobar Islands, India",
            category: "Beach",
            budget: "High",
            price: 35000,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
            description: "A tropical island destination offering beaches, coral reefs, snorkeling and water adventures.",
            interests: ["beach", "adventure", "couple", "relaxation"],
            bestTime: "October to May",
            duration: "5-7 Days"
        },
        {
            id: 11,
            name: "Delhi",
            state: "Delhi, India",
            category: "City",
            budget: "Low",
            price: 11000,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
            description: "India's capital combines historic monuments, modern attractions, markets and diverse cuisine.",
            interests: ["history", "city", "food", "shopping"],
            bestTime: "October to March",
            duration: "2-4 Days"
        },
        {
            id: 12,
            name: "Agra",
            state: "Uttar Pradesh, India",
            category: "Heritage",
            budget: "Low",
            price: 10000,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
            description: "A historic city known for the Taj Mahal and other Mughal-era architectural attractions.",
            interests: ["history", "heritage", "culture", "photography"],
            bestTime: "October to March",
            duration: "1-3 Days"
        }
    ],

    categories: [
        "All",
        "Beach",
        "Mountain",
        "Heritage",
        "Nature",
        "Adventure",
        "City"
    ],

    travelTypes: [
        "Solo",
        "Couple",
        "Family",
        "Friends"
    ],

    budgets: [
        {
            name: "Low",
            min: 5000,
            max: 15000
        },
        {
            name: "Medium",
            min: 15001,
            max: 25000
        },
        {
            name: "High",
            min: 25001,
            max: 50000
        }
    ],

    interests: [
        "Beach",
        "Mountains",
        "Nature",
        "Adventure",
        "History",
        "Heritage",
        "Culture",
        "Food",
        "Shopping",
        "Nightlife",
        "Relaxation",
        "Photography",
        "Spirituality",
        "Trekking"
    ],

    activities: {
        morning: [
            {
                title: "Breakfast",
                description: "Enjoy a local breakfast and prepare for the day.",
                duration: "1 hour",
                cost: 300
            },
            {
                title: "Sightseeing",
                description: "Explore popular attractions and landmarks.",
                duration: "2 hours",
                cost: 500
            },
            {
                title: "Nature Walk",
                description: "Enjoy a peaceful walk through scenic surroundings.",
                duration: "1.5 hours",
                cost: 100
            }
        ],

        afternoon: [
            {
                title: "Local Lunch",
                description: "Try popular local dishes and regional cuisine.",
                duration: "1 hour",
                cost: 400
            },
            {
                title: "Museum Visit",
                description: "Discover the history and culture of the destination.",
                duration: "2 hours",
                cost: 300
            },
            {
                title: "Shopping",
                description: "Explore local markets and shops.",
                duration: "2 hours",
                cost: 500
            }
        ],

        evening: [
            {
                title: "Sunset View",
                description: "Relax and enjoy a beautiful sunset.",
                duration: "1 hour",
                cost: 0
            },
            {
                title: "Local Market",
                description: "Explore the evening market and local culture.",
                duration: "2 hours",
                cost: 300
            },
            {
                title: "Cultural Experience",
                description: "Experience local art, music or cultural activities.",
                duration: "2 hours",
                cost: 500
            }
        ],

        night: [
            {
                title: "Dinner",
                description: "Enjoy a local dinner.",
                duration: "1.5 hours",
                cost: 500
            },
            {
                title: "Nightlife",
                description: "Explore the destination's evening entertainment.",
                duration: "2 hours",
                cost: 700
            },
            {
                title: "Relax at Hotel",
                description: "Rest and prepare for the next day.",
                duration: "1 hour",
                cost: 0
            }
        ]
    },

    users: [],

    sampleReviews: [
        {
            name: "Rahul",
            rating: 5,
            comment: "Beautiful destination and very useful recommendations."
        },
        {
            name: "Priya",
            rating: 4,
            comment: "The itinerary made planning the trip much easier."
        },
        {
            name: "Arun",
            rating: 5,
            comment: "Great travel suggestions and simple interface."
        }
    ]
};


function getDestinationById(id) {
    return travelData.destinations.find(
        function (destination) {
            return destination.id === Number(id);
        }
    );
}


function getDestinationByName(name) {
    if (!name) {
        return null;
    }

    return travelData.destinations.find(
        function (destination) {
            return (
                destination.name.toLowerCase() ===
                name.toLowerCase()
            );
        }
    );
}


function getDestinationsByCategory(category) {
    if (!category || category === "All") {
        return travelData.destinations;
    }

    return travelData.destinations.filter(
        function (destination) {
            return (
                destination.category.toLowerCase() ===
                category.toLowerCase()
            );
        }
    );
}


function getDestinationsByBudget(budget) {
    if (!budget) {
        return travelData.destinations;
    }

    const selectedBudget =
        travelData.budgets.find(
            function (item) {
                return (
                    item.name.toLowerCase() ===
                    budget.toLowerCase()
                );
            }
        );

    if (!selectedBudget) {
        return travelData.destinations;
    }

    return travelData.destinations.filter(
        function (destination) {
            return (
                destination.price >= selectedBudget.min &&
                destination.price <= selectedBudget.max
            );
        }
    );
}


function getDestinationsByInterest(interest) {
    if (!interest) {
        return travelData.destinations;
    }

    return travelData.destinations.filter(
        function (destination) {
            return destination.interests.some(
                function (item) {
                    return (
                        item.toLowerCase() ===
                        interest.toLowerCase()
                    );
                }
            );
        }
    );
}


function getPersonalizedRecommendations(
    preferences
) {
    if (!preferences) {
        return travelData.destinations.slice(
            0,
            6
        );
    }

    const budget =
        preferences.budget || "";

    const interests =
        Array.isArray(preferences.interests)
            ? preferences.interests
            : [];

    const travelType =
        preferences.travelType || "";

    const filtered =
        travelData.destinations.map(
            function (destination) {

                let score = 0;

                if (
                    budget &&
                    destination.budget.toLowerCase() ===
                    budget.toLowerCase()
                ) {
                    score += 30;
                }

                interests.forEach(
                    function (interest) {
                        if (
                            destination.interests.some(
                                function (item) {
                                    return (
                                        item.toLowerCase() ===
                                        interest.toLowerCase()
                                    );
                                }
                            )
                        ) {
                            score += 20;
                        }
                    }
                );

                if (
                    travelType.toLowerCase() ===
                    "couple" &&
                    destination.interests.includes(
                        "couple"
                    )
                ) {
                    score += 15;
                }

                if (
                    travelType.toLowerCase() ===
                    "family" &&
                    destination.interests.includes(
                        "family"
                    )
                ) {
                    score += 15;
                }

                if (
                    travelType.toLowerCase() ===
                    "solo" &&
                    destination.interests.includes(
                        "adventure"
                    )
                ) {
                    score += 10;
                }

                score +=
                    destination.rating * 5;

                return {
                    ...destination,
                    recommendationScore: score
                };
            }
        );

    return filtered
        .sort(
            function (a, b) {
                return (
                    b.recommendationScore -
                    a.recommendationScore
                );
            }
        )
        .slice(0, 6);
}


function getActivitiesForInterest(
    interest
) {
    const allActivities = [
        ...travelData.activities.morning,
        ...travelData.activities.afternoon,
        ...travelData.activities.evening,
        ...travelData.activities.night
    ];

    if (!interest) {
        return allActivities;
    }

    const keyword =
        interest.toLowerCase();

    const matching =
        allActivities.filter(
            function (activity) {
                return (
                    activity.title
                        .toLowerCase()
                        .includes(keyword) ||
                    activity.description
                        .toLowerCase()
                        .includes(keyword)
                );
            }
        );

    return matching.length
        ? matching
        : allActivities;
}


function saveTravelData(
    key,
    value
) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


function getTravelData(
    key,
    defaultValue = null
) {
    try {
        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}


function removeTravelData(key) {
    localStorage.removeItem(key);
}


function formatTravelCurrency(
    amount
) {
    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(
        Number(amount) || 0
    );
}