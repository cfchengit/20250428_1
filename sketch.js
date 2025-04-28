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

    // 更新 graphics
    graphics.background(0); // 設定背景為黑色
    for (let x = 0; x < graphics.width; x += 20) {
        for (let y = 0; y < graphics.height; y += 20) {
            // 從攝影機影像中取得顏色
            let col = capture.get(x, y);
            let g = green(col); // 取得 G 值
            graphics.fill(0, g, 100); // 設定方框顏色，R 為 0，B 固定為 100
            graphics.noStroke();
            graphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，寬高為 18

            // 在方框中間繪製黑色圓
            graphics.fill(0); // 圓的顏色為黑色
            graphics.ellipse(x + 10, y + 10, 5, 5); // 繪製圓形，寬高為 5
        }
    }

    // 將 graphics 顯示在攝影機影像上方
    image(graphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
    // 當視窗大小改變時，重新調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
    background('#dde5b6');
}
