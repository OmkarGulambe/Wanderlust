maptilersdk.config.apiKey = mapToken;
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element in which the SDK will render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [16.62662018, 49.2125578], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    const marker = new maptilersdk.Marker()
      .setLngLat([16.62662018, 49.2125578])
      .addTo(map);

      // maptilerClient.config.apiKey = "YOUR_MAPTILER_API_KEY_HERE";

      // const results = await maptilersdk.geocoding.forward(urlParams.get('new delhi'));
      // console.log(results)

      map.on('click', async (e) => {
        console.log(e);
        const {lng, lat} = e.lngLat;
        const results = await maptilersdk.geocoding.reverse([lng, lat]);
        
      });
      

    