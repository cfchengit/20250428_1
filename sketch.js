let capture;

function setup() {
    // 產生全視窗的畫布，背景顏色為 #dde5b6
    createCanvas(windowWidth, windowHeight);
    background('#dde5b6');

    // 擷取攝影機影像
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定寬高為視窗大小的 80%
    capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
    // 將攝影機影像顯示在視窗中間
    image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
    // 當視窗大小改變時，重新調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
    background('#dde5b6');
}
