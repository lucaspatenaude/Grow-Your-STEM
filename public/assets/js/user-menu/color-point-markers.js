document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with the ID 'points'
  const pointsElements = document.querySelectorAll('#points');

  pointsElements.forEach((element) => {
      // Parse the points value from the element's text content
      const points = parseInt(element.textContent.trim(), 10);

      // Check the points value and apply the appropriate background color
      if (points <= 20) {
          element.style.backgroundColor = 'rgb(211, 128, 38)'; // Red for points <= 20
      } else if (points >= 21 && points <= 30) {
          element.style.backgroundColor = 'rgb(187, 187, 187)'; // Orange for points between 21 and 30
          element.style.border = '1px solid rgb(126, 126, 126)'; // Orange for points between 21 and 30
      } else if (points > 30) {
          element.style.backgroundColor = 'rgb(226, 202, 66)'; // Green for points > 30
          element.style.border = '1px solid rgb(173, 152, 33)'; // Orange for points between 21 and 30
      }
  });
});