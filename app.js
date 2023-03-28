class ProgressBar extends HTMLElement {
  static css = `
        :host {
            display: flex;
            align-items: center;
            width: 250px;
            height: 40px;
            background: #eeeeee;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            border-radius: 5px;
            border-style: groove;
        }

        .fill {
          position: absolute;
            width: 0%;
            height: 100%;
            background: var(--fill-color, #324593);
        }
        .labelPercent {
          padding-left: 5px;
          position: relative;
          z-index: 1;
          
        }
    `;

  static get observedAttributes() {
    return ["percent"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    const fill = document.createElement("div");
    let label = document.createElement("label");
    style.innerHTML = ProgressBar.css;
    fill.classList.add("fill");
    label.classList.add("labelPercent");
    this.shadowRoot.append(style, fill, label);
    this.width = 0;
    this.interval;
  }

  render() {
    let elem = this.shadowRoot.querySelector(".fill");
    let labelPercent = this.shadowRoot.querySelector(".labelPercent");
    elem.style.width = this.width + `%`;
    labelPercent.textContent = this.width + `%`;
  }

  start() {
    const frame = () => {
      if (this.width >= 100) {
        clearInterval(this.interval);
      } else {
        this.width++;
        this.render();
      }
    };
    clearInterval(this.interval);
    this.interval = setInterval(frame, 20);
  }

  pause() {
    clearInterval(this.interval);
  }

  stop() {
    clearInterval(this.interval);
    this.width = 0;
    this.render();
  }
}

customElements.define("progress-bar", ProgressBar);

const progressBar = document.getElementById("progress_bar");
const buttonStart = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonPause = document.getElementById("pause");

buttonPause.addEventListener("click", () => {
  progressBar.pause();
});
buttonStart.addEventListener("click", () => {
  progressBar.start();
});
buttonStop.addEventListener("click", () => {
  progressBar.stop();
});
progressBar.start();
