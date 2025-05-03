function calculate() {
  const tuition = +document.getElementById("tuition").value;
  const fees = +document.getElementById("fees").value;
  const books = +document.getElementById("books").value;
  const software = +document.getElementById("software").value;
  const scholarships = +document.getElementById("scholarships").value;
  const loans = +document.getElementById("loans").value;
  const income = +document.getElementById("income").value;
  const salary = +document.getElementById("salary").value;

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