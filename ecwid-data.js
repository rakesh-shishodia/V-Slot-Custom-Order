// ecwid-data.js

(function(global) {
    const storeId   = '2442119';
    const authToken = 'public_ZYgkrwhM5YFDC4jU3PmTuzqkRRXmbamH';
    // in the order you want them displayed
    const productIds = [
      720289517, 720294005, 720294011, 721461094,
      720294122, 720278992, 122128747, 382203788, 409974620, 409998038
    ];
    // standard lengths formerly in extrusions.json
    const standardLengths = [
      500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
      5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
      10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000,
      15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000,
      20500, 21000, 21500, 22000, 22500, 23000, 23500, 24000, 24500, 25000,
      25500, 26000, 26500, 27000, 27500, 28000, 28500, 29000, 29500, 30000,
      30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000, 34500, 35000,
      35500, 36000, 36500, 37000, 37500, 38000, 38500, 39000, 39500, 40000,
      40500, 41000, 41500, 42000, 42500, 43000, 43500, 44000, 44500, 45000,
      45500, 46000, 46500, 47000, 47500, 48000, 48500, 49000, 49500, 50000
    ];
  
    /**
     * Fetch all specified products from Ecwid and
     * normalize into the shape your app expects.
     * Returns a Promise<Extrusion[]>
     */
    function fetchAll() {
      // fetch each product individually, exactly as in your test.html
      const fetches = productIds.map(id => {
        const url = `https://app.ecwid.com/api/v3/${storeId}/products/${id}?responseFields=id,sku,inStock,name,price,media,categories,description,attributes`;
        console.log('EcwidData.fetchAll URL:', url);
        return fetch(
          url,
          { headers: { 'Authorization': 'Bearer ' + authToken } }
        ).then(res => {
          if (!res.ok) throw new Error(`Ecwid fetch failed: ${res.status}`);
          return res.json();
        });
      });
    
      // once all are fetched, normalize into your Extrusion[] shape
      return Promise.all(fetches)
        .then(items => {
          //console.log('RAW ATTRIBUTES FOR FIRST ITEM:', items[0].attributes);
          console.log('EcwidData.fetchAll raw items:', items);
          return items.map(item => {
            // build attribute lookup
            const attrMap = {};
            (item.attributes || []).forEach(a => {
              attrMap[a.name] = a.value;
            });
    
            // sort & pick up to 4 images
            const imgs = (item.media.images || [])
              .sort((a, b) => a.orderBy - b.orderBy)
              .slice(0, 4);
            // sort & pick up to videos
            const videos = (item.media.videos || [])
            .sort((a, b) => a.orderBy - b.orderBy)
            .map(v => v.videourl);
    
            return {
              id:               item.id,
              name:             item.name,
              inStock:          item.inStock,
              videos:           videos,
              images:           imgs.map(i => i.image400pxUrl || ''),
              thumbnailUrl:     imgs[0]?.image400pxUrl || '',
              secondaryImageUrl: imgs[1]?.image400pxUrl || '',
              // Ecwid price is for 1000 mm; convert to per-mm
              baseCostPerMm:    item.price / 1000,
              holesPerSide:     Number(attrMap['holes-per-side'] || 0),
              // your filters
              attributes: {
                type:   attrMap['type']   || '',
                series: attrMap['series'] || '',
                color:  attrMap['color']  || ''
              },
              descriptionHtml:  item.description || ''
            };
          });
        });
    }
  
    // expose globally so your index.html can call EcwidData.fetchAll()
    global.EcwidData = {
      fetchAll,
      productIds,
      standardLengths
    };
  
  })(window);