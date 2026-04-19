function RadioInput({ tipo }) {
  return (
    <div>
      <input
        type="radio"
        id={tipo}
        name="transaction"
        value={tipo}
        required
      />
      <label
        className="inline-block text-center w-36 px-4 py-3 border border-white/10 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out bg-white/5 text-text-200 font-semibold tracking-wide select-none hover:bg-white/10"
        htmlFor={tipo}
      >
        {tipo.toUpperCase()}
      </label>
    </div>
  );
}
export default RadioInput;
