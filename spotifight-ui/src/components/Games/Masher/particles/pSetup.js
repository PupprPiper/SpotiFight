module.exports = function(image) {
  return {particles : {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#F5F5F5'
    },
    shape: {
      type: ['image','circle'],
      stroke: {
        width: 10,
        color: '#F5F5F5'
      },
      polygon: {
        nb_sides: 2
      },
      image: {
        src: `${image}`,
        width: 40,
        height: 40
      }
    },
    opacity: {
      value: 1,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 25,
      random: false,
      anim: {
        enable: true,
        speed: 10,
        size_min: 10,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 300,
      color:  '#F5F5F5',
      opacity: .9,
      width: 3
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 800,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 100,
        duration: 2
      },
      push: {
        particles_nb: 1
      },
      remove: {
        particles_nb: 1
      }
    }
  },
  retina_detect: true
}

}
