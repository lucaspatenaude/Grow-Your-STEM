function toggleCustomSalaryInput() {
  const salaryDropdown = document.getElementById("salary");
  const customSalaryInput = document.getElementById("custom-salary");
  if (salaryDropdown.value === "custom") {
    customSalaryInput.style.display = "block";
  } else {
    customSalaryInput.style.display = "none";
    customSalaryInput.value = ""; // Clear custom input if not used
  }
}

// Update the calculate function to use the custom salary if provided
function calculate() {
  const tuition = +document.getElementById("tuition").value;
  const fees = +document.getElementById("fees").value;
  const books = +document.getElementById("books").value;
  const software = +document.getElementById("software").value;
  const scholarships = +document.getElementById("scholarships").value;
  const loans = +document.getElementById("loans").value;
  const income = +document.getElementById("income").value;
  const salaryDropdown = document.getElementById("salary");
  const customSalaryInput = document.getElementById("custom-salary");

  const salary = customSalaryInput.value 
    ? +customSalaryInput.value 
    : +salaryDropdown.value;

  const totalCost = tuition + fees + books + software;
  const netOutOfPocket = totalCost - scholarships - (income * 4); // 4-month semester
  const scholarshipPercent = Math.round((scholarships / totalCost) * 100);
  
  const totalLoanDebt = loans * 8; // Assume 8 semesters
  const roiYears = (totalLoanDebt / (salary * 0.15)).toFixed(1); // 15% of salary to loans

  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
  document.getElementById("scholarshipPercent").textContent = scholarshipPercent;
  document.getElementById("roiYears").textContent = roiYears;

  document.getElementById("results").style.display = "block";
}