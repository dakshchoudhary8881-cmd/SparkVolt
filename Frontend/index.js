// ════════════════════════════════
// NAVIGATION & HISTORY MANAGEMENT
// ════════════════════════════════
let navigationHistory = ["home"];
let currentPage = "home";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize history management
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.page) {
      showPageWithoutHistory(e.state.page, e.state.param);
    } else {
      showPageWithoutHistory("home");
    }
  });

  // Prevent escape by replacing initial history
  history.replaceState({ page: "home" }, "", "#home");
});

function navigateTo(page, param = null) {
  closeMobileMenu();
  closeCart();

  if (page === "category" && param) {
    showCatPageWithHistory(param);
  } else if (page === "home") {
    showPageWithHistory("home");
  } else {
    showPageWithHistory(page, param);
  }
}

function showPageWithHistory(id, param = null) {
  history.pushState(
    { page: id, param: param },
    "",
    "#" + id + (param ? "/" + param : ""),
  );
  showPageWithoutHistory(id, param);
}

function showPageWithoutHistory(id, param = null) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  currentPage = id;
  updateNavigation(id, param);
}

function updateNavigation(page, param = null) {
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));

  if (page === "home") {
    document.getElementById("nl-home")?.classList.add("active");
  } else if (page === "category" && param) {
    const map = {
      Microcontrollers: "nl-mc",
      Sensors: "nl-sensors",
      Wireless: "nl-wireless",
      Kits: "nl-kits",
      Tools: "nl-tools",
      all: null,
    };
    if (map[param])
      document.getElementById(map[param])?.classList.add("active");
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById("navLinks");
  const overlay = document.getElementById("mobileMenuOverlay");
  const hamburger = document.getElementById("hamburger");

  menu.classList.toggle("open");
  overlay.classList.toggle("open");
  hamburger.classList.toggle("active");
}

function closeMobileMenu() {
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("mobileMenuOverlay").classList.remove("open");
  document.getElementById("hamburger").classList.remove("active");
}

// Legacy function compatibility
function showPage(id) {
  showPageWithHistory(id);
}

function showCatPage(cat) {
  showCatPageWithHistory(cat);
}

function showCatPageWithHistory(cat) {
  currentCat = cat || "all";
  priceLimit = 4000;
  showPageWithHistory("category", cat);
  const pr = document.getElementById("priceRange");
  if (pr) {
    pr.value = 4000;
    document.getElementById("priceVal").textContent = "4000";
  }
  const info =
    currentCat === "all"
      ? { name: "All Products", sub: "Browse our complete catalog" }
      : {
          name: currentCat,
          sub: `${products.filter((p) => p.cat === currentCat).length} products in this category`,
        };
  document.getElementById("catBreadcrumb").textContent = info.name;
  document.getElementById("catPageTitle").textContent = info.name;
  document.getElementById("catPageSub").textContent = info.sub;
  renderSidebar();
  renderCatProducts();
  updateNavigation("category", cat);
}

