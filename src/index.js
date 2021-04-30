    /**
     * Cavans Clock
     * container: container element
     * width: clock width
     * height: clock height
     */

    const smartClock = (container, width = 200, height = 200) => {
      if (container) {
        /* Create canvas */
        const dom = container.length && container[0] ? container[0] : container;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        dom.appendChild(canvas);

        /* radius & rem */
        const radius = width / 2;
        const rem = width / 200;

        /* Draw background */
        function drawBackground() {
          context.save();
          context.translate(radius, radius);
          context.beginPath();
          context.lineWidth = 6 * rem;
          context.strokeStyle = "#000";
          context.arc(0, 0, radius - 5 * rem, 0, 2 * Math.PI, false);
          context.stroke();
          context.closePath();

          // Loop hours
          const hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
          hourNumbers.forEach(function (number, i) {
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = 18 * rem + "px Arial";
            let rad = ((2 * Math.PI) / 12) * i;
            let x = Math.cos(rad) * (radius - 30 * rem);
            let y = Math.sin(rad) * (radius - 30 * rem);
            context.fillText(number, x, y);
          });

          // Draw scale
          for (let i = 0; i < 60; i++) {
            let rad = ((2 * Math.PI) / 60) * i;
            let x = Math.cos(rad) * (radius - 18 * rem);
            let y = Math.sin(rad) * (radius - 18 * rem);
            context.beginPath();
            if (i % 5 == 0) {
              context.fillStyle = "#000";
              context.arc(x, y, 2 * rem, 0, 2 * Math.PI);
            } else {
              context.fillStyle = "#ccc";
              context.arc(x, y, 2 * rem, 0, 2 * Math.PI);
            }

            context.fill();
            context.closePath();
          }
        }

        /* Draw hour hand */
        function drawHour(hour, minute) {
          context.save();
          context.beginPath();
          context.lineWidth = 4 * rem;
          context.lineCap = "round";
          let rad = ((2 * Math.PI) / 12) * hour;
          let mrad = ((2 * Math.PI) / 12 / 60) * minute;
          context.rotate(rad + mrad);
          context.moveTo(0, 10 * rem);
          context.lineTo(0, -radius / 2);
          context.stroke();
          context.restore();
        }

        /* Draw minute hand */
        function drawMinute(minute) {
          context.save();
          context.beginPath();
          context.lineWidth = 3 * rem;
          context.lineCap = "round";
          let rad = ((2 * Math.PI) / 60) * minute;
          context.rotate(rad);
          context.moveTo(0, 15 * rem);
          context.lineTo(0, -radius + 40 * rem);
          context.stroke();
          context.restore();
        }

        /* Draw second hand */
        function drawSecond(second) {
          context.save();
          context.beginPath();
          context.lineWidth = 2 * rem;
          context.lineCap = "round";
          context.fillStyle = "red";
          let rad = ((2 * Math.PI) / 60) * second;
          context.rotate(rad);
          context.moveTo(-2, 20 * rem);
          context.lineTo(2, 20 * rem);
          context.lineTo(1, -radius + 18 * rem);
          context.lineTo(-1, -radius + 18 * rem);
          context.fill();
          context.restore();
        }

        /* Draw center point */
        function drawDot() {
          context.beginPath();
          context.fillStyle = "#fff";
          context.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
          context.fill();
        }

        /* Draw function */
        function Draw() {
          context.clearRect(0, 0, width, height);
          let time = new Date();
          let hour = time.getHours();
          let minute = time.getMinutes();
          let second = time.getSeconds();
          drawBackground();
          drawHour(hour, minute);
          drawMinute(minute);
          drawSecond(second);
          drawDot();
          context.restore();
        }

        Draw();
        setInterval(Draw, 1000);
      } else {
        console.warn("The container element cannot be empty");
      }
    };
    
    export default smartClock;
