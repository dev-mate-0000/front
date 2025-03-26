export default function LoadingUnit(message: string) {
  return (
    <h1 className="text-4xl font-extrabold text-white relative text-shadow">
      {message.split('').map((letter, index) => (
        <span key={index} className={`letter-animation letter-${index}`}>
          {letter}
        </span>
      ))}
    </h1>
  );
}
