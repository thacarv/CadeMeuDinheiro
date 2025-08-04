function RadioInput({ tipo, category }) {
  return (
    <>
      <div>
        <input
          type={category}
          id={tipo}
          name="transaction"
          value={tipo}
          required
          onClick={(e) => console.log(e.target.value)}
        />
        <label
          className="inline-block text-center w-30 px-5 py-2 mx-2 border border-gray-300 rounded-2xl cursor-pointer
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
