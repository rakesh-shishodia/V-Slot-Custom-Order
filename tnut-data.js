// ecwid-data.js

(function(global) {
    const storeId   = '2442119';
    const authToken = 'public_ZYgkrwhM5YFDC4jU3PmTuzqkRRXmbamH';
    // in the order you want them displayed
    const productIds = [543524343, 756260024];
  
    /**
     * Fetch all specified products from Ecwid and
     * normalize into the shape your app expects.
     * Returns a Promise<Extrusion[]>
     */
    function fetchAll() {
      // fetch each product individually, exactly as in your test.html
      const fetches = productIds.map(id => {
        const url = `https://app.ecwid.com/api/v3/${storeId}/products/${id}?responseFields=id,sku,inStock,name,price,media,categories,description,attributes,options`;
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
              descriptionHtml:  item.description || '',
              attributes: {
                type:   attrMap['Type of T Nut'] || '',
                compatibleSeries: attrMap['Compatible Extrusions'] || ''
              },
              options:          item.options || []
            };
          });
        });
    }
  
    // expose globally so your index.html can call EcwidData.fetchAll()
    global.EcwidData = {
      fetchAll,
      productIds
    };
  
  })(window);