// ════════════════════════════════
// DATA
// ════════════════════════════════
const products = [
  {
    id: 1,
    name: "Arduino Uno R3",
    cat: "Microcontrollers",
    price: 299,
    orig: 349,
    badge: "Bestseller",
    badgeType: "badge-pop",
    image: "images/Microcontrollers/Arduino UNO R3.webp",
    desc: "The iconic ATmega328P board. 14 digital I/O, 6 analog inputs, USB via ATmega16U2. Perfect for beginners and prototyping.",
    specs: {
      MCU: "ATmega328P",
      Clock: "16 MHz",
      Flash: "32 KB",
      "Digital I/O": "14",
      "Analog In": "6",
      Voltage: "5V",
    },
  },
  {
    id: 2,
    name: "Arduino Nano V3",
    cat: "Microcontrollers",
    price: 199,
    orig: 249,
    badge: "Sale",
    badgeType: "badge-sale",
    image: "images/Microcontrollers/Arduino NANO V3.jpeg",
    desc: "Compact ATmega328 board. Breadboard friendly, USB mini-B, same power as Uno in a tiny package.",
    specs: {
      MCU: "ATmega328",
      Clock: "16 MHz",
      Flash: "32 KB",
      Pins: "22",
      Size: "18×45mm",
      USB: "Mini-B",
    },
  },
  {
    id: 3,
    name: "Arduino Mega 2560",
    cat: "Microcontrollers",
    price: 599,
    orig: 699,
    badge: "",
    badgeType: "",
    image: "images/Microcontrollers/Arduino Mega 2560.jpeg",
    desc: "High-performance AVR board with 54 digital I/O pins and 16 analog inputs. Ideal for complex projects.",
    specs: {
      MCU: "ATmega2560",
      Clock: "16 MHz",
      Flash: "256 KB",
      "Digital I/O": "54",
      "Analog In": "16",
      UART: "4",
    },
  },
  {
    id: 4,
    name: "ESP32 Dev Board",
    cat: "Microcontrollers",
    price: 449,
    orig: 499,
    badge: "Hot",
    badgeType: "badge-hot",
    desc: "Dual-core LX6 at 240MHz, built-in WiFi 802.11 b/g/n and Bluetooth 4.2 BLE. 34 GPIO, hall sensor, touch sensor.",
    image: "images/Microcontrollers/ESP34 DEVBOARD.jpeg",
    specs: {
      CPU: "Dual LX6",
      Clock: "240 MHz",
      Flash: "4 MB",
      WiFi: "802.11 b/g/n",
      BT: "4.2 BLE",
      GPIO: "34",
    },
  },
  {
    id: 5,
    name: "ESP32-C3",
    cat: "Microcontrollers",
    price: 349,
    orig: 399,
    badge: "Hot",
    badgeType: "badge-pop",
    image: "images/Microcontrollers/ESP 32-C3.jpeg",
    desc: "Built around a 32-bit RISC-V Single-Core processor. It uses 3.3V logic, meaning its pins output 3.3V and can be damaged by 5V signals. It is highly efficient, featuring built-in Wi-Fi and Bluetooth 5.0 (LE), but has fewer GPIO pins than the original ESP32.",
    specs: {
      MCU: "RISC-V Single-Core",
      Clock: "160 MHz",
      Flash: "4MB",
      "Digital I/O": "22",
      "Analog In": "6",
      Voltage: "5V",
    },
  },
  {
    id: 6,
    name: "ESP8266 NodeMCU",
    cat: "Microcontrollers",
    price: 149,
    orig: 199,
    badge: "Sale",
    badgeType: "badge-sale",
    image: "images/Microcontrollers/ESP8266 NodeMCU.jpeg",
    desc: "Low-cost WiFi module with full TCP/IP stack. Popular for IoT and smart home projects.",
    specs: {
      CPU: "Tensilica L106",
      Clock: "80/160 MHz",
      Flash: "4 MB",
      WiFi: "802.11 b/g/n",
      GPIO: "11",
      ADC: "1",
    },
  },
  {
    id: 7,
    name: "Raspberry Pi Zero 2W",
    cat: "Microcontrollers",
    price: 799,
    orig: 849,
    badge: "New",
    badgeType: "badge-new",
    image: "images/Microcontrollers/Raspberry Pi Zero 2W.jpeg",
    desc: "Quad-core ARM Cortex-A53, 512MB LPDDR2, 2.4GHz WiFi, BT 4.2. Full Linux in 65×30mm.",
    specs: {
      CPU: "Quad A53",
      Clock: "1 GHz",
      RAM: "512 MB",
      WiFi: "2.4GHz",
      BT: "4.2 BLE",
      GPIO: "40-pin",
    },
  },
  {
    id: 8,
    name: "STM32 Blue Pill",
    cat: "Microcontrollers",
    price: 189,
    orig: 229,
    badge: "",
    badgeType: "",
    image: "images/Microcontrollers/STM32 Blue Pill.jpeg",
    desc: "ARM Cortex-M3 at 72MHz. 64KB flash, 20KB RAM. USB, SPI, I2C, UART. Great for performance-critical projects.",
    specs: {
      MCU: "STM32F103C8T6",
      Core: "Cortex-M3",
      Clock: "72 MHz",
      Flash: "64 KB",
      RAM: "20 KB",
      USB: "Full speed",
    },
  },
  {
    id: 9,
    name: "ATtiny85 DIP",
    cat: "Microcontrollers",
    price: 49,
    orig: 69,
    badge: "",
    badgeType: "",
    image: "images/Microcontrollers/ATtiny85 DIP.jpeg",
    desc: "Tiny 8-pin AVR microcontroller. 8KB flash, 6 I/O pins. Ideal for space-constrained projects.",
    specs: {
      MCU: "ATtiny85",
      Clock: "8 MHz",
      Flash: "8 KB",
      "I/O Pins": "6",
      Package: "DIP-8",
      Voltage: "1.8–5.5V",
    },
  },
  {
    id: 9.1,
    name: "NUCLEO-F446RE",
    cat: "Microcontrollers",
    price: 349,
    orig: 399,
    badge: "New",
    badgeType: "badge-new",
    image: "Images/Microcontrollers/NUCLEO-F446RE.jpeg",
    desc: "STM32F446 Nucleo-144 development board. 180MHz ARM Cortex-M4, USB, multiple interfaces.",
    specs: {
      MCU: "STM32F446RET6",
      Core: "Cortex-M4",
      Clock: "180 MHz",
      Flash: "512 KB",
      RAM: "128 KB",
      Pins: "144",
    },
  },
  {
    id: 9.2,
    name: "Arduino MKR WiFi 1010",
    cat: "Microcontrollers",
    price: 599,
    orig: 699,
    badge: "Hot",
    badgeType: "badge-hot",
    image: "images/Microcontrollers/Arduino MKR WiFi 1010.jpeg",
    desc: "IoT maker board with WiFi, 32-bit ARM processor, crypto chip. Cloud connectivity.",
    specs: {
      MCU: "SAMD21",
      Clock: "48 MHz",
      RAM: "32 KB",
      WiFi: "802.11b/g/n",
      Crypto: "Built-in",
      Battery: "Supported",
    },
  },
  {
    id: 9.3,
    name: "Teensy 4.1",
    cat: "Microcontrollers",
    price: 749,
    orig: 849,
    badge: "Popular",
    badgeType: "badge-pop",
    image: "images/Microcontrollers/Teensy 4.1.jpeg",
    desc: "High-performance 600MHz ARM Cortex-M7. USB host, SD card, Ethernet. Real-time audio/video.",
    specs: {
      MCU: "i.MX RT1062",
      Clock: "600 MHz",
      Flash: "8 MB",
      RAM: "1 MB",
      USB: "Host+Device",
      Ethernet: "Yes",
    },
  },
  {
    id: 9.4,
    name: "PIC32MZ2048ECH",
    cat: "Microcontrollers",
    price: 359,
    orig: 429,
    badge: "",
    badgeType: "",
    image: "images/Microcontrollers/PIC32MZ2048ECH.jpeg",
    desc: "Microchip 32-bit microcontroller. 200MHz, 2MB flash, USB 2.0, extensive connectivity options.",
    specs: {
      MCU: "PIC32MZ",
      Clock: "200 MHz",
      Flash: "2048 KB",
      USB: "2.0 Full-Speed",
      GPIO: "100+",
      Voltage: "3.3V",
    },
  },
  {
    id: 10,
    name: "DHT22 Sensor",
    cat: "Sensors",
    price: 89,
    orig: 109,
    badge: "",
    badgeType: "",
    image: "Images/Sensors/DHT22 Sensor.jpeg",
    desc: "High-accuracy digital temp & humidity. ±0.5°C temp, ±2% RH. Single-wire interface, 3.3–6V.",
    specs: {
      "Temp Range": "-40 to 80°C",
      "Temp Acc.": "±0.5°C",
      Humidity: "0–100% RH",
      "Hum. Acc.": "±2% RH",
      Interface: "1-Wire",
      Voltage: "3.3–6V",
    },
  },
  {
    id: 11,
    name: "HC-SR04 Ultrasonic",
    cat: "Sensors",
    price: 79,
    orig: 99,
    badge: "",
    badgeType: "",
    image: "images/Sensors/HC-SR04 Ultrasonic.webp",
    desc: "Non-contact distance sensor, 2–400cm range, ±3mm accuracy. 40kHz ultrasonic pulses.",
    specs: {
      Range: "2–400 cm",
      Accuracy: "±3 mm",
      Frequency: "40 kHz",
      "Beam Angle": "15°",
      Voltage: "5V",
      Interface: "Trig+Echo",
    },
  },
  {
    id: 12,
    name: "MPU-6050 IMU",
    cat: "Sensors",
    emoji: "🎯",
    price: 119,
    orig: 149,
    badge: "",
    badgeType: "",
    image: "images/Sensors/MPU-6050 IMU.jpeg",
    desc: "6-axis MEMS IMU — 3-axis accelerometer + 3-axis gyroscope on one chip. I2C, built-in DMP. For drones & robots.",
    specs: {
      Axes: "6 (3A+3G)",
      Interface: "I2C",
      "Accel Range": "±2–16g",
      "Gyro Range": "±250–2000°/s",
      Voltage: "2.4–3.46V",
      DMP: "Built-in",
    },
  },
  {
    id: 13,
    name: "PIR Motion Sensor",
    cat: "Sensors",
    emoji: "👁️",
    price: 59,
    orig: 79,
    badge: "",
    badgeType: "",
    image: "images/Sensors/PIR Motion Sensor.jpeg",
    desc: "Passive infrared motion detection. Adjustable sensitivity and delay. Wide 120° detection angle, up to 7m.",
    specs: {
      Range: "Up to 7m",
      Angle: "120°",
      Voltage: "5–20V",
      Output: "Digital TTL",
      Delay: "0.3–5 sec",
      Trigger: "Repeatable",
    },
  },
  {
    id: 14,
    name: "BMP280 Pressure",
    cat: "Sensors",
    emoji: "🌤️",
    price: 99,
    orig: 129,
    badge: "",
    badgeType: "",
    image: "images/Sensors/BMP280 Pressure.jpeg",
    desc: "Barometric pressure and temperature sensor. ±1 hPa accuracy. I2C/SPI. Ideal for weather stations.",
    specs: {
      Pressure: "300–1100 hPa",
      Accuracy: "±1 hPa",
      "Temp Range": "-40 to 85°C",
      Interface: "I2C/SPI",
      Voltage: "1.71–3.6V",
      Current: "2.7 µA",
    },
  },
  {
    id: 15,
    name: "Sound Sensor",
    cat: "Sensors",
    emoji: "🎙️",
    price: 49,
    orig: 69,
    badge: "",
    badgeType: "",
    image: "images/Sensors/Sound Sensor.jpeg",
    desc: "Electret mic with LM393 comparator. Detects sound level, outputs digital/analog. Adjustable sensitivity.",
    specs: {
      Type: "Electret mic",
      Output: "Digital+Analog",
      Comparator: "LM393",
      Voltage: "3.3–5V",
      "Trim Pot": "Yes",
      PCB: "19×19mm",
    },
  },
  {
    id: 16,
    name: "IR Obstacle Sensor",
    cat: "Sensors",
    emoji: "🔴",
    price: 39,
    orig: 49,
    badge: "",
    badgeType: "",
    image: "images/Sensors/IR Obstacle Sensor.jpeg",
    desc: "Adjustable infrared obstacle detection. Works 2–30cm. Digital output, onboard LED indicator.",
    specs: {
      Range: "2–30 cm",
      Output: "Digital TTL",
      "IR Freq": "38 kHz",
      LED: "Onboard",
      Voltage: "3.3–5V",
      Size: "3.2×1.4cm",
    },
  },
  {
    id: 16.1,
    name: "ACS712 Current Sensor",
    cat: "Sensors",
    emoji: "⚡",
    price: 79,
    orig: 99,
    badge: "",
    badgeType: "",
    image: "images/Sensors/ACS712 Current Sensor.jpeg",
    desc: "Ratiometric current sensor. ±5A, ±30A options. Output 0–5V to ADC. PCB hall effect.",
    specs: {
      Range: "±5A / ±30A",
      Output: "Ratiometric",
      Voltage: "3.3–5V",
      Accuracy: "±1.5%",
      Interface: "Analog",
      Package: "DIP-8",
    },
  },
  {
    id: 16.2,
    name: "DS18B20 Temp Sensor",
    cat: "Sensors",
    emoji: "🌡️",
    price: 49,
    orig: 69,
    badge: "Popular",
    badgeType: "badge-pop",
    image: "images/Sensors/DS18B20 Temp Sensor.jpeg",
    desc: "Digital temperature sensor. 1-wire protocol, ±0.5°C accuracy, -55 to 125°C range.",
    specs: {
      Range: "-55 to 125°C",
      Accuracy: "±0.5°C",
      Interface: "1-Wire",
      Resolution: "12-bit",
      Voltage: "3–5.5V",
      Package: "TO-92",
    },
  },
  {
    id: 16.3,
    name: "TSL2591 Light Sensor",
    cat: "Sensors",
    emoji: "💡",
    price: 129,
    orig: 159,
    badge: "",
    badgeType: "",
    image: "images/Sensors/TSL2591 Light Sensor.jpeg",
    desc: "Digital ambient light sensor with IR filtering. I2C interface, auto-gain adjusts to light levels.",
    specs: {
      Range: "188 µlux–88k lux",
      Interface: "I2C",
      Accuracy: "±15%",
      Channels: "2 (Full + IR)",
      Voltage: "2.7–3.6V",
      Package: "LQFP-6",
    },
  },
  {
    id: 16.4,
    name: "LM393 Soil Moisture",
    cat: "Sensors",
    emoji: "🌱",
    price: 39,
    orig: 59,
    badge: "New",
    badgeType: "badge-new",
    image: "images/Sensors/Soil Moisture Sensor.jpeg",
    desc: "Capacitive soil moisture sensor. Corrosion-resistant, 3.3–5V, analog + digital output.",
    specs: {
      Type: "Capacitive",
      Output: "Analog+Digital",
      Resistance: "Corrosion-free",
      Voltage: "3.3–5V",
      Accuracy: "±2%",
      Depth: "38mm",
    },
  },
  {
    id: 16.5,
    name: "MQ5 Gas Sensor",
    cat: "Sensors",
    emoji: "💨",
    price: 89,
    orig: 119,
    badge: "",
    badgeType: "",
    image: "images/Sensors/MQ5 Gas Sensor.jpeg",
    desc: "LPG, natural gas, town gas detector. Sensitive 300–10000 ppm. Analog output with comparator.",
    specs: {
      "Gas Type": "LPG, CH4, CO",
      Range: "300–10000 ppm",
      Voltage: "5V",
      Output: "Analog+Digital",
      Accuracy: "±15%",
      Response: "~30 sec",
    },
  },
  {
    id: 17,
    name: "100Ω Resistors (100pcs)",
    cat: "Passive",
    emoji: "⚡",
    price: 49,
    orig: 59,
    badge: "",
    badgeType: "",
    image: "images/Passive/100 Ohm Resistor.jpeg",
    desc: "Carbon film, 1% tolerance, 1/4W. Axial lead, 100 pieces in anti-static packaging.",
    specs: {
      Resistance: "100Ω",
      Tolerance: "1%",
      Power: "1/4 W",
      Qty: "100 pcs",
      Type: "Carbon Film",
      Lead: "Axial",
    },
  },
  {
    id: 17.1,
    name: "Potentiometer Kit 10K (20pcs)",
    cat: "Passive",
    emoji: "🎚️",
    price: 79,
    orig: 99,
    badge: "",
    badgeType: "",
    image: "images/Passive/Potentiometer Kit.jpeg",
    desc: "B10K linear potentiometers. 15mm shaft, smooth operation, multiple resistance values included.",
    specs: {
      Resistance: "10K ohm",
      Type: "Linear",
      Package: "20 pcs",
      Shaft: "15mm",
      Voltage: "5V",
      Power: "0.5W",
    },
  },
  {
    id: 17.2,
    name: "Switch Pack Assorted",
    cat: "Passive",
    emoji: "🔘",
    price: 99,
    orig: 129,
    badge: "Popular",
    badgeType: "badge-pop",
    image: "images/Passive/Switch Pack.jpeg",
    desc: "Push buttons, toggle switches, rocker switches. 50 pieces in organized storage box.",
    specs: {
      Types: "Mixed (Push/Toggle)",
      Qty: "50 pcs",
      Rating: "50mA @ 12V",
      Contacts: "NO/NC options",
      Material: "Durable plastic",
      Storage: "Compartment box",
    },
  },
  {
    id: 18,
    name: "Resistor Kit 600pcs",
    cat: "Passive",
    emoji: "🟧",
    price: 149,
    orig: 189,
    badge: "Popular",
    badgeType: "badge-pop",
    image: "images/Passive/Resistor Kit 600pcs.jpeg",
    desc: "30 values × 20 each = 600 resistors. 10Ω to 1MΩ, 1% tolerance, sorted in labeled box.",
    specs: {
      Values: "30 (10Ω–1MΩ)",
      Qty: "600 pcs",
      Tolerance: "1%",
      Power: "1/4 W",
      Type: "Carbon Film",
      Storage: "Box",
    },
  },
  {
    id: 19,
    name: "104 Ceramic Caps (50pcs)",
    cat: "Passive",
    emoji: "🔆",
    price: 69,
    orig: 89,
    badge: "",
    badgeType: "",
    image: "images/Passive/Ceramic Capacitor 100nF.jpeg",
    desc: "100nF (0.1µF) monolithic ceramic capacitors. 50V, 50 pieces. Essential bypass caps.",
    specs: {
      Value: "100nF",
      Voltage: "50V",
      Type: "Ceramic",
      Qty: "50 pcs",
      Package: "Radial",
      "Temp Coef": "X7R",
    },
  },
  {
    id: 20,
    name: "LED Pack Assorted (100pcs)",
    cat: "Passive",
    emoji: "💡",
    price: 99,
    orig: 119,
    badge: "",
    badgeType: "",
    image: "images/Passive/LED Pack.jpeg",
    desc: "5mm LEDs — red, green, blue, yellow, white. 20 of each. Standard 20mA.",
    specs: {
      Colors: "5 (20 each)",
      Qty: "100 pcs",
      Size: "5mm",
      "Fwd Voltage": "2.0–3.3V",
      Current: "20mA",
      Viewing: "60°",
    },
  },
  {
    id: 21,
    name: "Electrolytic Caps (120pcs)",
    cat: "Passive",
    emoji: "🔋",
    price: 119,
    orig: 149,
    badge: "",
    badgeType: "",
    image: "images/Passive/Electrolytic Capacitor.jpeg",
    desc: "12 common values, 1µF to 1000µF, 25V–50V. Through-hole, labeled compartment box.",
    specs: {
      Values: "12 types",
      Range: "1µF–1000µF",
      Voltage: "25–50V",
      Qty: "120 pcs",
      Type: "Electrolytic",
      Storage: "Box",
    },
  },
  {
    id: 22,
    name: "NRF24L01 RF Module",
    cat: "Wireless",
    emoji: "📻",
    price: 129,
    orig: 159,
    badge: "",
    badgeType: "",
    image: "images/Wireless/NRF24L01 RF Module.jpeg",
    desc: "2.4GHz transceiver. Up to 1km, 125 channels, SPI, 1.9–3.6V. Low power, ideal for wireless sensors.",
    specs: {
      Frequency: "2.4 GHz",
      Range: "Up to 1 km",
      "Data Rate": "250k–2Mbps",
      Channels: "125",
      Interface: "SPI",
      Voltage: "1.9–3.6V",
    },
  },
  {
    id: 23,
    name: "HC-05 Bluetooth",
    cat: "Wireless",
    emoji: "📘",
    price: 179,
    orig: 219,
    badge: "",
    badgeType: "",
    image: "images/Wireless/HC-05 Bluetooth Module.jpeg",
    desc: "Classic Bluetooth 2.0 SPP module. Master/Slave modes. UART at 3.3V. Easy Android pairing.",
    specs: {
      Standard: "Bluetooth 2.0",
      Profile: "SPP",
      Interface: "UART",
      Voltage: "3.3V",
      Range: "~10m",
      Mode: "Master/Slave",
    },
  },
  {
    id: 24.1,
    name: "Zigbee CC2530 Module",
    cat: "Wireless",
    emoji: "🔷",
    price: 249,
    orig: 319,
    badge: "New",
    badgeType: "badge-new",
    image: "images/Wireless/Zigbee CC2530 Module.jpeg",
    desc: "Zigbee network module with SoC architecture. 2.4GHz band, mesh networking support.",
    specs: {
      Frequency: "2.4 GHz",
      Standard: "Zigbee 3.0",
      Range: "100–300m",
      Voltage: "3.3V",
      Interface: "SPI/UART",
      Mesh: "Supported",
    },
  },
  {
    id: 24.2,
    name: "5.8GHz WiFi Module",
    cat: "Wireless",
    emoji: "📡",
    price: 179,
    orig: 229,
    badge: "",
    badgeType: "",
    image: "images/Wireless/5.8GHz WiFi Module.jpeg",
    desc: "Dual-band WiFi 5G module for IoT applications. MIMO technology for extended range.",
    specs: {
      Band: "5.8 GHz",
      Standard: "802.11ac",
      Bandwidth: "80MHz",
      MIMO: "2×2",
      Voltage: "3.3–5V",
      Interface: "SPI",
    },
  },
  {
    id: 24.3,
    name: "GSM SIM800L Module",
    cat: "Wireless",
    emoji: "📞",
    price: 299,
    orig: 379,
    badge: "Hot",
    badgeType: "badge-hot",
    image: "images/Wireless/GSM SIM800L Module.jpeg",
    desc: "Quad-band GSM/GPRS module. Full TCP/IP stack, SMS/GPRS data, SMS support.",
    specs: {
      Band: "Quad GSM",
      Protocol: "GPRS/TCP/IP",
      Interface: "UART",
      Voltage: "3.4–4.2V",
      Current: "2A peak",
      Size: "32×32×3.5mm",
    },
  },
  {
    id: 25,
    name: "433MHz RF Kit (Tx+Rx)",
    cat: "Wireless",
    emoji: "📶",
    price: 89,
    orig: 109,
    badge: "",
    badgeType: "",
    image: "images/Wireless/HC-05 Bluetooth Module.jpeg",
    desc: "Simple 433MHz ASK transmitter and receiver pair. For remote controls and wireless data.",
    specs: {
      Frequency: "433.92 MHz",
      Modulation: "ASK/OOK",
      Range: "~100m",
      Interface: "Digital",
      Voltage: "5V",
      Type: "Tx+Rx pair",
    },
  },
  {
    id: 26,
    name: "18650 LiPo Cell 3000mAh",
    cat: "Power",
    emoji: "🔋",
    price: 199,
    orig: 249,
    badge: "",
    badgeType: "",
    image: "images/Power/18650 LiPo Cell.jpeg",
    desc: "3.7V 3000mAh protected Li-Ion cell. PCB protection against overcharge, overdischarge, short circuit.",
    specs: {
      Voltage: "3.7V",
      Capacity: "3000 mAh",
      "Max Discharge": "10A",
      Chemistry: "Li-Ion",
      Protection: "PCB",
      Size: "18×65mm",
    },
  },
  {
    id: 27,
    name: "LM7805 Regulator (5pcs)",
    cat: "Power",
    emoji: "⚡",
    price: 49,
    orig: 59,
    badge: "",
    badgeType: "",
    image: "images/Power/LM7805 Regulator.jpeg",
    desc: "5V linear regulator, 1A, TO-220. Input up to 35V. Thermal shutdown and current limiting.",
    specs: {
      Output: "5V",
      Current: "1A max",
      Input: "7–35V",
      Package: "TO-220",
      Protection: "Thermal+Short",
      Dropout: "~2V",
    },
  },
  {
    id: 28,
    name: "TP4056 Charging Module",
    cat: "Power",
    emoji: "🔌",
    price: 39,
    orig: 49,
    badge: "",
    badgeType: "",
    image: "images/Power/TP4056 Charging Module.jpeg",
    desc: "Li-Ion charging module with protection. Micro USB input, 1A max charge current, LED indicators.",
    specs: {
      Input: "USB 5V",
      "Charge Current": "1A",
      Cutoff: "4.2V",
      Protection: "Over-V, Over-I",
      LEDs: "Charge + Done",
      Size: "25×17mm",
    },
  },
  {
    id: 29,
    name: "Mini 360 Buck Converter",
    cat: "Power",
    emoji: "🔄",
    price: 79,
    orig: 99,
    badge: "",
    badgeType: "",
    image: "images/Power/Buck Converter.jpeg",
    desc: "DC-DC step-down converter. 4.75–23V input to 1–17V output. 1.8A max. 96% efficiency.",
    specs: {
      Input: "4.75–23V",
      Output: "1–17V adj",
      Current: "1.8A max",
      Efficiency: "96%",
      Freq: "340 kHz",
      Size: "17×11mm",
    },
  },
  {
    id: 30,
    name: '0.96" OLED I2C Display',
    cat: "Display",
    emoji: "🖥️",
    price: 149,
    orig: 179,
    badge: "",
    badgeType: "",
    image: "images/Display/OLED Display.jpeg",
    desc: "128×64 SSD1306 OLED. Crisp white pixels, I2C. Compatible with Arduino, ESP32, Raspberry Pi.",
    specs: {
      Resolution: "128×64 px",
      Driver: "SSD1306",
      Interface: "I2C",
      Voltage: "3.3–5V",
      Angle: "160°",
      Size: '0.96"',
    },
  },
  {
    id: 31,
    name: '1.8" TFT Color Display',
    cat: "Display",
    emoji: "🌈",
    price: 199,
    orig: 249,
    badge: "",
    badgeType: "",
    image: "images/Display/TFT Color Display.jpeg",
    desc: "ST7735 128×160 color TFT. SPI interface, 262K colors, includes SD card slot.",
    specs: {
      Resolution: "128×160",
      Colors: "262,144",
      Driver: "ST7735",
      Interface: "SPI",
      Voltage: "3.3–5V",
      "SD Card": "Built-in",
    },
  },
  {
    id: 32,
    name: "16x2 LCD with I2C",
    cat: "Display",
    emoji: "📺",
    price: 129,
    orig: 159,
    badge: "",
    badgeType: "",
    image: "images/Display/LCD 16x2.jpeg",
    desc: "Classic 16×2 character LCD with I2C backpack. Only 2 wires to Arduino. Blue backlight.",
    specs: {
      Characters: "16×2",
      Driver: "HD44780",
      Interface: "I2C (PCF8574)",
      Voltage: "5V",
      Backlight: "Blue LED",
      Contrast: "Adjustable",
    },
  },
  {
    id: 33,
    name: "Mini Soldering Iron 60W",
    cat: "Tools",
    emoji: "🔧",
    price: 299,
    orig: 399,
    badge: "Hot",
    badgeType: "badge-hot",
    image: "images/Tools/Soldering Iron.jpeg",
    desc: "Temperature-controlled 60W iron. 200–450°C, ESD-safe handle, 30 sec heat-up.",
    specs: {
      Power: "60W",
      "Temp Range": "200–450°C",
      "Heat-up": "30 sec",
      Tip: "Conical 900M",
      Handle: "ESD-safe",
      Voltage: "220V",
    },
  },
  {
    id: 34,
    name: "400-Tie Breadboard",
    cat: "Tools",
    emoji: "🟫",
    price: 69,
    orig: 89,
    badge: "",
    badgeType: "",
    image: "images/Tools/Breadboard.jpeg",
    desc: "Standard half-size 400-tie point solderless breadboard. High-quality spring contacts.",
    specs: {
      "Tie Points": "400",
      "Bus Rails": "4 (2 pairs)",
      Material: "ABS+Copper",
      "Wire Size": "22–26 AWG",
      Size: "83×55mm",
      Tolerance: "±0.1mm",
    },
  },
  {
    id: 35,
    name: "Jumper Wire Set (120pcs)",
    cat: "Tools",
    emoji: "🔌",
    price: 89,
    orig: 109,
    badge: "",
    badgeType: "",
    image: "images/Tools/Jumper Wires.jpeg",
    desc: "40 M-M, 40 M-F, 40 F-F jumper wires. 20cm length, 2.54mm pitch.",
    specs: {
      "M-M": "40 wires",
      "M-F": "40 wires",
      "F-F": "40 wires",
      Length: "20 cm",
      Pitch: "2.54mm",
      AWG: "26",
    },
  },
  {
    id: 36,
    name: "Digital Multimeter DT830B",
    cat: "Tools",
    emoji: "📏",
    price: 249,
    orig: 299,
    badge: "",
    badgeType: "",
    image: "images/Tools/Multimeter.jpeg",
    desc: "3.5-digit LCD multimeter. DC/AC voltage, DC current, resistance, diode test.",
    specs: {
      Display: "3.5 digit LCD",
      "DC Voltage": "0–1000V",
      "AC Voltage": "0–750V",
      "DC Current": "0–10A",
      Resistance: "0–2MΩ",
      Battery: "9V",
    },
  },
  {
    id: 37,
    name: "Logic Analyzer 24MHz 8CH",
    cat: "Tools",
    emoji: "📊",
    price: 449,
    orig: 599,
    badge: "New",
    badgeType: "badge-new",
    desc: "USB logic analyzer. 8 channels, 24MHz. Sigrok/PulseView compatible. Protocol decoding.",
    specs: {
      Channels: "8",
      "Sample Rate": "24 MHz",
      "Logic Levels": "1.2–5.5V",
      Interface: "USB",
      Software: "Sigrok/PulseView",
      Protocols: "UART,SPI,I2C",
    },
  },
  {
    id: 37.1,
    name: "Oscilloscope Probe Set",
    cat: "Tools",
    emoji: "📈",
    price: 199,
    orig: 279,
    badge: "",
    badgeType: "",
    desc: "High-frequency oscilloscope probes. 100MHz bandwidth, 3 pieces with clips and leads.",
    specs: {
      Bandwidth: "100 MHz",
      Qty: "3 pieces",
      Attenuation: "10:1",
      Length: "1.5m",
      Connector: "BNC",
      Impedance: "50Ω",
    },
  },
  {
    id: 37.2,
    name: "USB Digital Scope 200MHz",
    cat: "Tools",
    emoji: "🖥️",
    price: 799,
    orig: 999,
    badge: "Hot",
    badgeType: "badge-hot",
    desc: "Portable USB oscilloscope. 200MS/s, 2 channels, FFT analysis, cross-platform software.",
    specs: {
      "Sample Rate": "200 MS/s",
      Channels: "2",
      Bandwidth: "50 MHz",
      Interface: "USB 2.0",
      FFT: "Built-in",
      Memory: "64 KB",
    },
  },
  {
    id: 37.3,
    name: "Helping Hands Magnifier",
    cat: "Tools",
    emoji: "🔍",
    price: 89,
    orig: 119,
    badge: "",
    badgeType: "",
    desc: "PCB assembly station with 3.5x magnifying glass, articulated arms, alligator clips.",
    specs: {
      Magnification: "3.5x",
      "LED Light": "Built-in",
      Arms: "3 articulated",
      Base: "Heavy weighted",
      Power: "USB 5V",
      Suspension: "Flexible",
    },
  },
  {
    id: 38,
    name: "Ultimate Starter Kit",
    cat: "Kits",
    emoji: "🧰",
    price: 999,
    orig: 1499,
    badge: "Popular",
    badgeType: "badge-pop",
    desc: "Complete beginner kit: Arduino Uno, breadboard, 30+ sensors, LEDs, resistors, jumper wires, servo, I2C LCD, 80-page booklet.",
    specs: {
      Board: "Arduino Uno R3",
      Sensors: "30+ types",
      LEDs: "20 pcs",
      "Jumper Wires": "65 pcs",
      Projects: "40+",
      Booklet: "Yes, 80 pages",
    },
    kitDifficulty: "beginner",
    kitIncludes: [
      "Arduino Uno",
      "Breadboard",
      "DHT11",
      "Ultrasonic",
      "LCD 16×2",
      "Servo Motor",
      "LEDs",
      "Tutorial Book",
    ],
  },
  {
    id: 39,
    name: "IoT Smart Home Kit",
    cat: "Kits",
    emoji: "🏠",
    price: 1499,
    orig: 1999,
    badge: "Hot",
    badgeType: "badge-hot",
    desc: "ESP32 based IoT kit. Control appliances via WiFi, monitor temperature, humidity, motion.",
    specs: {
      Board: "ESP32 DevKit",
      Sensors: "PIR, DHT22, MQ2",
      Relay: "4-channel",
      Display: 'OLED 0.96"',
      App: "Custom Android",
      Projects: "15+",
    },
    kitDifficulty: "intermediate",
    kitIncludes: [
      "ESP32",
      "DHT22",
      "PIR Sensor",
      "4-CH Relay",
      "OLED Display",
      "Source Code",
    ],
  },
  {
    id: 40,
    name: "Robotics & Motor Kit",
    cat: "Kits",
    emoji: "🤖",
    price: 1799,
    orig: 2499,
    badge: "New",
    badgeType: "badge-new",
    desc: "Build wheeled robots and robotic arms. Arduino, L298N, DC/servo motors, chassis, Bluetooth.",
    specs: {
      Board: "Arduino Mega",
      Drive: "L298N H-Bridge",
      Motors: "4× DC + 2× Servo",
      Chassis: "2WD + 4WD",
      BT: "HC-05",
      Extras: "Ultrasonic, IR",
    },
    kitDifficulty: "intermediate",
    kitIncludes: [
      "Arduino Mega",
      "L298N Driver",
      "4x DC Motors",
      "Robot Chassis",
      "HC-05 BT",
      "Ultrasonic",
    ],
  },
  {
    id: 41,
    name: "Weather Station Kit",
    cat: "Kits",
    emoji: "🌦️",
    price: 899,
    orig: 1199,
    badge: "",
    badgeType: "",
    desc: "Build a WiFi weather station. ESP8266 + BMP280, DHT22, LDR + OLED. Uploads to ThingSpeak.",
    specs: {
      Board: "ESP8266 NodeMCU",
      Sensors: "BMP280, DHT22, LDR",
      Display: 'OLED 0.96"',
      Data: "ThingSpeak IoT",
      Power: "USB or Battery",
      Case: "3D-printed",
    },
    kitDifficulty: "beginner",
    kitIncludes: [
      "NodeMCU",
      "BMP280",
      "DHT22",
      "OLED Display",
      "LDR Module",
      "Code+Tutorial",
    ],
  },
  {
    id: 42,
    name: "LoRa IoT Sensor Kit",
    cat: "Kits",
    emoji: "📡",
    price: 2199,
    orig: 2799,
    badge: "Advanced",
    badgeType: "badge-new",
    desc: "Long-range IoT network kit. Build a LoRaWAN node and gateway. For agriculture, remote sensing.",
    specs: {
      Node: "Arduino+SX1278",
      Gateway: "RPi Zero 2W",
      Range: "Up to 10 km",
      Protocol: "LoRaWAN",
      Sensors: "Temp, Humidity, Soil",
      Network: "TTN compatible",
    },
    kitDifficulty: "advanced",
    kitIncludes: [
      "Arduino Uno",
      "SX1278 LoRa",
      "RPi Zero 2W",
      "Soil Sensor",
      "DHT22",
      "Full Tutorial",
    ],
  },
  {
    id: 43,
    name: "Drone Flight Controller Kit",
    cat: "Kits",
    emoji: "🚁",
    price: 2999,
    orig: 3999,
    badge: "Hot",
    badgeType: "badge-hot",
    desc: "Build your own quadcopter. STM32 flight controller, ESCs, brushless motors, 250mm frame.",
    specs: {
      Controller: "STM32 F4",
      IMU: "MPU-6050",
      Motors: "4× 2300KV Brushless",
      ESCs: "4× 30A",
      Frame: "250mm carbon",
      Radio: "6CH SBUS",
    },
    kitDifficulty: "advanced",
    kitIncludes: [
      "STM32 FC Board",
      "MPU-6050",
      "4x Brushless Motors",
      "4x 30A ESC",
      "250mm Frame",
      "XT60 Connectors",
    ],
  },
];

