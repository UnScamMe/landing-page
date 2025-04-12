// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  })

  // Scrolling header effect
  const header = document.getElementById("header")
  const scrollThreshold = 50

  function updateHeaderOnScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("bg-white/95", "backdrop-blur-md", "shadow-sm", "border", "rounded-full", "border-gray-300")
      header.classList.remove("bg-transparent")
    } else {
      header.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-sm", "border", "rounded-full", "border-gray-300")
      header.classList.add("bg-transparent")
    }
  }

  // Initial call on page load
  updateHeaderOnScroll()
  window.addEventListener("scroll", updateHeaderOnScroll)

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active")
  })

  // Handle navigation clicks in mobile menu
  const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]')
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active")
    })
  })

  // Back to top button
  const backToTopButton = document.getElementById("backToTop")

  const toggleBackToTopButton = () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("opacity-100", "scale-100")
      backToTopButton.classList.remove("opacity-0", "scale-90")
    } else {
      backToTopButton.classList.remove("opacity-100", "scale-100")
      backToTopButton.classList.add("opacity-0", "scale-90")
    }
  }

  window.addEventListener("scroll", toggleBackToTopButton)

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Scroll progress bar
  const progressBar = document.getElementById("progressBar")

  const updateProgressBar = () => {
    const scrollPosition = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const scrollPercentage = (scrollPosition / maxScroll) * 100
    progressBar.style.width = `${scrollPercentage}%`
  }

  window.addEventListener("scroll", updateProgressBar)

  // Animate the progress line in How It Works section
  const progressLine = document.getElementById("progressLine")
  const howItWorksSection = document.getElementById("how-it-works")

  if (progressLine && howItWorksSection) {
    const animateProgressLine = () => {
      const sectionTop = howItWorksSection.getBoundingClientRect().top
      const sectionHeight = howItWorksSection.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate how much of the section is in view
      const visiblePercentage = Math.min(Math.max((windowHeight - sectionTop) / sectionHeight, 0), 1)

      progressLine.style.clipPath = `polygon(0 0, ${visiblePercentage * 100}% 0, ${visiblePercentage * 100}% 100%, 0% 100%)`
    }

    window.addEventListener("scroll", animateProgressLine)
  }

  // Initialize world map
  initWorldMap()

  // Initialize counters
  initCounters()
})

// Initialize counters
function initCounters() {
  const counters = document.querySelectorAll(".counter")
  const speed = 200

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target")
    const increment = target / speed

    const updateCount = () => {
      const count = +counter.innerText
      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(updateCount, 1)
      } else {
        counter.innerText = target
      }
    }

    // Start the counter when it comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCount()
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.5,
      }
    )

    observer.observe(counter)
  })
}

