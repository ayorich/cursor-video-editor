# Mouse Tracking and Auto-Zoom Logic

## Overview

The extension implements a mouse tracking system that monitors clicks and triggers auto-zoom when specific conditions are met (double clicks within 3 seconds).

## Core Components

### Event Channel

```javascript
const eventChannel = createChannel("Events");
```

This creates a communication channel for mouse events between different parts of the extension.

### Mouse Event Tracking

The extension tracks mouse events through:

1. Click event listeners
2. Position tracking
3. Timing calculations

### Auto-Zoom Logic

When clicks are detected:

1. Store first click timestamp and position
2. On second click:
   - Check if within 3 seconds of first click
   - Calculate distance between clicks
   - If conditions met, trigger zoom

### Key Functions

```javascript
// Simplified version of the core logic
let lastClickTime = 0;
let lastClickPosition = { x: 0, y: 0 };

function handleClick(event) {
  const currentTime = Date.now();
  const currentPosition = { x: event.clientX, y: event.clientY };

  if (currentTime - lastClickTime < 3000) {
    // Two clicks within 3 seconds
    const distance = calculateDistance(lastClickPosition, currentPosition);
    if (distance < 50) {
      // If clicks are close enough
      triggerAutoZoom(currentPosition);
    }
  }

  lastClickTime = currentTime;
  lastClickPosition = currentPosition;
}

function calculateDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
}

function triggerAutoZoom(position) {
  // Start with 1x zoom
  let currentZoom = 1.0;
  // Target zoom level
  const targetZoom = 2.0;
  // Duration of zoom animation in ms
  const duration = 500;

  animateZoom(currentZoom, targetZoom, duration, position);
}

function animateZoom(start, end, duration, center) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentZoom = start + (end - start) * progress;
    applyZoom(currentZoom, center);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

## Implementation Details

1. **Event Listening**

   - Monitors mouse clicks
   - Tracks cursor position
   - Maintains timing information

2. **Click Processing**

   - Records click timestamps
   - Stores click positions
   - Calculates time between clicks

3. **Zoom Triggering**

   - Checks click proximity
   - Initiates zoom animation
   - Centers zoom on click location

4. **Animation Handling**
   - Smooth zoom transitions
   - Position-based centering
   - Frame-rate independent animation

## Usage

This logic can be integrated into any web application by:

1. Adding event listeners for mouse clicks
2. Implementing the zoom animation system
3. Configuring zoom parameters (timing, levels, etc.)
