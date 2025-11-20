let spaceData = {};

async function loadData() {
    try {
        const response = await fetch('data.json');
        spaceData = await response.json();
        console.log('Awesome! Data loaded successfully!');
        console.log(spaceData);
        return spaceData;
    } catch (error) {
        console.log('Oops! Something went wrong loading the data:', error);
    }
}


loadData();


// CHALLENGE 1: Count how many destinations we have
// RESTRICTION use Only for, while, and standard logic.
function countTotalDestinations() {
    return spaceData.destinations.length;
}

// CHALLENGE 2: Find destinations that are available for booking
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function getAvailableDestinations() {
    return spaceData.destinations;
}

// CHALLENGE 3: Get the very first booking in our system
// RESTRICTION use Only for, while, and standard logic.
function getFirstBooking() {
    return spaceData.bookings[0];
}

// CHALLENGE 4: Calculate how much money we've made from all bookings
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function calculateTotalRevenue() {
    let total = 0;
    for (let booking of spaceData.bookings) {
        total += booking.totalPrice;
    }
    return total;
}

// CHALLENGE 5: Find a user by their email address
// RESTRICTION use Only for, while, and standard logic.
function findUserByEmail(email) {
    for (let user of spaceData.users) {
        if (user.email === email) return user;
    }
    return null; // not found
}

// CHALLENGE 6: Count all passengers across every booking
// RESTRICTION use Only for, while, and standard logic.
function countTotalPassengers() {
    let total = 0;
    for (let booking of spaceData.bookings) {
        total += booking.passengers.length;
    }
    return total;
}

// CHALLENGE 7: Group bookings by their status (confirmed, pending, etc.)
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function groupBookingsByStatus() {
    // We want an object that looks like:
    // {
    //   confirmed: [booking1, booking2...],
    //   pending: [booking3...]
    // }
    let obj = {};
    for (let booking of spaceData.bookings) {
        if (!obj[booking.status]) obj[booking.status] = [];
        obj[booking.status].push(booking);
    }
    return obj;
}

// CHALLENGE 8: Find the most expensive booking
// RESTRICTION use Only for, while, and standard logic.
function findMostExpensiveBooking() {
    let maxBooking = spaceData.bookings[0];
    for (let booking of spaceData.bookings) {
        if (maxBooking.totalPrice < booking.totalPrice) maxBooking = booking;
    }
    return maxBooking;
}

// CHALLENGE 9: Create a simple summary of all bookings
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function getBookingSummary() {
    // We want to make each booking simpler - just show:
    // id, destination, number of passengers, and total price
    let newBookings = [];
    for (let booking of spaceData.bookings) {
        let obj = {"id" : booking.id, "destination" : booking.destination,
            "numberOfPassengers" : booking.passengers.length, "totalPrice" : booking.totalPrice};
        newBookings.push(obj);
    }
    return newBookings;
}

// CHALLENGE 10: Update a booking's status
// RESTRICTION use Only for, while, and standard logic.
function    updateBookingStatus(bookingId, newStatus) {
    for (let booking of spaceData.bookings) {
        if (bookingId === booking.id) {
            booking.status = newStatus;
            return booking;
        }
    }
    return null; // not found
}


// CHALLENGE 11: Calculate how much money each destination has made
// RESTRICTION use Only for, while, and standard logic.
function calculateRevenueByDestination() {
    // We want an object that shows total revenue for each destination:
    // { 'Moon Base Alpha': 195000, 'Mars Colony One': 250000 }
    let total = 0;
    for (let destination of spaceData.destinations) {
        total += destination.basePrice;
    }
    return total;
}

// CHALLENGE 12: Find which user has made the most bookings
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function findUserWithMostBookings() {
    let maxUser = spaceData.users[0];
    for (let user of spaceData.users) {
        if (user.totalBookings > maxUser.totalBookings)
            maxUser = user;
    }
    return maxUser;
}

// CHALLENGE 13: Find bookings between specific dates
// RESTRICTION use Only for, while, and standard logic.
function filterBookingsByDate(startDate, endDate) {
    let bookingsList = [];
    for (let booking of spaceData.bookings) {
        const curDate = booking.travelDate;
        if (curDate >= startDate && curDate <= endDate) bookingsList.push(booking);
    }
    return bookingsList;
}

// CHALLENGE 14: Get a list of all passenger names from all bookings
// NO RESTRICTION You are encouraged to use map, filter, reduce, and Object.keys/Object.values/Object.entries where appropriate.
function getAllPassengerNames() {
    let names = new Set();
    for (let booking of spaceData.bookings) {
        for(let passenger of booking.passengers)
            names.add(passenger["name"]);
    }
    return names;
}

// CHALLENGE 15: Add a new booking with proper validation
// RESTRICTION use Only for, while, and standard logic.
let lastBookingId = 7; 
function addNewBooking(bookingData) {
  
    if (!bookingData.userId || !bookingData.destinationId || !bookingData.package
        ||!bookingData.destinationId || !bookingData.destination || !bookingData.passengers
        ||!bookingData.travelDate || !bookingData.returnDate || !bookingData.totalPrice)
            throw new Error("missing booking data");

    for (passenger of bookingData.passengers) {
        if (!passenger.name || !passenger.age) 
            throw new Error("missing passenger data");
    }
    if (bookingData.travelDate > bookingData.returnDate) 
        throw new Error("invalid travel and return dates");     

    lastBookingId++;
    bookingData.lastBookingId++;
    spaceData.bookings.push(bookingData);
    return spaceData.bookings;
}

// ========================
// SOLUTIONS' TEST
// ========================


async function testAllChallenges() {
 
    await loadData();
    
    console.log('TESTing !\n');
    
    console.log('LEVEL 1:');
    console.log('1. How many destinations?', countTotalDestinations());
    console.log('2. Available destinations:', getAvailableDestinations());
    console.log('3. First booking ever:', getFirstBooking());
    console.log('4. Total money made:', calculateTotalRevenue());
    console.log('5. Find John Smith:', findUserByEmail('john.smith@email.com'));
    
    console.log('\nLEVEL 2:');
    console.log('6. Total passengers:', countTotalPassengers());
    console.log('7. Bookings by status:', groupBookingsByStatus());
    console.log('8. Most expensive trip:', findMostExpensiveBooking());
    console.log('9. Booking summaries:', getBookingSummary());
    console.log('10. Update booking:', updateBookingStatus('BK001', 'cancelled'));
    
    console.log('\nLEVEL 3:');
    console.log('11. Money per destination:', calculateRevenueByDestination());
    console.log('12. Most bookings by:', findUserWithMostBookings());
    console.log('13. March bookings:', filterBookingsByDate('2024-03-01', '2024-04-01'));
    console.log('14. All passenger names:', getAllPassengerNames());
    
    // Try adding a new booking
    try {
        const newBooking = {
            userId: 'user456',
            destinationId: 2,
            destination: 'Mars Colony One',
            package: 'basic',
            passengers: [{ name: 'Bob Wilson', age: 45 }],
            travelDate: '2023-07-01',
            returnDate: '2024-07-03',
            totalPrice: 250000,
            status: 'pending'
        };
        console.log('15. Add new booking:', addNewBooking(newBooking));
    } catch (error) {
        console.log('15. Failed to add booking:', error.message);
    }
}



// console.log('Pro tip: Open browser console and type testAllChallenges() to check your work!');