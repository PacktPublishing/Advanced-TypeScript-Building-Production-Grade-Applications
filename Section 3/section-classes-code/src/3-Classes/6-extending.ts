type MarkerStatus = "disabled" | "active" | "pinned";

class Coordinates {
  #lat: number;
  #lng: number;

  constructor(location?: { lat: number; lng: number }) {
    this.#lat = location?.lat ?? 0;
    this.#lng = location?.lng ?? 0;
  }

  get coordinates() {
    return {
      lat: this.#lat,
      lng: this.#lng,
    };
  }

  set coordinates(location) {
    this.#lat = location.lat;
    this.#lng = location.lng;
  }

  relocate = (newLat: number, newLng: number) => {
    this.#lat = newLat;
    this.#lng = newLng;
  };
}

export class MapPin extends Coordinates {
  #markerStatus: MarkerStatus;

  constructor(location?: {
    lat: number;
    lng: number;
    markerStatus?: MarkerStatus;
  }) {
    super(location);
    this.#markerStatus = location?.markerStatus ?? "active";
  }

  disabled = () => {
    this.#markerStatus = "disabled";
  };

  isDisabled = () => {
    return this.#markerStatus === "disabled";
  };

  isActive = () => {
    return this.#markerStatus === "active";
  };

  isPinned = () => {
    return this.#markerStatus === "pinned";
  };
}

const pin = new MapPin({ lat: 10, lng: 10 });