const categories = [
  { name: "Microcontrollers", emoji: "🔲", color: "#dbeafe", cls: "mc" },
  { name: "Sensors", emoji: "📡", color: "#d1fae5", cls: "se" },
  { name: "Passive", emoji: "⚡", color: "#fee2e2", cls: "pa" },
  { name: "Power", emoji: "🔋", color: "#fef3c7", cls: "po" },
  { name: "Wireless", emoji: "📻", color: "#ede9fe", cls: "wi" },
  { name: "Display", emoji: "🖥️", color: "#e0f2fe", cls: "di" },
  { name: "Tools", emoji: "🔧", color: "#f3f4f6", cls: "to" },
  { name: "Kits", emoji: "🧰", color: "#fdf4ff", cls: "ki" },
];

// ════════════════════════════════
// STATE
// ════════════════════════════════
let cart = [],
  currentProduct = null,
  currentCat = "all",
  priceLimit = 4000,
  detailQty = 1;
let lastOrder = [],
  trackEtaSeconds = 2280,
  trackInterval = null;
const riderNames = [
  "Raj Kumar",
  "Deepak Singh",
  "Priya Nair",
  "Ankit Verma",
  "Suresh Babu",
];

// ════════════════════════════════
// PAGES
// ════════════════════════════════
function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));
  if (id === "home")
    document.getElementById("nl-home")?.classList.add("active");
}

