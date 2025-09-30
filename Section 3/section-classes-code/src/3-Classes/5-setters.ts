export class MapPin {
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

const pin = new MapPin({ lat: 10, lng: 20 });

pin.coordinates = { lat: 10, lng: 20 };