// Initialize the world map
function initWorldMap() {
  // Create a map container
  const worldMapContainer = document.getElementById("worldMap")
  if (!worldMapContainer) return

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttribute("viewBox", "0 0 1000 500")
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", "100%")
  svg.style.opacity = "0.2"

  // Simplified world map path (simplified to avoid too much detail)
  const worldPath =
    "M181.32,112.04c-1.53,-1.33 -3.55,-2.01 -5.57,-1.83 -5.53,0.5 -10.95,1.71 -16.09,3.55 -3.95,1.76 -7.96,3.41 -12.01,4.94 -4.53,1.68 -6.33,2.71 -8.33,5.32 -1.7,2.23 -4.27,3.56 -7.06,3.56 -2.39,0 -4.56,-0.97 -6.16,-2.52 -1.68,-1.63 -2.58,-3.83 -2.58,-6.31v-2.75c0,-4.26 -3.2,-7.83 -7.44,-8.32l-16.61,-1.93c-4.49,-0.53 -8.53,2.83 -8.83,7.35 -0.31,4.52 3.22,8.35 7.73,8.42l2.26,0.03c4.21,0.07 7.57,3.53 7.51,7.74 -0.04,2.82 -1.59,5.32 -3.96,6.71l-11.57,6.77 -24.34,7.02c-3.55,1.02 -5.92,4.25 -5.89,7.95 0.05,6.13 4.03,11.64 9.81,13.58l5.43,1.83c3.71,1.25 6.29,4.73 6.34,8.69 0.04,2.72 -1.17,5.28 -3.3,7.02l-3.2,2.64c-2.76,2.27 -4.48,5.5 -4.82,9.07l-2.56,27.16c-0.34,3.65 1.79,7.08 5.16,8.54l34.77,15.06c2.19,0.95 4.62,1.08 6.9,0.38l38.19,-11.68c3.01,-0.92 5.26,-3.36 5.96,-6.44l7.79,-34.42c0.57,-2.5 0.08,-5.12 -1.38,-7.26 -1.51,-2.22 -2.05,-4.93 -1.56,-7.63 0.56,-3.05 2.56,-5.57 5.39,-6.83l21.24,-9.41c2.39,-1.06 4.11,-3.24 4.63,-5.84l7.16,-35.95c0.52,-2.62 -0.21,-5.33 -1.94,-7.27L181.32,112.04z M354.16,157.16c-2.97,-0.95 -6.19,-0.21 -8.37,1.97l-20.03,20.03c-2.83,2.82 -3.24,7.29 -0.87,10.56 3.35,4.63 7.78,8.44 12.85,11.01 3.71,1.88 8.22,0.61 10.53,-2.85l15.95,-23.92c1.72,-2.57 1.88,-5.91 0.4,-8.64C362.14,161.58 358.28,158.48 354.16,157.16z M438.42,208.12c-3.69,-1.9 -8.18,-0.64 -10.5,2.81l-12.98,19.31c-2.32,3.45 -1.6,8.15 1.57,10.76 5.9,4.85 13.31,7.49 20.89,7.49 2.16,0 4.33,-0.21 6.49,-0.64 3.54,-0.7 6.09,-3.83 6.09,-7.44v-23.15c0,-3.11 -1.91,-5.9 -4.82,-7.01C442.9,209.39 440.6,208.68 438.42,208.12z M586.44,189.33c-0.98,-0.69 -2.13,-1.05 -3.32,-1.05 -1.86,0 -3.6,0.88 -4.71,2.38l-13.52,18.43c-1.45,1.98 -1.5,4.66 -0.1,6.68 2.58,3.76 3.95,8.22 3.95,12.79 0,1.79 -0.21,3.55 -0.62,5.24 -0.79,3.25 1.05,6.59 4.19,7.62 9.99,3.29 21.15,0.78 28.86,-6.93 2.83,-2.83 3.23,-7.29 0.86,-10.56l-12.47,-17.2C587.99,195.32 586.65,192.35 586.44,189.33z M677.8,185.17c-3.68,-1.9 -8.18,-0.65 -10.5,2.8l-12.98,19.31c-2.31,3.44 -1.61,8.12 1.54,10.74 5.9,4.91 13.32,7.58 20.92,7.58 2.16,0 4.33,-0.21 6.5,-0.64 3.52,-0.71 6.05,-3.83 6.05,-7.44v-23.14c0,-3.13 -1.91,-5.91 -4.82,-7.02C682.27,186.49 680.05,185.69 677.8,185.17z M738.51,96.01c-3.14,-1.37 -6.81,-0.12 -8.67,2.84l-24.13,38.21c-1.48,2.34 -1.48,5.3 0,7.64l24.13,38.22c1.86,2.95 5.52,4.21 8.67,2.84 9.8,-4.26 16.16,-13.91 16.16,-24.36v-41.02C754.67,109.93 748.31,100.27 738.51,96.01z M800.13,119.8c-5.31,-3.05 -12.05,-0.21 -13.43,5.69 -1.16,5 -5.54,8.72 -10.9,8.72 -8.28,0 -14.9,6.61 -14.9,14.9 0,8.28 6.61,14.9 14.9,14.9 5.36,0 9.75,3.73 10.91,8.72 1.37,5.9 8.12,8.74 13.43,5.68 13.17,-7.59 21.06,-21.67 21.06,-37.29C821.19,141.46 813.3,127.38 800.13,119.8z M831.85,85.31c-8.29,0 -14.9,6.61 -14.9,14.9 0,8.28 6.61,14.89 14.9,14.89 5.36,0 9.74,3.74 10.9,8.73 1.39,5.9 8.13,8.73 13.44,5.67 13.16,-7.58 21.04,-21.66 21.04,-37.27 0,-4.46 -0.7,-8.83 -2.04,-13C850.1,89.9 841.17,85.31 831.85,85.31z"

  // Create map path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", worldPath)
  path.setAttribute("fill", "#3b82f6")
  path.setAttribute("stroke", "#2563eb")
  path.setAttribute("stroke-width", "1")
  svg.appendChild(path)

  // Add connection points (major cities/hubs)
  const connectionPoints = [
    {
      x: 200,
      y: 150,
      name: "New York",
    },
    {
      x: 480,
      y: 140,
      name: "London",
    },
    {
      x: 540,
      y: 170,
      name: "Paris",
    },
    {
      x: 650,
      y: 200,
      name: "Dubai",
    },
    {
      x: 750,
      y: 230,
      name: "Mumbai",
    },
    {
      x: 800,
      y: 180,
      name: "Beijing",
    },
    {
      x: 850,
      y: 240,
      name: "Tokyo",
    },
    {
      x: 300,
      y: 280,
      name: "Rio",
    },
    {
      x: 520,
      y: 250,
      name: "Lagos",
    },
    {
      x: 600,
      y: 300,
      name: "Nairobi",
    },
  ]

  // Create connection points
  connectionPoints.forEach((point) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", point.x)
    circle.setAttribute("cy", point.y)
    circle.setAttribute("r", "5")
    circle.setAttribute("fill", "#3b82f6")
    circle.setAttribute("class", "connection-point")

    // Create pulsing effect
    const animateScale = document.createElementNS("http://www.w3.org/2000/svg", "animate")
    animateScale.setAttribute("attributeName", "r")
    animateScale.setAttribute("from", "3")
    animateScale.setAttribute("to", "8")
    animateScale.setAttribute("dur", 2 + Math.random() * 2 + "s") // Random duration for variety
    animateScale.setAttribute("repeatCount", "indefinite")

    const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate")
    animateOpacity.setAttribute("attributeName", "opacity")
    animateOpacity.setAttribute("from", "0.8")
    animateOpacity.setAttribute("to", "0.2")
    animateOpacity.setAttribute("dur", 2 + Math.random() * 2 + "s")
    animateOpacity.setAttribute("repeatCount", "indefinite")

    circle.appendChild(animateScale)
    circle.appendChild(animateOpacity)
    svg.appendChild(circle)

    // Add ripple effect
    const ripple = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    ripple.setAttribute("cx", point.x)
    ripple.setAttribute("cy", point.y)
    ripple.setAttribute("r", "5")
    ripple.setAttribute("fill", "none")
    ripple.setAttribute("stroke", "#3b82f6")
    ripple.setAttribute("stroke-width", "1")
    ripple.setAttribute("opacity", "0.6")

    const rippleScale = document.createElementNS("http://www.w3.org/2000/svg", "animate")
    rippleScale.setAttribute("attributeName", "r")
    rippleScale.setAttribute("from", "5")
    rippleScale.setAttribute("to", "20")
    rippleScale.setAttribute("dur", "3s")
    rippleScale.setAttribute("repeatCount", "indefinite")

    const rippleOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate")
    rippleOpacity.setAttribute("attributeName", "opacity")
    rippleOpacity.setAttribute("from", "0.6")
    rippleOpacity.setAttribute("to", "0")
    rippleOpacity.setAttribute("dur", "3s")
    rippleOpacity.setAttribute("repeatCount", "indefinite")

    ripple.appendChild(rippleScale)
    ripple.appendChild(rippleOpacity)
    svg.appendChild(ripple)
  })

  // Create connections between points (animated)
  for (let i = 0; i < connectionPoints.length; i++) {
    for (let j = i + 1; j < connectionPoints.length; j++) {
      if (Math.random() < 0.3) {
        // Only create some connections to avoid clutter
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", connectionPoints[i].x)
        line.setAttribute("y1", connectionPoints[i].y)
        line.setAttribute("x2", connectionPoints[j].x)
        line.setAttribute("y2", connectionPoints[j].y)
        line.setAttribute("stroke", "#3b82f6")
        line.setAttribute("stroke-width", "1")
        line.setAttribute("stroke-dasharray", "5,5")
        line.setAttribute("opacity", "0.3")

        // Create data flow animation
        const animateDash = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animateDash.setAttribute("attributeName", "stroke-dashoffset")
        animateDash.setAttribute("from", "0")
        animateDash.setAttribute("to", "20")
        animateDash.setAttribute("dur", "2s")
        animateDash.setAttribute("repeatCount", "indefinite")

        line.appendChild(animateDash)
        svg.appendChild(line)
      }
    }
  }

  // Add the SVG to the container
  worldMapContainer.appendChild(svg)

  // Optional: Add interactive behaviors
  const points = svg.querySelectorAll(".connection-point")
  points.forEach((point) => {
    point.addEventListener("mouseover", function () {
      this.setAttribute("fill", "#7c3aed") // Change color on hover
      this.setAttribute("r", "8") // Increase size on hover
    })

    point.addEventListener("mouseout", function () {
      this.setAttribute("fill", "#3b82f6") // Revert color
      this.setAttribute("r", "5") // Revert size
    })
  })
}