function showCatPage(cat) {
  currentCat = cat || "all";
  priceLimit = 4000;
  showPage("category");
  const pr = document.getElementById("priceRange");
  if (pr) {
    pr.value = 4000;
    document.getElementById("priceVal").textContent = "4000";
  }
  const info =
    currentCat === "all"
      ? { name: "All Products", sub: "Browse our complete catalog" }
      : {
          name: currentCat,
          sub: `${products.filter((p) => p.cat === currentCat).length} products in this category`,
        };
  document.getElementById("catBreadcrumb").textContent = info.name;
  document.getElementById("catPageTitle").textContent = info.name;
  document.getElementById("catPageSub").textContent = info.sub;
  renderSidebar();
  renderCatProducts();
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active"));
  const map = {
    Microcontrollers: "nl-mc",
    Sensors: "nl-sensors",
    Wireless: "nl-wireless",
    Kits: "nl-kits",
    Tools: "nl-tools",
  };
  if (map[currentCat])
    document.getElementById(map[currentCat])?.classList.add("active");
}

function openTracking() {
  // Populate order items for tracking
  const items = lastOrder.length
    ? lastOrder
    : cart.length
      ? cart
      : [
          {
            id: 1,
            name: "Arduino Uno R3",
            emoji: "🔲",
            cat: "Microcontrollers",
            price: 299,
            qty: 1,
          },
        ];
  document.getElementById("trackOrderItems").innerHTML = items
    .map(
      (item) => `
    <div class="track-order-item">
      <div class="toi-emoji">${item.emoji}</div>
      <div class="toi-info"><div class="toi-name">${item.name}</div><div class="toi-detail">${item.cat} · Qty ${item.qty}</div></div>
      <div class="toi-price">₹${item.price * item.qty}</div>
    </div>`,
    )
    .join("");
  const rid = riderNames[Math.floor(Math.random() * riderNames.length)];
  document.getElementById("riderName").textContent = rid;
  document
    .querySelectorAll(".rider-label")
    .forEach((el) => (el.textContent = rid));
  showPage("tracking");
  startTrackingAnimation();
}

