function loadAssets() {
  loadImage('assets/background1.png', function(img) {
    bgImage1 = img;
  }, function(evt) {
    console.error('Failed to load image assets/background1.jpg: ', evt);
    bgImage1 = createImage(160, 32);
  });
  loadImage('assets/background2.png', function(img) {
    bgImage2 = img;
  }, function(evt) {
    console.error('Failed to load image assets/background2.jpg: ', evt);
    bgImage2 = createImage(160, 32);
  });
  loadImage('assets/bird.png', function(img) {
    birdImage = img;
  }, function(evt) {
    console.error('Failed to load image assets/bird.jpg: ', evt);
    birdImage = createImage(32, 32);
  });
}
