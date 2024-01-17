import Player from '@oplayer/core';

export function addCustomKeyboardActions(player: Player) {
  const seekTime = player.duration / 9;

  document.addEventListener('keydown', ({ code }) => {
    if (code === 'Space') player.togglePlay();
    else if (code === 'KeyM') player.toggleMute();
    else if (code === 'ArrowLeft') player.seek(player.currentTime - 5);
    else if (code === 'ArrowRight') player.seek(player.currentTime + 5);
    else if (code === 'Digit0' || code === 'Numpad0') player.seek(0);
    else if (code === 'Digit1' || code === 'Numpad1') player.seek(seekTime * 1);
    else if (code === 'Digit2' || code === 'Numpad2') player.seek(seekTime * 2);
    else if (code === 'Digit3' || code === 'Numpad3') player.seek(seekTime * 3);
    else if (code === 'Digit4' || code === 'Numpad4') player.seek(seekTime * 4);
    else if (code === 'Digit5' || code === 'Numpad5') player.seek(seekTime * 5);
    else if (code === 'Digit6' || code === 'Numpad6') player.seek(seekTime * 6);
    else if (code === 'Digit7' || code === 'Numpad7') player.seek(seekTime * 7);
    else if (code === 'Digit8' || code === 'Numpad8') player.seek(seekTime * 8);
    else if (code === 'Digit9' || code === 'Numpad9') player.seek(seekTime * 8.8);
  });
}

export function addCustomUiController(controller: HTMLElement) {
  controller.querySelectorAll('button').forEach((button) => {
    button.classList.add('custom-tooltip');
    if (button.getAttribute('aria-label') === 'Volume') {
      button.parentElement?.children[1].classList.add('custom-volume');
    }
  });
}

export function removeSubtitleOption(hasMoreThanOneSubtitle: boolean) {
  if (!hasMoreThanOneSubtitle) document.querySelector('[data-key="oplayer-plugin-dash-Language"]')?.remove();
}
