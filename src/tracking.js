import shipments from "./shipment";

const TRACKING_DURATION_HOURS = 30;
const HOUR = 60 * 60 * 1000;

export function getShipmentStatus(registeredAt) {
  const elapsedHours = (Date.now() - registeredAt) / HOUR;

  if (elapsedHours < 1) {
    return { stage: 0, status: "Registered" };
  }

  if (elapsedHours < 6) {
    return { stage: 1, status: "Dispatched" };
  }

  if (elapsedHours < TRACKING_DURATION_HOURS) {
    return { stage: 2, status: "In Transit" };
  }

  return {
    stage: 3,
    status: "Arrived in Destination Country",
  };
}

export function findShipment(trackingNumber) {
  const normalizedNumber = trackingNumber.trim().toUpperCase();

  const shipment = shipments.find(
    (item) => item.trackingNumber.toUpperCase() === normalizedNumber
  );

  if (!shipment) return null;

  return {
    ...shipment,
    ...getShipmentStatus(shipment.registeredAt),
    estimatedArrival:
      shipment.registeredAt + TRACKING_DURATION_HOURS * HOUR,
  };
}