const getLocation = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('location working');
          // console.log(position?.coords);
          resolve({
            Lat: position?.coords?.latitude,
            Lng: position?.coords?.longitude,
            Acc: position?.coords?.accuracy,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("User denied the request for geolocation");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("Location information is unavailable");
              break;
            case error.TIMEOUT:
              reject("Timeout");
              break;
            default:
              reject("An unknown error occurred");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        }
      );
    } else {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          console.log("location not working");

          resolve({
            Lat: data?.latitude,
            Lng: data?.longitude,
          });
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

export default getLocation;
