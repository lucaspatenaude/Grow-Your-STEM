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
  const housing = +document.getElementById("housing").value;
  const scholarships = +document.getElementById("scholarships").value;
  const loans = +document.getElementById("loans").value;
  const income = +document.getElementById("income").value;
  const semesters = +document.getElementById("semesters").value;
  const salaryDropdown = document.getElementById("salary");
  const customSalaryInput = document.getElementById("custom-salary");

  const salary = customSalaryInput.value 
    ? +customSalaryInput.value 
    : +salaryDropdown.value;

  // Calculate total cost for all semesters
  const totalCostPerSemester = tuition + fees + books + housing;
  const totalCost = totalCostPerSemester * semesters;

  // Calculate net out-of-pocket cost
  const totalScholarships = scholarships * semesters;
  const totalIncome = income * semesters; // 4 months per semester
  const netOutOfPocket = totalCost - totalScholarships - totalIncome;

  // Calculate scholarship percentage
  const scholarshipPercent = Math.round((totalScholarships / totalCost) * 100);

  // Calculate total loan debt and ROI
  const totalLoanDebt = loans * semesters;
  const roiYears = (totalLoanDebt / (salary * 0.15)).toFixed(1); // 15% of salary to loans

  // Update the results in the UI
  document.getElementById("totalCostPerSemester").textContent = totalCostPerSemester.toFixed(2);
  document.getElementById("totalCost").textContent = totalCost.toFixed(2);
  document.getElementById("scholarshipPercent").textContent = scholarshipPercent;
  document.getElementById("roiYears").textContent = roiYears;

  document.getElementById("results").style.display = "block";
}