// ════════════════════════════════
// TRACKING MAP ANIMATION
// ════════════════════════════════
const riderPath = [
  { x: 8, y: 60 },
  { x: 28, y: 44 },
  { x: 50, y: 29 },
  { x: 72, y: 39 },
  { x: 85, y: 77 },
];
let riderPathIdx = 0,
  riderAnimFrame = 0;

function startTrackingAnimation() {
  if (trackInterval) clearInterval(trackInterval);
  riderPathIdx = 0;
  riderAnimFrame = 0;
  // reset ETA
  trackEtaSeconds = 2280;
  updateTrackUI();
  trackInterval = setInterval(() => {
    trackEtaSeconds = Math.max(0, trackEtaSeconds - 1);
    riderAnimFrame++;
    // Move rider every 8 seconds
    if (riderAnimFrame % 8 === 0 && riderPathIdx < riderPath.length - 1)
      riderPathIdx++;
    // Randomize speed slightly
    const spd = 18 + Math.floor(Math.random() * 14);
    const dist = (
      (riderPath.length - 1 - riderPathIdx) * 0.8 +
      Math.random() * 0.3
    ).toFixed(1);
    const etaMin = Math.ceil(trackEtaSeconds / 60);
    const sp = document.getElementById("riderSpeed");
    if (sp) sp.textContent = spd;
    const di = document.getElementById("riderDist");
    if (di) di.textContent = dist;
    const re = document.getElementById("riderEta");
    if (re) re.textContent = "~" + etaMin;
    const em = document.getElementById("etaMin");
    if (em) em.textContent = etaMin;
    updateTrackUI();
    moveRiderOnMap();
    if (trackEtaSeconds === 0) {
      clearInterval(trackInterval);
      // Mark delivered
      const d4 = document.getElementById("tl-dot4");
      if (d4) {
        d4.className = "tl-dot tl-done";
        d4.textContent = "✓";
      }
      const d5 = document.getElementById("tl-dot5");
      if (d5) {
        d5.className = "tl-dot tl-done";
        d5.textContent = "✓";
      }
      const t5 = document.getElementById("tl-t5");
      if (t5) t5.textContent = "Delivered!";
      showToast("🎉 Your order has been delivered!", "green");
    }
  }, 1000);
}

