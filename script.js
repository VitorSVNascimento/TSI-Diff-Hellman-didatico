function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false
    return num > 1
  }
  
  function generatePrimes(start, end) {
    const primes = []
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.push(i)
      }
    }
    return primes
  }
  
  function populatePrimeSelect() {
    const primeSelect = document.getElementById("prime")
    const primes = generatePrimes(3, 255)
    primes.forEach((prime) => {
      const option = document.createElement("option")
      option.value = prime
      option.textContent = prime
      primeSelect.appendChild(option)
    })
    primeSelect.value = 23 // Valor padrão
  }
  
  function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0
    let result = 1
    base = base % modulus
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus
      }
      exponent = Math.floor(exponent / 2)
      base = (base * base) % modulus
    }
    return result
  }
  
  function calculateDiffieHellman() {
    const p = Number.parseInt(document.getElementById("prime").value)
    const g = Number.parseInt(document.getElementById("integer").value)
    const a = Number.parseInt(document.getElementById("participant1Secret").value)
    const b = Number.parseInt(document.getElementById("participant2Secret").value)
    const participant1Name = document.getElementById("participant1Name").value || "Participante 1"
    const participant2Name = document.getElementById("participant2Name").value || "Participante 2"
  
    // Passo 1: Parâmetros Públicos
    document.getElementById("step1-prime").textContent = p
    document.getElementById("step1-integer").textContent = g
  
    // Passo 2: Cálculo do Participante 1
    const A = modPow(g, a, p)
    document.getElementById("step2-participant1-name").textContent = participant1Name
    document.getElementById("step2-participant1-secret").textContent = a
    document.getElementById("step2-participant1-public").textContent = A
  
    // Passo 3: Cálculo do Participante 2
    const B = modPow(g, b, p)
    document.getElementById("step3-participant2-name").textContent = participant2Name
    document.getElementById("step3-participant2-secret").textContent = b
    document.getElementById("step3-participant2-public").textContent = B
  
    // Passo 4: Cálculo do Segredo Compartilhado
    const participant1SharedSecret = modPow(B, a, p)
    const participant2SharedSecret = modPow(A, b, p)
    document.getElementById("step4-participant1-shared").textContent = participant1SharedSecret
    document.getElementById("step4-participant2-shared").textContent = participant2SharedSecret
  }

  window.addEventListener('scroll', function() {
    const introSection = document.getElementById('intro');
    const infoSection = document.getElementById('info');

    // Quando a seção #intro entrar na visão
    if (introSection.getBoundingClientRect().top < window.innerHeight - 50) {
        introSection.classList.add('visible');
    } else {
        introSection.classList.remove('visible');
    }

    // Quando a seção #info entrar na visão
    if (infoSection.getBoundingClientRect().top < window.innerHeight - 50) {
        infoSection.classList.add('visible');
    } else {
        infoSection.classList.remove('visible');
    }
});


  
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();
});



  // Inicializar o seletor de números primos e calcular
  window.onload = () => {
    populatePrimeSelect()
    calculateDiffieHellman()
  }
  
  