export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-extrabold text-white relative text-shadow">
        {["L", "O", "G", "I", "N", "."].map((letter, index) => (
          <span key={index} className={`letter-animation letter-${index}`}>
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