function moveRiderOnMap() {
  const pt = riderPath[riderPathIdx];
  const marker = document.getElementById("riderMarker");
  if (!marker) return;
  const wrap = document.querySelector(".track-map-inner");
  if (!wrap) return;
  const W = wrap.offsetWidth || 700,
    H = wrap.offsetHeight || 520;
  marker.style.left = (pt.x / 100) * W + "px";
  marker.style.top = (pt.y / 100) * H + "px";
}

function updateTrackUI() {
  const m = Math.floor(trackEtaSeconds / 60);
  const s = trackEtaSeconds % 60;
  const cd = document.getElementById("etaCountdown");
  if (cd)
    cd.textContent =
      String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

// ════════════════════════════════
// RENDERING
// ════════════════════════════════
function renderHomePage() {
  // Hero stack
  document.getElementById("heroStack").innerHTML = products
    .slice(0, 4)
    .map(
      (p) => `
    <div class="hero-prod-card" onclick="openProduct(${p.id})">
      <div class="hpc-img" style="${p.image ? `background-image:url('${p.image}');background-size:cover;background-position:center;` : ""}">${!p.image ? p.emoji : ""}</div>
      <div class="hpc-name">${p.name}</div>
      <div class="hpc-price">₹${p.price}</div>
    </div>`,
    )
    .join("");

  // Categories
  document.getElementById("homeCategories").innerHTML = categories
    .map(
      (c) => `
    <div class="cat-card ${c.cls}" onclick="showCatPage('${c.name}')">
      <div class="cat-img" style="background:${c.color}">${c.emoji}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${products.filter((p) => p.cat === c.name).length} products</div>
      <div class="cat-arrow">↗</div>
    </div>`,
    )
    .join("");

  // Filter pills
  const cats = [
    "All",
    "Microcontrollers",
    "Sensors",
    "Wireless",
    "Power",
    "Kits",
  ];
  document.getElementById("homeFilters").innerHTML = cats
    .map(
      (c) => `
    <button class="filter-pill ${c === "All" ? "active" : ""}" onclick="filterHome('${c}',this)">${c}</button>`,
    )
    .join("");

  renderHomeProducts("all");

  // Kits
  document.getElementById("kitsGrid").innerHTML = products
    .filter((p) => p.cat === "Kits")
    .map(
      (k) => `
    <div class="kit-card" onclick="openProduct(${k.id})">
      <div class="kit-card-img">${k.emoji}</div>
      <div class="kit-difficulty ${k.kitDifficulty === "beginner" ? "diff-beginner" : k.kitDifficulty === "intermediate" ? "diff-intermediate" : "diff-advanced"}">
        ${k.kitDifficulty === "beginner" ? "🟢" : k.kitDifficulty === "intermediate" ? "🟡" : "🔴"} ${k.kitDifficulty.charAt(0).toUpperCase() + k.kitDifficulty.slice(1)}
      </div>
      <div class="kit-name">${k.name}</div>
      <div class="kit-desc">${k.desc.substring(0, 80)}...</div>
      <div class="kit-includes">${(k.kitIncludes || [])
        .slice(0, 4)
        .map((i) => `<span class="kit-tag">${i}</span>`)
        .join("")}</div>
      <div class="kit-footer">
        <div class="kit-price">₹${k.price}</div>
        <div class="kit-footer-btns">
          <button class="btn-kit-add" onclick="event.stopPropagation();quickAdd(${k.id})">+ Cart</button>
          <button class="btn-kit-buy" onclick="event.stopPropagation();buyNow(${k.id})">Buy Now</button>
        </div>
      </div>
    </div>`,
    )
    .join("");

  animateStats();
}

function filterHome(cat, btn) {
  document
    .querySelectorAll("#homeFilters .filter-pill")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderHomeProducts(cat.toLowerCase() === "all" ? "all" : cat);
}

function renderHomeProducts(filter) {
  const filtered =
    filter === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.cat === filter).slice(0, 8);
  document.getElementById("homeProductsGrid").innerHTML =
    renderProdCards(filtered);
}

