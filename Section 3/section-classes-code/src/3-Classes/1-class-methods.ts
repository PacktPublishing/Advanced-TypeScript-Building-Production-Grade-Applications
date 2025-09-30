export class MapPin {
  lat = 0;
  lng = 0;

  relocate = (lat: number, lng: number) => {
    this.lat = lat;
    this.lng = lng;
  };
}

const pin = new MapPin();

pin.relocate(20, 30);
