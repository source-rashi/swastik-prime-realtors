// src/utils/cursor.js — Custom Cursor
export function initCursor() {
  const cursor = document.getElementById('cursor')
  const follower = document.getElementById('cursor-follower')
  if (!cursor || !follower) return

  let mouseX = 0, mouseY = 0
  let followerX = 0, followerY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
  })

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1
    followerY += (mouseY - followerY) * 0.1
    follower.style.left = followerX + 'px'
    follower.style.top = followerY + 'px'
    requestAnimationFrame(animateFollower)
  }

  animateFollower()

  // Hover effects on interactive elements
  document.querySelectorAll('a, button, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.8)'
      follower.style.opacity = '0.3'
    })
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)'
      follower.style.opacity = '0.5'
    })
  })

  console.log('[Cursor] Custom cursor initialized')
}
