import { DATA_CENTERS } from "./constants";

/**
 * Calculates the distance between two points using the Haversine formula.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function getNearestDataCenter(userLat: number, userLng: number) {
  let nearest = DATA_CENTERS[0];
  let minDistance = Infinity;

  DATA_CENTERS.forEach(dc => {
    const dist = calculateDistance(userLat, userLng, dc.lat, dc.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = dc;
    }
  });

  return { dataCenter: nearest, distance: minDistance };
}

export function recommendService(distance: number) {
  if (distance < 50) {
    return {
      type: 'Colocation',
      reason: 'Since you are very close to our data center, Colocation is ideal for physical access and low latency.'
    };
  } else if (distance < 500) {
    return {
      type: 'Dedicated Server',
      reason: 'You are within a reasonable range for high-performance dedicated hardware with excellent connectivity.'
    };
  } else {
    return {
      type: 'Cloud VPS',
      reason: 'Cloud VPS offers the best flexibility and performance regardless of your physical distance from the data center.'
    };
  }
}
