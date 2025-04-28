let capture;
let graphics;

function setup() {
    // 產生全視窗的畫布，背景顏色為 #dde5b6
    createCanvas(windowWidth, windowHeight);
    background('#dde5b6');

    // 擷取攝影機影像
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定寬高為視窗大小的 80%
    capture.hide(); // 隱藏原始的 HTML 視訊元素

    // 建立與攝影機影像相同大小的 graphics
    graphics = createGraphics(capture.width, capture.height);
    graphics.background(255, 0, 0, 100); // 設定 graphics 的背景為半透明紅色
    graphics.fill(255);
    graphics.textSize(20);
    graphics.textAlign(CENTER, CENTER);
    graphics.text('這是我的影像', graphics.width / 2, graphics.height / 2); // 在 graphics 上繪製文字
}

function draw() {
    // 將畫布背景設為 #dde5b6
    background('#dde5b6');

    // 將攝影機影像左右顛倒後顯示在視窗中間
    push();
    translate(width / 2, height / 2); // 將原點移到畫布中心
    scale(-1, 1); // 左右翻轉影像
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();

    // 將 graphics 顯示在攝影機影像上方
    image(graphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
    // 當視窗大小改變時，重新調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
    background('#dde5b6');
}
