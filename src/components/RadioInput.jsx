function RadioInput({ tipo }) {
  return (
    <>
      <div>
        <input
          type="radio"
          id={tipo}
          name="transaction"
          value={tipo}
          required
        />
        <label
          className="inline-block px-5 py-2 border border-gray-300 rounded-2xl cursor-pointer
                   transition-all duration-200 ease-in-out bg-white text-text-200 select-none;"
          htmlFor={tipo}
        >
          {tipo.toUpperCase()}
        </label>
      </div>
    </>
  );
}
export default RadioInput;
