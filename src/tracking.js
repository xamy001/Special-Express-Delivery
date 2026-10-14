// src/tracking.js

const shipments = [
  {
    trackingNumber: "6624",
    origin: "Manchester, England 🇬🇧",
    destination: "Bogota, Colombia 🇨🇴",
    registrationTime: "2026-10-14T11:00:00",
    estimatedArrival: "2026-10-15T19:00:00", // Exactly 32 hours total transit
    sender: "Maurice Abba El Doroyii",
    receiver: "Shirley Guerrero Martinez",
    date: "14/10/2026",
    notes: "Transatlantic Air Cargo — Direct Transit to Bogota, Colombia."
  }
];

export function findShipment(number) {
  const shipment = shipments.find((s) => s.trackingNumber === number);
  if (!shipment) return null;

  const now = new Date();
  const regTime = new Date(shipment.registrationTime);
  const arrivalTime = new Date(shipment.estimatedArrival);

  let stage = 0;
  let status = "Registered";

  // Calculate stage progress automatically based on real time:
  // Stage 0: Registered
  // Stage 1: Dispatched (starts 3 hours after registration)
  // Stage 2: In Transit (starts 6 hours after registration)
  // Stage 3: Arrived in destination country (locked permanently after 32 hours)

  const hoursElapsed = (now - regTime) / (1000 * 60 * 60);

  if (now >= arrivalTime) {
    stage = 3;
    status = "Arrived in destination country";
  } else if (hoursElapsed >= 6) {
    stage = 2;
    status = "In Transit";
  } else if (hoursElapsed >= 3) {
    stage = 1;
    status = "Dispatched";
  } else {
    stage = 0;
    status = "Registered";
  }

  return {
    ...shipment,
    stage,
    status,
  };
}