function renderProdCards(prods) {
  // Helper function to generate dynamic rating (4.0-5.0)
  const getRating = (id) => (3.8 + ((id * 7) % 14) / 100).toFixed(1);
  const getReviewCount = (id) => 48 + ((id * 3) % 187);

  return prods
    .map((p) => {
      const rating = getRating(p.id);
      const reviewCount = getReviewCount(p.id);
      const discount =
        p.orig && p.orig > p.price
          ? Math.round(((p.orig - p.price) / p.orig) * 100)
          : 0;

      return `
    <div class="prod-card" onclick="openProduct(${p.id})">
      <div class="prod-card-img">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:contain;padding:12px;">` : `<span class="prod-emoji">${p.emoji}</span>`}
        ${p.badge ? `<div class="prod-badge ${p.badgeType}">${p.badge}</div>` : ""}
      </div>
      <div class="prod-card-body">
        <div class="prod-cat-tag">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        
        <!-- Star Rating Display -->
        <div class="prod-rating">
          <span class="prod-stars">${"★".repeat(Math.floor(rating))}${"☆".repeat(5 - Math.floor(rating))}</span>
          <span class="prod-rating-count">${rating} (${reviewCount})</span>
        </div>
        
        <!-- Price Row with Discount -->
        <div class="prod-price-row">
          <span class="prod-price">₹${p.price}</span>
          ${p.orig && p.orig > p.price ? `<span class="prod-price-orig">₹${p.orig}</span>` : ""}
          ${discount > 0 ? `<span class="prod-discount">-${discount}%</span>` : ""}
        </div>
        
        <!-- Action Buttons -->
        <div class="prod-footer">
          <div class="card-action-btns">
            <button class="btn-add" id="addBtn-${p.id}" onclick="event.stopPropagation();quickAdd(${p.id})" title="Add to cart">
              <span>Add</span>
            </button>
            <button class="btn-buy-now" onclick="event.stopPropagation();buyNow(${p.id})" title="Buy Now">
              <span>⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function renderSidebar() {
  const cats = [
    { name: "All Products", key: "all" },
    ...categories.map((c) => ({
      name: c.name,
      key: c.name,
      count: products.filter((p) => p.cat === c.name).length,
    })),
  ];
  document.getElementById("sidebarCats").innerHTML = cats
    .map(
      (c) => `
    <div class="sidebar-item ${c.key === currentCat ? "active" : ""}" onclick="sidebarFilter('${c.key}')">
      ${c.name} ${c.count ? `<span>${c.count}</span>` : ""}
    </div>`,
    )
    .join("");
}

function sidebarFilter(cat) {
  currentCat = cat;
  document.getElementById("catPageTitle").textContent =
    cat === "all" ? "All Products" : cat;
  document.getElementById("catBreadcrumb").textContent =
    cat === "all" ? "All Products" : cat;
  renderSidebar();
  renderCatProducts();
}

function renderCatProducts() {
  let filtered =
    currentCat === "all"
      ? [...products]
      : products.filter((p) => p.cat === currentCat);
  filtered = filtered.filter((p) => p.price <= priceLimit);
  const sort = document.getElementById("sortSelect").value;
  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "name")
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  document.getElementById("catResultCount").innerHTML =
    `<strong>${filtered.length}</strong> products`;
  document.getElementById("catProductsGrid").innerHTML =
    renderProdCards(filtered);
}

function filterByPrice(val) {
  priceLimit = parseInt(val);
  document.getElementById("priceVal").textContent = val;
  renderCatProducts();
}
function sortProducts() {
  renderCatProducts();
}

// ════════════════════════════════
// PRODUCT DETAIL
// ════════════════════════════════
function openProduct(id) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  currentProduct = p;
  detailQty = 1;
  document.getElementById("detailQty").textContent = 1;
  document.getElementById("detailBreadCat").textContent = p.cat;
  document.getElementById("detailBreadName").textContent = p.name;
  document.getElementById("detailCat").textContent = "⬥ " + p.cat;
  document.getElementById("detailName").textContent = p.name;
  document.getElementById("detailDesc").textContent = p.desc;
  document.getElementById("detailEmoji").textContent = p.emoji;
  const detailVisual = document.querySelector(".detail-visual");
  if (detailVisual && p.image) {
    const imgElement = detailVisual.querySelector("img");
    if (imgElement) {
      imgElement.src = p.image;
    } else {
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = p.name;
      img.style.cssText =
        "width:100%;height:100%;object-fit:contain;position:relative;z-index:2";
      detailVisual.appendChild(img);
    }
  }
  document.getElementById("detailPrice").textContent = "₹" + p.price;
  document.getElementById("detailRating").textContent =
    `4.${Math.floor(Math.random() * 3) + 6} (${Math.floor(Math.random() * 200) + 80} reviews)`;
  const orig = document.getElementById("detailOrig");
  const sav = document.getElementById("detailSavings");
  if (orig && sav) {
    if (p.orig && p.orig > p.price) {
      orig.textContent = "₹" + p.orig;
      sav.textContent = Math.round((1 - p.price / p.orig) * 100) + "% OFF";
      sav.style.display = "inline-flex";
    } else {
      orig.textContent = "";
      sav.style.display = "none";
    }
  }
  const badgeEl = document.getElementById("detailBadgeLarge");
  if (badgeEl)
    badgeEl.innerHTML = p.badge
      ? `<div class="prod-badge ${p.badgeType}" style="position:static">${p.badge}</div>`
      : "";
  const specsEl = document.getElementById("detailSpecs");
  if (specsEl)
    specsEl.innerHTML = Object.entries(p.specs)
      .map(
        ([k, v]) => `
    <div class="spec-chip"><div class="spec-label">${k}</div><div class="spec-val">${v}</div></div>`,
      )
      .join("");
  const btn = document.getElementById("detailAddBtn");
  if (btn) {
    btn.classList.remove("added-anim");
    btn.textContent = "🛒 Add to Cart";
  }
  const wishBtn = document.getElementById("wishBtn");
  if (wishBtn) wishBtn.classList.remove("liked");

  // Related
  const related = products
    .filter((x) => x.cat === p.cat && x.id !== p.id)
    .slice(0, 4);
  const extra = products
    .filter((x) => x.cat !== p.cat && x.id !== p.id)
    .slice(0, Math.max(0, 4 - related.length));
  document.getElementById("relatedGrid").innerHTML = renderProdCards(
    [...related, ...extra].slice(0, 4),
  );
  showPageWithHistory("detail", id);
  closeMobileMenu();
}

function changeQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  document.getElementById("detailQty").textContent = detailQty;
}

function addDetailToCart() {
  if (!currentProduct) return;
  for (let i = 0; i < detailQty; i++) addToCart(currentProduct.id);
  const btn = document.getElementById("detailAddBtn");
  if (btn) {
    btn.textContent = `✓ Added (${detailQty})`;
    btn.classList.add("added-anim");
    setTimeout(() => {
      btn.textContent = "🛒 Add to Cart";
      btn.classList.remove("added-anim");
    }, 2000);
  }
}

function buyNowDetail() {
  if (!currentProduct) return;
  cart = [];
  for (let i = 0; i < detailQty; i++) addToCart(currentProduct.id, true);
  updateCartBadge();
  closeCart();
  goToCheckout();
}

function toggleWish() {
  const btn = document.getElementById("wishBtn");
  btn.classList.toggle("liked");
  btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
  showToast(
    btn.classList.contains("liked")
      ? "♥ Added to wishlist"
      : "♡ Removed from wishlist",
  );
}

// ════════════════════════════════
// CART
// ════════════════════════════════
function addToCart(id, silent = false) {
  const p = products.find((x) => x.id === id);
  if (!p) return;
  const ex = cart.find((c) => c.id === id);
  if (ex) ex.qty++;
  else
    cart.push({
      id: p.id,
      name: p.name,
      emoji: p.emoji,
      cat: p.cat,
      price: p.price,
      qty: 1,
    });
  updateCartBadge();
  if (!silent) showToast(`⚡ ${p.name} added!`, "green");
  const btn = document.getElementById(`addBtn-${id}`);
  if (btn) {
    btn.textContent = "✓";
    btn.classList.add("added");
    setTimeout(() => {
      btn.textContent = "+🛒";
      btn.classList.remove("added");
    }, 1400);
  }
}

function quickAdd(id) {
  addToCart(id);
}

function buyNow(id) {
  cart = [];
  addToCart(id, true);
  updateCartBadge();
  goToCheckout();
}

function updateCartBadge() {
  const t = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById("cartBadge").textContent = t;
}

function openCart() {
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  if (overlay && drawer) {
    overlay.classList.add("open");
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
    renderCart();
  }
}

function closeCart() {
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  if (overlay && drawer) {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Toggle filters panel visibility on mobile
function toggleFiltersPanel() {
  const sidebar = document.getElementById("sidebar");
  const filtersFab = document.getElementById("filtersFab");
  if (sidebar) {
    if (sidebar.classList.contains("filters-open")) {
      sidebar.classList.remove("filters-open");
      filtersFab.textContent = "🎯";
    } else {
      sidebar.classList.add("filters-open");
      filtersFab.textContent = "✕";
    }
  }
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const footer = document.getElementById("cartFooter");
  if (!body || !footer) return;
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="ce-icon">🛒</div><p>Your cart is empty.<br>Browse components to get started.</p><br><button class="btn-primary" onclick="closeCart();showCatPage('all')">Shop Now →</button></div>`;
    footer.style.display = "none";
    return;
  }
  body.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.cat}</div>
        <div class="cart-item-footer">
          <div class="cart-item-price">₹${item.price * item.qty}</div>
          <div class="cart-qty-ctrl">
            <button class="cq-btn" onclick="updateCartQty(${item.id},-1)">−</button>
            <span class="cq-num">${item.qty}</span>
            <button class="cq-btn" onclick="updateCartQty(${item.id},1)">+</button>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      </div>
    </div>`,
    )
    .join("");
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const del = sub >= 499 ? 0 : 49;
  const subEl = document.getElementById("cartSubtotal");
  const delEl = document.getElementById("cartDelivery");
  const totalEl = document.getElementById("cartTotal");
  const savEl = document.getElementById("cartSavingsMsg");
  if (subEl) subEl.textContent = "₹" + sub;
  if (delEl) delEl.textContent = del === 0 ? "FREE" : "₹" + del;
  if (totalEl) totalEl.textContent = "₹" + (sub + del);
  const sav = cart.reduce((s, c) => {
    const p = products.find((x) => x.id === c.id);
    return s + (p?.orig ? (p.orig - p.price) * c.qty : 0);
  }, 0);
  if (savEl) savEl.textContent = sav > 0 ? `🎉 You're saving ₹${sav}!` : "";
  footer.style.display = "block";
}

function updateCartQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else {
    updateCartBadge();
    renderCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  updateCartBadge();
  renderCart();
}

// ════════════════════════════════
// CHECKOUT
// ════════════════════════════════
function goToCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  closeCart();
  renderCheckoutSummary();
  showPage("checkout");
  document.getElementById("checkoutStep1").style.display = "block";
  document.getElementById("checkoutStep2").style.display = "none";
  document.getElementById("cstep1").className = "checkout-step active";
  document.getElementById("cstep2").className = "checkout-step";
  document.getElementById("cstep3").className = "checkout-step";
}

