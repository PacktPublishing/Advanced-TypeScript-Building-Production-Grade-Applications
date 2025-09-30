function relocate(
  this: { lat: number; lng: number },
  lat: number,
  lng: number
) {
  this.lat = lat;
  this.lng = lng;
}

const coordinates = {
  lat: 0,
  lng: 0,

  relocate(this: { lat: number; lng: number }, lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  },
};

coordinates.relocate(10, 10);
