document.addEventListener("DOMContentLoaded", function () {
    const itineraryForm =
        document.getElementById("itineraryForm");

    const itineraryContainer =
        document.getElementById("itineraryContainer");

    const emptyMessage =
        document.getElementById("emptyItinerary");

    const printButton =
        document.getElementById("printItinerary");

    const clearButton =
        document.getElementById("clearItinerary");

    const addActivityButton =
        document.getElementById("addActivity");

    const destinationInput =
        document.getElementById("destination");

    const daysInput =
        document.getElementById("days");

    const budgetInput =
        document.getElementById("budget");

    const interestsInput =
        document.getElementById("interests");

    const travelTypeInput =
        document.getElementById("travelType");


    loadSavedItinerary();


    if (itineraryForm) {
        itineraryForm.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                generateItinerary();
            }
        );
    }


    if (printButton) {
        printButton.addEventListener(
            "click",
            function () {
                window.print();
            }
        );
    }


    if (clearButton) {
        clearButton.addEventListener(
            "click",
            function () {
                clearItinerary();
            }
        );
    }


    if (addActivityButton) {
        addActivityButton.addEventListener(
            "click",
            function () {
                addCustomActivity();
            }
        );
    }


    function generateItinerary() {
        const destination =
            destinationInput
                ? destinationInput.value.trim()
                : "";

        const days =
            daysInput
                ? parseInt(daysInput.value)
                : 0;

        const budget =
            budgetInput
                ? parseFloat(budgetInput.value) || 0
                : 0;

        const interests =
            interestsInput
                ? interestsInput.value.trim()
                : "";

        const travelType =
            travelTypeInput
                ? travelTypeInput.value
                : "";


        if (!destination) {
            showMessage(
                "Please enter a destination.",
                "error"
            );

            return;
        }


        if (!days || days < 1) {
            showMessage(
                "Please enter a valid number of days.",
                "error"
            );

            return;
        }


        if (days > 30) {
            showMessage(
                "Please choose a trip duration of 30 days or less.",
                "error"
            );

            return;
        }


        const itinerary =
            createItinerary(
                destination,
                days,
                budget,
                interests,
                travelType
            );


        displayItinerary(
            itinerary
        );


        saveItineraryData(
            itinerary
        );


        showMessage(
            "Your personalized itinerary has been generated.",
            "success"
        );
    }


    function createItinerary(
        destination,
        days,
        budget,
        interests,
        travelType
    ) {
        const interestList =
            interests
                .split(",")
                .map(function (item) {
                    return item.trim().toLowerCase();
                })
                .filter(Boolean);


        const activities =
            getActivities(
                destination,
                interestList,
                travelType
            );


        const itinerary = {
            destination: destination,
            days: days,
            budget: budget,
            interests: interests,
            travelType: travelType,
            createdAt: new Date().toISOString(),
            schedule: []
        };


        for (let day = 1; day <= days; day++) {
            const dayActivities =
                getDayActivities(
                    activities,
                    day
                );


            itinerary.schedule.push({
                day: day,
                title:
                    day === 1
                        ? "Arrival & Exploration"
                        : day === days
                            ? "Final Day & Departure"
                            : "Explore " + destination,
                activities: dayActivities
            });
        }


        return itinerary;
    }


    function getActivities(
        destination,
        interests,
        travelType
    ) {
        const defaultActivities = [
            {
                time: "08:00 AM",
                title: "Breakfast",
                description:
                    "Start the day with a local breakfast.",
                duration: "1 hour",
                cost: 300
            },
            {
                time: "10:00 AM",
                title: "Local Sightseeing",
                description:
                    "Explore popular attractions and landmarks.",
                duration: "2 hours",
                cost: 500
            },
            {
                time: "01:00 PM",
                title: "Lunch",
                description:
                    "Enjoy local cuisine at a recommended restaurant.",
                duration: "1 hour",
                cost: 400
            },
            {
                time: "03:00 PM",
                title: "Explore the City",
                description:
                    "Visit local markets, streets and cultural areas.",
                duration: "2 hours",
                cost: 400
            },
            {
                time: "06:00 PM",
                title: "Evening Activity",
                description:
                    "Relax and enjoy the evening atmosphere.",
                duration: "2 hours",
                cost: 300
            },
            {
                time: "08:30 PM",
                title: "Dinner",
                description:
                    "Have dinner and experience local food.",
                duration: "1.5 hours",
                cost: 500
            }
        ];


        const destinationActivities = {
            goa: [
                {
                    time: "08:00 AM",
                    title: "Beach Sunrise",
                    description:
                        "Start your morning by the beach.",
                    duration: "1 hour",
                    cost: 0
                },
                {
                    time: "10:00 AM",
                    title: "Beach Exploration",
                    description:
                        "Relax and explore the coastline.",
                    duration: "2 hours",
                    cost: 200
                },
                {
                    time: "01:00 PM",
                    title: "Goan Lunch",
                    description:
                        "Try traditional Goan cuisine.",
                    duration: "1 hour",
                    cost: 500
                },
                {
                    time: "03:00 PM",
                    title: "Water Sports",
                    description:
                        "Enjoy water-based adventure activities.",
                    duration: "2 hours",
                    cost: 1200
                },
                {
                    time: "06:30 PM",
                    title: "Sunset Point",
                    description:
                        "Watch the sunset and relax.",
                    duration: "1 hour",
                    cost: 0
                },
                {
                    time: "08:00 PM",
                    title: "Dinner & Night Market",
                    description:
                        "Enjoy dinner and explore the local market.",
                    duration: "2 hours",
                    cost: 700
                }
            ],

            manali: [
                {
                    time: "07:30 AM",
                    title: "Mountain Breakfast",
                    description:
                        "Enjoy breakfast with a mountain view.",
                    duration: "1 hour",
                    cost: 350
                },
                {
                    time: "09:00 AM",
                    title: "Solang Valley",
                    description:
                        "Explore the scenic mountain valley.",
                    duration: "3 hours",
                    cost: 800
                },
                {
                    time: "01:00 PM",
                    title: "Lunch",
                    description:
                        "Enjoy local Himachali food.",
                    duration: "1 hour",
                    cost: 500
                },
                {
                    time: "03:00 PM",
                    title: "Adventure Activities",
                    description:
                        "Choose from available mountain adventure activities.",
                    duration: "2 hours",
                    cost: 1000
                },
                {
                    time: "06:00 PM",
                    title: "Mall Road",
                    description:
                        "Walk through the local shopping area.",
                    duration: "2 hours",
                    cost: 300
                },
                {
                    time: "08:30 PM",
                    title: "Dinner",
                    description:
                        "Enjoy a warm dinner in the mountains.",
                    duration: "1 hour",
                    cost: 500
                }
            ],

            jaipur: [
                {
                    time: "08:00 AM",
                    title: "Breakfast",
                    description:
                        "Enjoy a traditional Rajasthani breakfast.",
                    duration: "1 hour",
                    cost: 300
                },
                {
                    time: "09:30 AM",
                    title: "Amber Fort",
                    description:
                        "Explore the historic Amber Fort.",
                    duration: "2.5 hours",
                    cost: 500
                },
                {
                    time: "01:00 PM",
                    title: "Rajasthani Lunch",
                    description:
                        "Taste traditional Rajasthani cuisine.",
                    duration: "1 hour",
                    cost: 500
                },
                {
                    time: "03:00 PM",
                    title: "City Palace",
                    description:
                        "Explore Jaipur's historic palace complex.",
                    duration: "2 hours",
                    cost: 500
                },
                {
                    time: "06:00 PM",
                    title: "Local Market",
                    description:
                        "Shop for handicrafts and souvenirs.",
                    duration: "2 hours",
                    cost: 500
                },
                {
                    time: "08:30 PM",
                    title: "Dinner",
                    description:
                        "Enjoy traditional Rajasthani dinner.",
                    duration: "1.5 hours",
                    cost: 600
                }
            ],

            kerala: [
                {
                    time: "07:30 AM",
                    title: "Breakfast",
                    description:
                        "Enjoy a traditional Kerala breakfast.",
                    duration: "1 hour",
                    cost: 300
                },
                {
                    time: "09:00 AM",
                    title: "Backwater Cruise",
                    description:
                        "Relax on a scenic Kerala backwater cruise.",
                    duration: "3 hours",
                    cost: 1200
                },
                {
                    time: "01:00 PM",
                    title: "Kerala Lunch",
                    description:
                        "Taste authentic Kerala cuisine.",
                    duration: "1 hour",
                    cost: 500
                },
                {
                    time: "03:00 PM",
                    title: "Nature Exploration",
                    description:
                        "Explore the surrounding natural scenery.",
                    duration: "2 hours",
                    cost: 300
                },
                {
                    time: "06:00 PM",
                    title: "Sunset Experience",
                    description:
                        "Enjoy the peaceful Kerala sunset.",
                    duration: "1 hour",
                    cost: 0
                },
                {
                    time: "08:00 PM",
                    title: "Dinner",
                    description:
                        "Enjoy a traditional Kerala dinner.",
                    duration: "1.5 hours",
                    cost: 500
                }
            ]
        };


        const key =
            destination
                .toLowerCase()
                .trim();


        if (destinationActivities[key]) {
            return filterActivities(
                destinationActivities[key],
                interests
            );
        }


        return filterActivities(
            defaultActivities,
            interests
        );
    }


    function filterActivities(
        activities,
        interests
    ) {
        if (!interests.length) {
            return activities;
        }


        const matchingActivities =
            activities.filter(function (activity) {

                const text =
                    (
                        activity.title +
                        " " +
                        activity.description
                    ).toLowerCase();


                return interests.some(
                    function (interest) {
                        return text.includes(
                            interest
                        );
                    }
                );
            });


        if (matchingActivities.length >= 3) {
            return matchingActivities;
        }


        return activities;
    }


    function getDayActivities(
        activities,
        day
    ) {
        const result = [];


        activities.forEach(
            function (activity, index) {

                const activityCopy = {
                    id:
                        "day-" +
                        day +
                        "-" +
                        index +
                        "-" +
                        Date.now(),
                    time: activity.time,
                    title: activity.title,
                    description: activity.description,
                    duration: activity.duration,
                    cost: activity.cost
                };


                result.push(
                    activityCopy
                );
            }
        );


        return result;
    }


    function displayItinerary(
        itinerary
    ) {
        if (!itineraryContainer) {
            return;
        }


        itineraryContainer.innerHTML = "";


        if (emptyMessage) {
            emptyMessage.style.display =
                "none";
        }


        const heading =
            document.createElement("div");

        heading.className =
            "itinerary-summary";


        heading.innerHTML = `
            <div class="itinerary-summary-card">
                <h2>${escapeHTML(itinerary.destination)}</h2>
                <p>${itinerary.days} Day Trip</p>
            </div>

            <div class="itinerary-summary-card">
                <h3>Travel Type</h3>
                <p>${escapeHTML(itinerary.travelType || "General")}</p>
            </div>

            <div class="itinerary-summary-card">
                <h3>Budget</h3>
                <p>${formatCurrency(itinerary.budget)}</p>
            </div>
        `;


        itineraryContainer.appendChild(
            heading
        );


        itinerary.schedule.forEach(
            function (day) {

                const dayElement =
                    document.createElement("div");

                dayElement.className =
                    "itinerary-day";


                const activitiesHTML =
                    day.activities
                        .map(function (activity) {

                            return `
                                <div class="itinerary-activity"
                                     data-activity-id="${activity.id}">

                                    <div class="activity-time">
                                        ${escapeHTML(activity.time)}
                                    </div>

                                    <div class="activity-content">
                                        <h4>${escapeHTML(activity.title)}</h4>

                                        <p>
                                            ${escapeHTML(activity.description)}
                                        </p>

                                        <span>
                                            ${escapeHTML(activity.duration)}
                                        </span>

                                        <span>
                                            ${formatCurrency(activity.cost)}
                                        </span>
                                    </div>

                                    <button
                                        class="remove-activity"
                                        data-day="${day.day}"
                                        data-id="${activity.id}">
                                        Remove
                                    </button>

                                </div>
                            `;

                        })
                        .join("");


                dayElement.innerHTML = `
                    <div class="day-header">
                        <div>
                            <span>DAY ${day.day}</span>
                            <h3>${escapeHTML(day.title)}</h3>
                        </div>
                    </div>

                    <div class="day-activities">
                        ${activitiesHTML}
                    </div>
                `;


                itineraryContainer.appendChild(
                    dayElement
                );
            }
        );


        attachRemoveEvents();


        const totalCost =
            calculateTotalCost(
                itinerary
            );


        const totalElement =
            document.createElement("div");


        totalElement.className =
            "itinerary-total";


        totalElement.innerHTML = `
            <h3>Estimated Trip Activity Cost</h3>
            <strong>${formatCurrency(totalCost)}</strong>
        `;


        itineraryContainer.appendChild(
            totalElement
        );
    }


    function attachRemoveEvents() {
        const buttons =
            document.querySelectorAll(
                ".remove-activity"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const day =
                        parseInt(
                            this.dataset.day
                        );

                    const id =
                        this.dataset.id;


                    const itinerary =
                        getSavedItinerary();


                    if (!itinerary) {
                        return;
                    }


                    const dayObject =
                        itinerary.schedule.find(
                            function (item) {
                                return (
                                    item.day === day
                                );
                            }
                        );


                    if (!dayObject) {
                        return;
                    }


                    dayObject.activities =
                        dayObject.activities.filter(
                            function (activity) {
                                return (
                                    activity.id !== id
                                );
                            }
                        );


                    saveItineraryData(
                        itinerary
                    );


                    displayItinerary(
                        itinerary
                    );

                }
            );

        });
    }


    function addCustomActivity() {
        const itinerary =
            getSavedItinerary();


        if (!itinerary) {
            showMessage(
                "Generate an itinerary first.",
                "warning"
            );

            return;
        }


        const activityName =
            prompt(
                "Enter the activity name:"
            );


        if (!activityName) {
            return;
        }


        const description =
            prompt(
                "Enter a short description:"
            ) || "Custom activity";


        const dayNumber =
            parseInt(
                prompt(
                    "Which day should this activity be added to?"
                )
            );


        if (
            !dayNumber ||
            dayNumber < 1 ||
            dayNumber > itinerary.days
        ) {
            showMessage(
                "Invalid day number.",
                "error"
            );

            return;
        }


        const day =
            itinerary.schedule.find(
                function (item) {
                    return (
                        item.day === dayNumber
                    );
                }
            );


        if (!day) {
            return;
        }


        day.activities.push({
            id:
                "custom-" +
                Date.now(),

            time: "Flexible",

            title: activityName,

            description: description,

            duration: "Flexible",

            cost: 0
        });


        saveItineraryData(
            itinerary
        );


        displayItinerary(
            itinerary
        );


        showMessage(
            "Activity added successfully.",
            "success"
        );
    }


    function calculateTotalCost(
        itinerary
    ) {
        let total = 0;


        itinerary.schedule.forEach(
            function (day) {

                day.activities.forEach(
                    function (activity) {

                        total +=
                            Number(
                                activity.cost
                            ) || 0;

                    }
                );

            }
        );


        return total;
    }


    function saveItineraryData(
        itinerary
    ) {
        localStorage.setItem(
            "travelAIItinerary",
            JSON.stringify(itinerary)
        );
    }


    function getSavedItinerary() {
        try {
            const data =
                localStorage.getItem(
                    "travelAIItinerary"
                );


            return data
                ? JSON.parse(data)
                : null;

        } catch (error) {

            console.error(error);

            return null;
        }
    }


    function loadSavedItinerary() {
        const itinerary =
            getSavedItinerary();


        if (itinerary) {
            displayItinerary(
                itinerary
            );
        }
    }


    function clearItinerary() {
        const confirmed =
            confirm(
                "Are you sure you want to clear your itinerary?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "travelAIItinerary"
        );


        if (itineraryContainer) {
            itineraryContainer.innerHTML = "";
        }


        if (emptyMessage) {
            emptyMessage.style.display =
                "";
        }


        showMessage(
            "Itinerary cleared.",
            "success"
        );
    }


    function showMessage(
        message,
        type
    ) {
        if (
            typeof window.showNotification ===
            "function"
        ) {
            window.showNotification(
                message,
                type
            );

            return;
        }


        alert(message);
    }


    function formatCurrency(
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


    function escapeHTML(
        text
    ) {
        const div =
            document.createElement("div");

        div.textContent =
            text == null
                ? ""
                : String(text);

        return div.innerHTML;
    }
});