function renderCheckoutSummary() {
  const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const del = sub >= 499 ? 0 : 49;
  const gst = Math.round(sub * 0.18);
  const itemsEl = document.getElementById("checkoutItems");
  const subEl = document.getElementById("coSubtotal");
  const delEl = document.getElementById("coDelivery");
  const gstEl = document.getElementById("coGst");
  const totalEl = document.getElementById("coTotal");
  if (itemsEl)
    itemsEl.innerHTML = cart
      .map(
        (item) => `
    <div class="order-item">
      <div class="order-item-img">${item.emoji}</div>
      <div class="order-item-info"><div class="order-item-name">${item.name}</div><div class="order-item-qty">Qty: ${item.qty}</div></div>
      <div class="order-item-price">₹${item.price * item.qty}</div>
    </div>`,
      )
      .join("");
  if (subEl) subEl.textContent = "₹" + sub;
  if (delEl) delEl.textContent = del === 0 ? "FREE" : "₹" + del;
  if (gstEl) gstEl.textContent = "₹" + gst;
  if (totalEl) totalEl.textContent = "₹" + (sub + del + gst);
}

function goToPayment() {
  const fnEl = document.getElementById("fn");
  const a1El = document.getElementById("a1");
  if (!fnEl || !a1El) {
    showToast("Form elements not found");
    return;
  }
  const fn = fnEl.value;
  const a1 = a1El.value;
  if (!fn || !a1) {
    showToast("Please fill in your delivery address");
    return;
  }
  const step1 = document.getElementById("checkoutStep1");
  const step2 = document.getElementById("checkoutStep2");
  const cstep1 = document.getElementById("cstep1");
  const cstep2 = document.getElementById("cstep2");
  if (step1) step1.style.display = "none";
  if (step2) step2.style.display = "block";
  if (cstep1) cstep1.className = "checkout-step done";
  if (cstep2) cstep2.className = "checkout-step active";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToAddress() {
  document.getElementById("checkoutStep1").style.display = "block";
  document.getElementById("checkoutStep2").style.display = "none";
  document.getElementById("cstep1").className = "checkout-step active";
  document.getElementById("cstep2").className = "checkout-step";
}

function selectPay(el, type) {
  document
    .querySelectorAll(".pay-method")
    .forEach((m) => m.classList.remove("selected"));
  el.classList.add("selected");
  const ci = document.getElementById("cardInputs");
  if (ci) ci.classList.toggle("visible", type === "card");
  const ui = document.getElementById("upiInputs");
  if (ui) ui.classList.toggle("visible", type === "upi");
  const ni = document.getElementById("netbankInputs");
  if (ni) ni.classList.toggle("visible", type === "netbank");
}

function selectUpiApp(app) {
  const upiEl = document.getElementById("upiId");
  if (upiEl) upiEl.value = `yourname@${app.toLowerCase()}`;
}

function applyPromo() {
  const codeEl = document.getElementById("promoInput");
  const msg = document.getElementById("promoMsg");
  if (!codeEl || !msg) return;
  const code = codeEl.value.toUpperCase();
  if (code === "SPARK10") {
    msg.textContent = "✅ 10% off applied!";
    msg.style.display = "block";
    msg.style.color = "green";
  } else if (code === "FIRST") {
    msg.textContent = "✅ ₹50 off applied!";
    msg.style.display = "block";
    msg.style.color = "green";
  } else {
    msg.textContent = "❌ Invalid code. Try SPARK10 or FIRST";
    msg.style.color = "#dc2626";
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 2500);
  }
}

function fetchArea() {
  const pin = document.getElementById("pin").value;
  if (pin.length === 6) {
    const city = pin.startsWith("28")
      ? "Agra"
      : pin.startsWith("4")
        ? "Mumbai"
        : pin.startsWith("1")
          ? "Delhi"
          : "Your City";
    const city_el = document.getElementById("city");
    if (city_el && !city_el.value) city_el.value = city;
    showToast("📍 " + city + " detected!");
  }
}

function placeOrder() {
  const btn = document.getElementById("placeOrderBtn");
  if (!btn) return;
  btn.innerHTML = "⏳ Processing...";
  btn.disabled = true;
  setTimeout(() => {
    lastOrder = [...cart];
    const eta = Math.floor(Math.random() * 18) + 28;
    const etaEl = document.getElementById("successEta");
    if (etaEl) etaEl.textContent = eta;
    trackEtaSeconds = eta * 60;
    const ordId = Math.floor(Math.random() * 9000) + 1000;
    const tNum = document.getElementById("trackOrderNum");
    const tNum2 = document.getElementById("trackOrderNum2");
    if (tNum) tNum.textContent = "2026-" + ordId;
    if (tNum2) tNum2.textContent = "2026-" + ordId;
    cart = [];
    updateCartBadge();
    // AUTO-OPEN TRACKING PAGE AFTER PURCHASE
    setTimeout(() => {
      openTracking();
      showToast("✅ Order placed! Tracking started.", "green");
    }, 800);
    if (btn) {
      btn.innerHTML = "🔒 Place Order & Pay";
      btn.disabled = false;
    }
  }, 2000);
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}
function formatExp(input) {
  let v = input.value.replace(/\D/g, "");
  if (v.length >= 2) v = v.substring(0, 2) + " / " + v.substring(2, 4);
  input.value = v;
}

// ════════════════════════════════
// SEARCH
// ════════════════════════════════
function handleSearch() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!q) return;
  currentCat = "all";
  const matched = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q),
  );
  const qv = document.getElementById("searchInput").value;
  document.getElementById("catBreadcrumb").textContent = `"${qv}"`;
  document.getElementById("catPageTitle").textContent = `Results for "${qv}"`;
  document.getElementById("catPageSub").textContent =
    `${matched.length} components found`;
  document.getElementById("catResultCount").innerHTML =
    `<strong>${matched.length}</strong> results`;
  document.getElementById("catProductsGrid").innerHTML = matched.length
    ? renderProdCards(matched)
    : `<div style="grid-column:1/-1;text-align:center;padding:56px;color:var(--muted)">No results. <a style="color:var(--accent2);cursor:pointer" onclick="showCatPage('all')">Browse all →</a></div>`;
  showPage("category");
}

// ════════════════════════════════
// STATS ANIMATION
// ════════════════════════════════
function animateStats() {
  [
    { id: "s1", val: 2400, suf: "+" },
    { id: "s2", val: 42, suf: "m" },
    { id: "s3", val: 18700, suf: "+" },
    { id: "s4", val: 98, suf: "%" },
  ].forEach((t) => {
    const el = document.getElementById(t.id);
    if (!el) return;
    let n = 0;
    const step = t.val / 60;
    const timer = setInterval(() => {
      n = Math.min(n + step, t.val);
      el.innerHTML =
        Math.floor(n).toLocaleString() + `<span class="acc">${t.suf}</span>`;
      if (n >= t.val) clearInterval(timer);
    }, 18);
  });
}

// ════════════════════════════════
// TOAST
// ════════════════════════════════
let toastTimer;
function showToast(msg, type = "") {
  clearTimeout(toastTimer);
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ════════════════════════════════
// CONTACT FORM HANDLER
// ════════════════════════════════
function handleContactSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const subject = document.getElementById("contactSubject").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const btn = document.getElementById("contactSubmitBtn");

  // Validation
  if (!name || !email || !subject || !message) {
    showToast("❌ Please fill in all fields", "");
    return;
  }

  if (!email.includes("@")) {
    showToast("❌ Please enter a valid email address", "");
    return;
  }

  // Show loading state
  btn.disabled = true;
  btn.textContent = "Sending...";
  btn.style.opacity = "0.7";

  // Simulate sending (in real app, this would be an API call)
  setTimeout(() => {
    // Reset form
    form.reset();
    btn.disabled = false;
    btn.textContent = "Send Message";
    btn.style.opacity = "1";

    // Show success animation and toast
    showToast(
      "✅ Message sent successfully! We'll reply within 2 hours.",
      "green",
    );
  }, 1200);
}

// ════════════════════════════════
// INIT
// ════════════════════════════════
renderHomePage();

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateStats();
      observer.disconnect();
    }
  },
  { threshold: 0.5 },
);
const statsEl = document.querySelector(".stats-strip");
if (statsEl) observer.observe(statsEl);
