export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-extrabold text-white relative text-shadow">
        {["L", "O", "A", "D", "I", "N", "G", "."].map((letter, index) => (
          <span key={index} className={`letter-animation letter-${index}`}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
