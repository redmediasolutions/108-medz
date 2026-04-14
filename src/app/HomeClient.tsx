"use client";

export default function HomeClient() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>108 Medz</h1>

      <p>This is a test page.</p>

      <h2>Categories</h2>
      <ul>
        <li>Pain Relief</li>
        <li>Diabetes Care</li>
        <li>Heart Health</li>
      </ul>

      <h2>Products</h2>
      <ul>
        <li>Paracetamol 500mg - ₹25</li>
        <li>Metformin 500mg - ₹45</li>
        <li>Aspirin - ₹30</li>
      </ul>

      <p>If you can see this, the app is working ✅</p>
    </div>
  );
}