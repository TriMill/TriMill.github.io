function loadAssets() {
  loadImage('assets/background.png', function(img) {
    bgImage = img;
  }, function(evt) {
    console.error('Failed to load image assets/background.jpg: ', evt);
    bgImage = createImage(80, 32);
  });
  loadImage('assets/bird.png', function(img) {
    birdImage = img;
  }, function(evt) {
    console.error('Failed to load image assets/bird.jpg: ', evt);
    birdImage = createImage(32, 32);
  });
}
